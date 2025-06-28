import json
import boto3
import re

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DictionaryTable')

# Normalize string: lowercase, remove non-alphanumeric
def normalize(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

# Levenshtein Distance Implementation
def levenshtein(a, b):
    if len(a) < len(b):
        return levenshtein(b, a)
    if len(b) == 0:
        return len(a)
    prev_row = list(range(len(b) + 1))
    for i, c1 in enumerate(a):
        curr_row = [i + 1]
        for j, c2 in enumerate(b):
            insert = prev_row[j + 1] + 1
            delete = curr_row[j] + 1
            replace = prev_row[j] + (c1 != c2)
            curr_row.append(min(insert, delete, replace))
        prev_row = curr_row
    return prev_row[-1]

def lambda_handler(event, context):
    try:
        query_term = event['queryStringParameters']['term']
    except (KeyError, TypeError):
        return {
            'statusCode': 400,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            'body': json.dumps({'error': 'Missing query parameter: term'})
        }

    normalized_query = normalize(query_term)

    try:
        response = table.scan()
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            'body': json.dumps({'error': f'Database scan failed: {str(e)}'})
        }

    items = response.get('Items', [])

    # First: Try exact normalized match
    for item in items:
        db_term = item.get('term', '')
        if normalize(db_term) == normalized_query:
            return {
                'statusCode': 200,
                'headers': {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                'body': json.dumps({
                    'term': db_term,
                    'description': item.get('definition', 'No description available.')
                })
            }

    # Second: Try fuzzy match using Levenshtein distance
    best_match = None
    best_score = float('inf')
    for item in items:
        db_term = item.get('term', '')
        distance = levenshtein(normalize(db_term), normalized_query)
        if distance < best_score:
            best_score = distance
            best_match = item

    # Allow match only if distance is small (tune threshold as needed)
    if best_score <= 2 and best_match:
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            'body': json.dumps({
                'term': best_match['term'],
                'description': best_match.get('definition', 'No description available.')
            })
        }

    return {
        'statusCode': 404,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        'body': json.dumps({'error': 'Term not found'})
    }

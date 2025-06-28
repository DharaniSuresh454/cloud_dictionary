import json
import boto3
import re

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DictionaryTable')

# Normalize string: lowercase, remove non-alphanumeric
def normalize(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

# Levenshtein distance
def levenshtein(a, b):
    if len(a) < len(b):
        return levenshtein(b, a)

    if len(b) == 0:
        return len(a)

    previous_row = list(range(len(b) + 1))
    for i, c1 in enumerate(a):
        current_row = [i + 1]
        for j, c2 in enumerate(b):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row

    return previous_row[-1]

def lambda_handler(event, context):
    try:
        query = event['queryStringParameters']['term']
    except (KeyError, TypeError):
        return {
            'statusCode': 400,
            'headers': {
                "Access-Control-Allow-Origin": "*"
            },
            'body': json.dumps({'error': 'Missing query parameter: term'})
        }

    normalized_query = normalize(query)

    # Scan all terms
    response = table.scan(ProjectionExpression="term")
    items = response.get("Items", [])

    # Prepare list of (term, distance)
    matches = []
    for item in items:
        db_term = item['term']
        distance = levenshtein(normalize(db_term), normalized_query)
        matches.append((db_term, distance))

    # Sort and limit top 5 close matches
    matches.sort(key=lambda x: x[1])
    suggestions = [term for term, dist in matches if dist <= 5][:5]

    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        'body': json.dumps({
            'suggestions': suggestions
        })
    }


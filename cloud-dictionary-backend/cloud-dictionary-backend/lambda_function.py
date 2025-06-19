import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DictionaryTable')

def lambda_handler(event, context):
    try:
        term = event['queryStringParameters']['term']
    except (KeyError, TypeError):
        return {
            'statusCode': 400,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            'body': json.dumps({'error': 'Missing query parameter: term'})
        }

    response = table.get_item(Key={'term': term})

    if 'Item' in response:
        item = response['Item']
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            'body': json.dumps({
                'term': item.get('term', ''),
                'description': item.get('definition', 'No description available.')  # <-- changed here
            })
        }
    else:
        return {
            'statusCode': 404,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            'body': json.dumps({'error': 'Term not found'})
        }

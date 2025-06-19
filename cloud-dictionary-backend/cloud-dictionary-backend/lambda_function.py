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
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            'body': json.dumps({
                'term': response['Item'].get('term', ''),
                'description': response['Item'].get('description', 'No description available.')
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

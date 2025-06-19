import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DictionaryTable')

def lambda_handler(event, context):
    term = event['queryStringParameters']['term']
    response = table.get_item(Key={'term': term})

    if 'Item' in response:
        return {
            'statusCode': 200,
            'headers': { "Access-Control-Allow-Origin": "*" },
            'body': json.dumps(response['Item'])
        }
    else:
        return {
            'statusCode': 404,
            'headers': { "Access-Control-Allow-Origin": "*" },
            'body': json.dumps({'error': 'Term not found'})
        }
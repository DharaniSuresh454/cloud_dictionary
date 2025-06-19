import boto3
import json

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')  # Use your region
table = dynamodb.Table('DictionaryTable')  # Table name must match

# Load data
with open('cloud_terms.json', 'r') as f:
    terms = json.load(f)

# Track already seen terms to avoid duplicates
seen_terms = set()

# Upload to DynamoDB
with table.batch_writer() as batch:
    for item in terms:
        term = item['term']
        if term not in seen_terms:
            batch.put_item(Item=item)
            print(f"✅ Uploaded: {term}")
            seen_terms.add(term)
        else:
            print(f"⚠️ Skipped duplicate: {term}")

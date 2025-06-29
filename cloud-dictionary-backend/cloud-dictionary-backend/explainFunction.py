import boto3
import json
import os

bedrock = boto3.client("bedrock-runtime", region_name="us-east-1")

def lambda_handler(event, context):
    try:
        body = json.loads(event["body"])
        term = body.get("term", "")

        prompt = f"""Explain the cloud term '{term}' in simple words for a college student who is new to cloud computing."""

        # Claude 3 Sonnet
        modelId = "anthropic.claude-3-sonnet-20240229-v1:0"

        payload = {
    "anthropic_version": "bedrock-2023-05-31",  # required for Claude 3
    "messages": [
        {"role": "user", "content": prompt}
    ],
    "max_tokens": 200
}

        response = bedrock.invoke_model(
            modelId=modelId,
            contentType="application/json",
            accept="application/json",
            body=json.dumps(payload)
        )

        response_body = json.loads(response['body'].read())
        explanation = response_body["content"][0]["text"]

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Content-Type": "application/json"
            },
            "body": json.dumps({"explanation": explanation})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            "body": json.dumps({"error": str(e)})
        }
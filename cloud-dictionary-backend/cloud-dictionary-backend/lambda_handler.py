import json
import os
import openai

# Load the API key from environment variable
openai.api_key = os.environ.get("OPENAI_API_KEY")

def lambda_handler(event, context):
    try:
        print("Event:", event)
        
        body = json.loads(event.get("body", "{}"))
        term = body.get("term")

        if not term:
            return {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                "body": json.dumps({"error": "Missing term"})
            }

        prompt = f"Explain the cloud computing term '{term}' in very simple words for a beginner."

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=80,
            temperature=0.7
        )

        simplified = response["choices"][0]["message"]["content"]

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            "body": json.dumps({"explanation": simplified})
        }

    except Exception as e:
        print("Error:", str(e))
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            "body": json.dumps({"error": str(e)})
        }
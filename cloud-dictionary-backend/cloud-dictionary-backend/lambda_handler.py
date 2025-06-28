import json
import os
import openai

# Load the API key from environment variable
openai.api_key = os.environ.get("OPENAI_API_KEY")

def lambda_handler(event, context):
    try:
        # Log the incoming event for debugging
        print("Received event:", json.dumps(event))

        # Parse request body
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

        # Generate prompt for OpenAI
        prompt = f"Explain the cloud computing term '{term}' in very simple words for a beginner."

        # Call OpenAI ChatCompletion API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=80,
            temperature=0.7
        )

        # Log the full OpenAI response
        print("OpenAI response:", json.dumps(response, indent=2))

        # Extract explanation
        simplified = response["choices"][0]["message"]["content"].strip()

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            "body": json.dumps({"explanation": simplified})
        }

    except Exception as e:
        # Log the error
        print("Error:", str(e))
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            "body": json.dumps({"error": str(e)})
        }

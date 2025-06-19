## 🚀 Features

- Serverless architecture (no dedicated server required)
- Fetch term definitions from DynamoDB using a http API
- Lightweight and scalable backend using AWS Lambda

## 🧠 How It Works

1. Cloud terms and definitions are stored in DynamoDB (`DictionaryTable`)
2. A Lambda function (`GetDefinitionFunction`) is triggered via API Gateway
3. The function receives a query parameter `term` and fetches the definition from DynamoDB

## 🛠️ Setup

### 1. Install dependencies

In your terminal:

```bash
pip install -r requirements.txt
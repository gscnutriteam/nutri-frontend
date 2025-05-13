#!/bin/bash

echo "🔄 Stopping any running containers..."
docker stop nutrife-app || true
docker rm nutrife-app || true

# Check if .env file exists
if [ ! -f .env ]; then
  echo "❌ Error: .env file not found!"
  echo "Please create a .env file with your environment variables."
  echo "You can copy sample.env to .env and fill in your actual values."
  exit 1
fi

# Load environment variables from .env file
echo "📝 Loading environment variables from .env file..."
source .env

echo "🚀 Running container with environment variables..."
docker run -d --name nutrife-app -p 3000:3000 \
  -e NEXT_PUBLIC_FIREBASE_API_KEY="${NEXT_PUBLIC_FIREBASE_API_KEY}" \
  -e NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}" \
  -e NEXT_PUBLIC_FIREBASE_PROJECT_ID="${NEXT_PUBLIC_FIREBASE_PROJECT_ID}" \
  -e NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}" \
  -e NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}" \
  -e NEXT_PUBLIC_FIREBASE_APP_ID="${NEXT_PUBLIC_FIREBASE_APP_ID}" \
  -e BASE_API_URL="${BASE_API_URL}" \
  -e JWT_SECRET="${JWT_SECRET}" \
  -e OPENAI_API_KEY="${OPENAI_API_KEY}" \
  -e GOOGLE_GENAI_API_KEY="${GOOGLE_GENAI_API_KEY}" \
  nutrife_nutrife-app

echo "⏳ Waiting for container to start..."
sleep 5

echo "🔍 Checking environment variables in the container..."
docker exec nutrife-app env | grep -E 'FIREBASE|API_KEY|SECRET|BASE_API_URL' | sed 's/\(.*API_KEY=\).*/\1[REDACTED]/'

echo "📝 Container logs:"
docker logs -f nutrife-app 
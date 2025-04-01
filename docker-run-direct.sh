#!/bin/bash

echo "🔄 Stopping any running containers..."
docker stop nutrife-app || true
docker rm nutrife-app || true

echo "🚀 Running container with direct environment variables..."
docker run -d --name nutrife-app -p 3000:3000 \
  -e NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyC8CTpk01nw1xKaC4taNIJMg9iZRaysiaU" \
  -e NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="nutriplate-d7370.firebaseapp.com" \
  -e NEXT_PUBLIC_FIREBASE_PROJECT_ID="nutriplate-d7370" \
  -e NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="nutriplate-d7370.appspot.com" \
  -e NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="500551498783" \
  -e NEXT_PUBLIC_FIREBASE_APP_ID="1:500551498783:web:8e24f45b67b38416be692a" \
  -e BASE_API_URL="http://localhost:8000/v1" \
  -e JWT_SECRET="8f7d9a6e3b2c5f0e1a7d4b8c9e6f3d2a5b1c8e7f9a0d3b6c2e5f8a9d1b4c7e0" \
  -e OPENAI_API_KEY="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" \
  -e GOOGLE_GENAI_API_KEY="AIzaSyC4GqNnYzbQYc71m3IdILLRkHwZHzoXtZM" \
  nutrife_nutrife-app

echo "⏳ Waiting for container to start..."
sleep 5

echo "🔍 Checking environment variables in the container..."
docker exec nutrife-app env | grep -E 'FIREBASE|API_KEY|SECRET|BASE_API_URL'

echo "📝 Container logs:"
docker logs -f nutrife-app 
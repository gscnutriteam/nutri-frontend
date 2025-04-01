#!/bin/bash

echo "🔄 Stopping any running containers..."
docker-compose down

echo "🧹 Cleaning Docker caches..."
docker builder prune -f

echo "🔨 Building the Docker image with runtime environment variables..."
docker build -t nutrife-runtime-image -f Dockerfile.runtime .

echo "🚀 Running the container with built-in environment variables..."
docker run -d --name nutrife-app -p 3000:3000 nutrife-runtime-image

echo "⏳ Waiting for container to start..."
sleep 5

echo "🔍 Checking environment variables in the container..."
docker exec nutrife-app env | grep -E 'FIREBASE|API_KEY|SECRET|BASE_API_URL'

echo "📝 Container logs:"
docker logs -f nutrife-app 
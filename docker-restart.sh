#!/bin/bash

echo "🔄 Stopping any running containers..."
docker-compose down

echo "🧹 Removing old container images..."
docker-compose rm -f

echo "🚀 Rebuilding and starting the container with environment variables..."
docker-compose up -d --build

echo "⏳ Waiting for container to start..."
sleep 5

echo "🔍 Checking environment variables in the container..."
docker exec nutrife-app env | grep -E 'FIREBASE|API_KEY|SECRET|BASE_API_URL'

echo "📝 Container logs:"
docker-compose logs -f 
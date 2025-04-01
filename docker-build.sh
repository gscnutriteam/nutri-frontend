#!/bin/bash

echo "🔄 Stopping any running containers..."
docker-compose down

echo "🧹 Cleaning up Docker build cache..."
docker builder prune -f

echo "🔨 Building the Docker image..."
docker-compose build --no-cache

echo "🚀 Starting the container..."
docker-compose up -d

echo "📝 Container logs:"
docker-compose logs -f 
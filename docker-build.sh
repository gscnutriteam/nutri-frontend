#!/bin/bash

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

echo "🔄 Stopping any running containers..."
docker-compose down

echo "🧹 Cleaning up Docker build cache..."
docker builder prune -f

echo "🔨 Building Docker image with environment variables..."
docker-compose build

echo "✅ Build complete!"

echo "🚀 Starting the container..."
docker-compose up -d

echo "📝 Container logs:"
docker-compose logs -f 
#!/bin/bash

echo "🔄 Stopping any running containers..."
docker-compose down

echo "🚀 Starting the container with environment variables..."
docker-compose up -d

echo "📝 Container logs:"
docker-compose logs -f 
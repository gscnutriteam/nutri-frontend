#!/bin/bash

echo "🔍 Checking environment variables in the container..."
docker exec nutrife-app env | grep -E 'FIREBASE|API_KEY|SECRET|BASE_API_URL' 
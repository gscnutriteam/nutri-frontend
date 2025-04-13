#!/bin/bash

echo "🧹 Membersihkan Docker..."
docker-compose down
docker builder prune -f
docker system prune -f --volumes

echo "💥 Menghapus folder .next jika ada..."
rm -rf .next

echo "📝 Membuat next.config.js dengan output: 'standalone'..."
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ["firebase"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 600,
  images: {
    remotePatterns: [
      { hostname: "firebasestorage.googleapis.com" },
      { hostname: "example.com" },
      { hostname: "placehold.co" },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
EOL

echo "🔨 Membangun image Docker dengan --no-cache..."
DOCKER_BUILDKIT=0 docker-compose build --no-cache

echo "🚀 Menjalankan container..."
docker-compose up -d

echo "📝 Melihat log container..."
docker logs -f nutrife-app 
import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  scope: '/app',
});

const nextConfig: NextConfig = {
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "example.com",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "storage.googleapis.com",
      },
      {
        hostname: "ui-avatars.com",
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ["firebase"],
  },
  staticPageGenerationTimeout: 600,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default withPWA(nextConfig);

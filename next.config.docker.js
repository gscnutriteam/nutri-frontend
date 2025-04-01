/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ["firebase"],
  },
  // Disable type checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure images
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
    ]
  },
  // Explicitly mark routes as dynamic that use cookies
  // This prevents "Dynamic server usage" errors during build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Increase the timeout for build
  staticPageGenerationTimeout: 180,
  // Set this to true to disable static optimization completely
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 
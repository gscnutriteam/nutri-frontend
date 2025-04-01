FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install necessary build dependencies
RUN apk add --no-cache libc6-compat python3 make g++

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1

# Use our custom Next.js config for Docker builds
RUN cp next.config.docker.js next.config.js

# Build the application with ESLint and TypeScript checking disabled
ENV NEXT_LINT=false
ENV NEXT_SKIP_TYPE_CHECK=true
ENV NODE_ENV=production

# Add empty Firebase credentials to prevent build errors
ENV NEXT_PUBLIC_FIREBASE_API_KEY="placeholder"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="placeholder"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="placeholder"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="placeholder"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="placeholder"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="placeholder"
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="placeholder"

# Run the build
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"] 
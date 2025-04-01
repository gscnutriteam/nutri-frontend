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

# Add Firebase credentials with real values
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyC8CTpk01nw1xKaC4taNIJMg9iZRaysiaU"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="nutriplate-d7370.firebaseapp.com"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="nutriplate-d7370"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="nutriplate-d7370.appspot.com"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="500551498783"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="1:500551498783:web:8e24f45b67b38416be692a"
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""

# Add other environment variables
ENV BASE_API_URL="http://localhost:8000/v1"
ENV JWT_SECRET="8f7d9a6e3b2c5f0e1a7d4b8c9e6f3d2a5b1c8e7f9a0d3b6c2e5f8a9d1b4c7e0"
ENV OPENAI_API_KEY="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"
ENV GOOGLE_GENAI_API_KEY="AIzaSyC4GqNnYzbQYc71m3IdILLRkHwZHzoXtZM"

# Run the build
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add runtime environment variables
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyC8CTpk01nw1xKaC4taNIJMg9iZRaysiaU"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="nutriplate-d7370.firebaseapp.com"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="nutriplate-d7370"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="nutriplate-d7370.appspot.com"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="500551498783"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="1:500551498783:web:8e24f45b67b38416be692a"
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
ENV BASE_API_URL="http://localhost:8000/v1"
ENV JWT_SECRET="8f7d9a6e3b2c5f0e1a7d4b8c9e6f3d2a5b1c8e7f9a0d3b6c2e5f8a9d1b4c7e0"
ENV OPENAI_API_KEY="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"
ENV GOOGLE_GENAI_API_KEY="AIzaSyC4GqNnYzbQYc71m3IdILLRkHwZHzoXtZM"

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
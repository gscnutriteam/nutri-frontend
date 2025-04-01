import { NextResponse } from 'next/server';

export async function GET() {
  // Filter environment variables yang ingin ditampilkan
  const envVars = {
    // Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    
    // API dan Auth (server-side only)
    BASE_API_URL: process.env.BASE_API_URL || 'Not Available (Server-side only)',
    JWT_SECRET: process.env.JWT_SECRET ? 'Set (Hidden for security)' : 'Not Set',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Set (Hidden for security)' : 'Not Set',
    GOOGLE_GENAI_API_KEY: process.env.GOOGLE_GENAI_API_KEY ? 'Set (Hidden for security)' : 'Not Set',
    
    // Next.js
    NODE_ENV: process.env.NODE_ENV,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
  };

  return NextResponse.json({
    status: 'success',
    message: 'Current environment variables',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    data: envVars
  });
} 
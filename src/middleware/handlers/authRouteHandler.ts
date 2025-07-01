import { NextRequest, NextResponse } from 'next/server';
import { getPayloadFromToken } from '@/lib/jwt';

/**
 * Handler for authentication routes - redirects to login if no token
 */
export async function handleAuthRoutes(request: NextRequest, pathname: string): Promise<NextResponse | null> {
  console.log("🔑 Auth routes handler running for", pathname);
  
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // If no tokens at all, redirect to login
  if (!accessToken || !refreshToken) {
    console.log("❌ No tokens found, redirecting to login");
    const url = new URL('/app/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // IMPORTANT: We don't check token validity here anymore
  // Token validation and refresh is handled by the token refresh middleware
  // which runs before this handler
  
  console.log("✅ Tokens exist, allowing access");
  return null;
} 
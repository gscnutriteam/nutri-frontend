import { NextRequest, NextResponse } from 'next/server';
import { refreshTokenMiddleware } from '@/services/auth/middleware/authMiddleware';
import { isJwtExpired } from '@/lib/jwt';

/**
 * Attempts to refresh an expired access token using the refresh token
 */
export async function handleTokenRefresh(request: NextRequest): Promise<NextResponse | null> {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // Skip refresh logic for static assets and other non-app routes
  if (request.nextUrl.pathname.startsWith('/_next/') || 
      request.nextUrl.pathname.startsWith('/assets/') ||
      request.nextUrl.pathname === '/favicon.ico' ||
      request.nextUrl.pathname === '/manifest.webmanifest') {
    return null;
  }

  // Refresh when:
  // 1. Access token doesn't exist but refresh token does
  // 2. Access token is expired but refresh token exists
  if ((refreshToken && !accessToken) || 
      (refreshToken && accessToken && isJwtExpired(accessToken))) {
    
    // If refresh token is valid, use it
    if (!isJwtExpired(refreshToken)) {
      // Use the token refresh middleware
      return await refreshTokenMiddleware(request);
    }
    
    // If refresh token is expired, redirect to login
    const response = NextResponse.redirect(new URL('/app/login', request.url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }

  // No need to refresh
  return null;
} 
import { NextRequest, NextResponse } from 'next/server';
import { isAuthRoute, isGuestRoute, isMemberRoute } from './utils';
import { handleAuthRoutes } from './handlers/authRouteHandler';
import { handleGuestRoutes } from './handlers/guestRouteHandler';
import { handleMemberRoutes } from './handlers/memberRouteHandler';
import { handleFeatureRoutes } from './handlers/featureRouteHandler';
import { handleTokenPage } from './handlers/tokenPageHandler';
import { handleDashboardPage } from './handlers/dashboardHandler';
import { handleDebugPages } from './handlers/debugPageHandler';
import { handleTokenRefresh } from './handlers/tokenRefreshHandler';
import { middlewareConfig } from './config/routes';
import { isJwtExpired } from '@/lib/jwt';

/**
 * Main middleware handler that integrates all route-specific handlers
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware processing for static assets and other non-app routes
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/assets/') ||
      pathname === '/favicon.ico' ||
      pathname === '/manifest.webmanifest') {
    return NextResponse.next();
  }
  
  // Process the request through each handler in sequence until one returns a response
  let response: NextResponse | null = null;
  
  // 1. Check if we need to refresh tokens FIRST
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  
  // 1.1 Check for token refresh when:
  // - Access token is missing but refresh token exists
  // - Access token is expired but refresh token exists
  if ((refreshToken && !accessToken) || (accessToken && isJwtExpired(accessToken))) {
    response = await handleTokenRefresh(request);
    if (response) {
      return response;
    }
  }
  
  // 2. Check debug routes (these are special)
  response = await handleDebugPages(request, pathname);
  if (response) {
    return response;
  }
  
  // 3. Handle guest routes (login, register, etc.)
  if (isGuestRoute(pathname)) {
    response = await handleGuestRoutes(request);
    if (response) {
      return response;
    }
  }
  
  // 4. Handle authenticated routes that require auth
  if (isAuthRoute(pathname)) {
    response = await handleAuthRoutes(request, pathname);
    if (response) {
      return response;
    }
  }
  
  // 5. Handle member routes (verified users)
  if (isMemberRoute(pathname)) {
    response = await handleMemberRoutes(request);
    if (response) {
      return response;
    }
  }
  
  // 6. Handle feature-protected routes
  response = await handleFeatureRoutes(request, pathname);
  if (response) {
    return response;
  }
  
  // 7. Special handlers for specific pages
  
  // 7.1 Token page handler
  response = await handleTokenPage(request, pathname);
  if (response) {
    return response;
  }
  
  // 7.2 Dashboard page handler
  response = await handleDashboardPage(request, pathname);
  if (response) {
    return response;
  }
  
  // If no handler returned a response, proceed with the request
  return NextResponse.next();
}

// Export the matcher configuration for Next.js
export const config = middlewareConfig; 
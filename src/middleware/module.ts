import { NextRequest, NextResponse } from 'next/server';
import { isAuthRoute, isGuestRoute, isMemberRoute } from './utils';
import { handleAuthRoutes } from './handlers/authRouteHandler';
import { handleGuestRoutes } from './handlers/guestRouteHandler';
import { handleMemberRoutes } from './handlers/memberRouteHandler';
import { handleFeatureRoutes } from './handlers/featureRouteHandler';
import { handleTokenPage } from './handlers/tokenPageHandler';
import { handleDashboardPage } from './handlers/dashboardHandler';
import { handleDebugPages } from './handlers/debugPageHandler';
import { middlewareConfig } from './config/routes';

/**
 * Main middleware handler that integrates all route-specific handlers
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Process the request through each handler in sequence until one returns a response
  let response: NextResponse | null = null;
  
  // 1. Check debug routes first
  response = await handleDebugPages(request, pathname);
  if (response) return response;
  
  // 2. Handle authenticated routes
  if (isAuthRoute(pathname)) {
    response = await handleAuthRoutes(request, pathname);
    if (response) return response;
  }
  
  // 3. Handle guest routes
  if (isGuestRoute(pathname)) {
    response = await handleGuestRoutes(request);
    if (response) return response;
  }
  
  // 4. Handle member routes
  if (isMemberRoute(pathname)) {
    response = await handleMemberRoutes(request);
    if (response) return response;
  }
  
  // 5. Handle feature-protected routes
  response = await handleFeatureRoutes(request, pathname);
  if (response) return response;
  
  // 6. Special handlers for specific pages
  
  // 6.1 Token page handler
  response = await handleTokenPage(request, pathname);
  if (response) return response;
  
  // 6.2 Dashboard page handler
  response = await handleDashboardPage(request, pathname);
  if (response) return response;
  
  // If no handler returned a response, proceed with the request
  return NextResponse.next();
}

// Export the matcher configuration for Next.js
export const config = middlewareConfig; 
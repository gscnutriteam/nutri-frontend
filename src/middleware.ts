import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getPayloadFromToken, verifyJWT } from './lib/jwt';

// Define auth and guest routes
const baseURL = '/app';
let authRoutes = ['/token'];
let memberUserRoutes = ['/scan', '/info-kesehatan'];
let guestRoutes = ['/login', '/register', '/forgot-password'];
authRoutes = authRoutes.map(route => `${baseURL}${route}`);
guestRoutes = guestRoutes.map(route => `${baseURL}${route}`);
memberUserRoutes = memberUserRoutes.map(route => `${baseURL}${route}`);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  // For authenticated routes - redirect to login if no token or invalid token
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (!accessToken) {
      const url = new URL('/app/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
    
    // Verify the JWT token
    const isValid = await verifyJWT(accessToken);
    const payload = await getPayloadFromToken(accessToken);
    if (!isValid) {
      // Clear invalid cookies
      const response = NextResponse.redirect(new URL('/app/login', request.url));
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
      return response;
    }
  }

  // For guest routes - redirect to dashboard if already authenticated
  if (guestRoutes.some(route => pathname.startsWith(route))) {
    if (accessToken) {
      // Verify the JWT token
      const isValid = await verifyJWT(accessToken);
      if (isValid) {
        return NextResponse.redirect(new URL('/app', request.url));
      }
        // If token is invalid, clear it but don't redirect (let them stay on guest routes)
        const response = NextResponse.next();
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
    }
  }

  // For member user routes - redirect to dashboard if not a member
  if (memberUserRoutes.some(route => pathname.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/app/token', request.url));
    }
    if (accessToken) {
      // Verify the JWT token
      const isValid = await verifyJWT(accessToken);
      const payload = getPayloadFromToken(accessToken);
      if (!isValid || !payload?.userData.isProductTokenVerified) {
        return NextResponse.redirect(new URL('/app/token', request.url));
      }
    }
  }

  // For active member prevent entering guest routes
  if (pathname.startsWith('/app/token') && accessToken) {
    // Verify the JWT token
    const isValid = await verifyJWT(accessToken);
    const payload = await getPayloadFromToken(accessToken);
    if (isValid && payload?.userData.isProductTokenVerified) {
      return NextResponse.redirect(new URL('/app', request.url));
    }
  }

  if (pathname === '/app') {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/app/login', request.url));
    }

    const isValid = await verifyJWT(accessToken);
    const payload = await getPayloadFromToken(accessToken);

    if (!isValid || !payload?.userData.isProductTokenVerified) {
      return NextResponse.redirect(new URL('/app/token', request.url));
    }
  }

  // Only apply to debug routes, but skip the auth page
  if (pathname.startsWith('/debug') && pathname !== '/debug/auth') {
    // Check if debug mode is enabled
    const isDebugEnabled = process.env.APP_DEBUG === 'true'
    if (!isDebugEnabled) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Get the debug PIN from environment variable
    const correctPin = process.env.DEBUG_PIN
    if (!correctPin) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Check if user is authenticated for debug
    const debugSession = request.cookies.get('debug_session')
    if (!debugSession || debugSession.value !== correctPin) {
      return NextResponse.redirect(new URL('/debug/auth', request.url))
    }
  }

  return NextResponse.next();
}

// Configure specific paths that will trigger middleware
export const config = {
  matcher: [
    // Match routes without spread operator
    '/app/token/:path*',
    '/app/login/:path*',
    '/app/register/:path*',
    '/app/forgot-password/:path*',
    '/app/scan/:path*',
    '/app/info-kesehatan/:path*',
    '/app/token',
    '/app/login',
    '/app/register',
    '/app/forgot-password',
    '/app/scan',
    '/app/info-kesehatan',
    '/app',
    '/debug/:path*'
  ]
};
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, getPayloadFromToken } from '@/lib/jwt';

/**
 * Handler for authentication routes - redirects to login if no token or invalid token
 */
export async function handleAuthRoutes(request: NextRequest, pathname: string): Promise<NextResponse | null> {
  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken) {
    const url = new URL('/app/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  // Verify the JWT token
  const isValid = await verifyJWT(accessToken);
  if (!isValid) {
    // Clear invalid cookies
    const response = NextResponse.redirect(new URL('/app/login', request.url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }

  // Token is valid, continue
  return null;
} 
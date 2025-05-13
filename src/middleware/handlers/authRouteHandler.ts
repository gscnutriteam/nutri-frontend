import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, getPayloadFromToken } from '@/lib/jwt';
import useRefreshAPI from '@/services/auth/api/refresh';

/**
 * Handler for authentication routes - redirects to login if no token or invalid token
 */
export async function handleAuthRoutes(request: NextRequest, pathname: string): Promise<NextResponse | null> {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!accessToken || !refreshToken) {
    const url = new URL('/app/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  if (refreshToken) {
    const isValid = await verifyJWT(refreshToken);
    if (!isValid) {
      // Clear invalid cookies
      const response = NextResponse.redirect(new URL('/app/login', request.url));
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
      return response;
    }
  }

  // Handle refresh token and get new access token
  const refreshResponse = await useRefreshAPI({ refresh_token: refreshToken });
  if (refreshResponse.success) {
    const { access, refresh } = refreshResponse.data?.data || { access: undefined, refresh: undefined };
    if (access && refresh) {
      const response = NextResponse.redirect(new URL(request.url));
      response.cookies.set('access_token', access.token);
      response.cookies.set('refresh_token', refresh.token);
      return response;
    }
    return NextResponse.redirect(new URL('/app/login', request.url));
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
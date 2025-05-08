import { NextRequest, NextResponse } from 'next/server';
import { isJwtExpired } from '@/lib/jwt';
import useRefreshAPI from '@/services/auth/api/refresh';

// Define interfaces for the token structure
interface AuthTokens {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

/**
 * Attempts to refresh an expired access token using the refresh token
 */
export async function handleTokenRefresh(request: NextRequest): Promise<NextResponse | null> {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  
  // If no access token or no refresh token, no refresh is possible
  if (!accessToken || !refreshToken) {
    return null;
  }
  
  // If access token is not expired, no need to refresh
  if (!isJwtExpired(accessToken)) {
    return null;
  }
  
  // If refresh token is expired, nothing to do here, let the auth handlers do the redirect
  if (isJwtExpired(refreshToken)) {
    return null;
  }
  
  try {
    // Call the refresh token API
    const result = await useRefreshAPI({ refresh_token: refreshToken });
    
    if (result && result.success && result.data) {
      const tokenData = result.data as AuthTokens;
      
      // Create a clone of the next response to continue processing the request
      const response = NextResponse.next();
      
      // Set the new tokens in cookies
      response.cookies.set({
        name: 'access_token',
        value: tokenData.access.token,
        expires: new Date(tokenData.access.expires),
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      
      response.cookies.set({
        name: 'refresh_token',
        value: tokenData.refresh.token,
        expires: new Date(tokenData.refresh.expires),
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      
      return response;
    }
  } catch (error) {
    console.error('Token refresh error in middleware:', error);
    // Let the auth handlers handle the redirect
  }
  
  return null;
} 
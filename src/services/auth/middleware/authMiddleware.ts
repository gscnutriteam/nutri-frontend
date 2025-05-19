'use server';

import { cookies } from 'next/headers';
import { isJwtExpired } from '@/lib/jwt';
import useRefreshAPI from '@/services/auth/api/refresh';
import { NextResponse, NextRequest } from 'next/server';

// Define interfaces matching the refresh API response
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

interface ApiResponse {
  success: boolean;
  status: number;
  statusText: string;
  data: {
    message: string;
    status: string;
    data: AuthTokens;
  };
}

interface AuthStatus {
  isAuthenticated: boolean;
  needsRefresh: boolean;
}

/**
 * Middleware to handle authentication tokens
 * Checks if access token is expired and attempts to refresh it using the refresh token
 */
export async function refreshTokenMiddleware(request: NextRequest) {
  // Get cookies
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // If no refresh token, we can't refresh
  if (!refreshToken) {
    return null;
  }

  // Check if refresh token is expired
  if (isJwtExpired(refreshToken)) {
    const response = NextResponse.redirect(new URL('/app/login', request.url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }

  // We have a valid refresh token, we can use it to get a new access token
  // This happens if:
  // 1. There is no access token 
  // 2. The access token is expired
  const needsRefresh = !accessToken || isJwtExpired(accessToken);
  
  if (!needsRefresh) {
    return null;
  }

  // Access token is missing or expired but refresh token is valid - try to refresh
  try {
    // Call the refresh token API
    const refreshResponse = await useRefreshAPI({ refresh_token: refreshToken });
    
    // Check if we have a successful response with tokens
    if (refreshResponse && refreshResponse.success && refreshResponse.data) {
      // The structure is refreshResponse.data.tokens.access/refresh
      const responseData = refreshResponse.data;
      
      if (responseData.tokens && 
          responseData.tokens.access && 
          responseData.tokens.access.token &&
          responseData.tokens.refresh && 
          responseData.tokens.refresh.token) {
        
        const { access, refresh } = responseData.tokens;
        
        // Create a response that continues the request
        const response = NextResponse.next();
        
        // Set the new tokens in cookies
        response.cookies.set({
          name: 'access_token',
          value: access.token,
          expires: new Date(access.expires),
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        
        response.cookies.set({
          name: 'refresh_token',
          value: refresh.token,
          expires: new Date(refresh.expires),
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        
        return response;
      }
    }
  } catch (error) {
    // Error handling quietly fails and redirects to login
  }
  
  // If refresh failed, clear cookies and redirect to login
  const response = NextResponse.redirect(new URL('/app/login', request.url));
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  return response;
}

/**
 * Function for checking if user is authenticated and if refresh is needed
 * For client component usage, use a React hook instead
 */
export function checkAuth(accessToken: string | undefined, refreshToken: string | undefined): AuthStatus {
  if (!accessToken || !refreshToken) {
    return {
      isAuthenticated: false,
      needsRefresh: false
    };
  }
  
  const isAccessTokenExpired = isJwtExpired(accessToken);
  const isRefreshTokenExpired = isJwtExpired(refreshToken);
  
  // Both tokens are valid
  if (!isAccessTokenExpired && !isRefreshTokenExpired) {
    return {
      isAuthenticated: true,
      needsRefresh: false
    };
  }
  
  // Access token expired but refresh token valid
  if (isAccessTokenExpired && !isRefreshTokenExpired) {
    return {
      isAuthenticated: true,
      needsRefresh: true
    };
  }
  
  // Both tokens expired
  return {
    isAuthenticated: false,
    needsRefresh: false
  };
}

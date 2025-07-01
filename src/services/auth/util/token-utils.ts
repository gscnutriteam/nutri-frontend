"use client";

import Cookies from 'js-cookie';
import useRefreshAPI from '../api/refresh';

interface TokensResponse {
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
    tokens?: TokensResponse;
  };
}

/**
 * Store authentication tokens in cookies (client-side)
 */
export const saveTokensToClientCookies = (tokens: TokensResponse) => {
  const accessExpires = new Date(tokens.access.expires);
  const refreshExpires = new Date(tokens.refresh.expires);
  
  const cookieOptions = { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };
  
  Cookies.set('access_token', tokens.access.token, { 
    ...cookieOptions, 
    expires: accessExpires
  });
  
  Cookies.set('refresh_token', tokens.refresh.token, { 
    ...cookieOptions, 
    expires: refreshExpires 
  });
};

/**
 * Refreshes the auth tokens using the refresh token
 * Should be used client-side
 */
export const refreshAuthTokens = async (): Promise<boolean> => {
  const refreshToken = Cookies.get('refresh_token');
  
  if (!refreshToken) {
    // No refresh token available
    return false;
  }
  
  try {
    const response = await useRefreshAPI({ refresh_token: refreshToken }) as ApiResponse;
    
    if (response.success && response.data?.tokens) {
      // Update the tokens in cookies
      saveTokensToClientCookies(response.data.tokens);
      return true;
    } 
    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
}; 

"use client";

import Cookies from 'js-cookie';
import { isJwtExpired } from './jwt';

// Function to refresh the token
export async function refreshAccessToken() {
  const refreshToken = Cookies.get('refresh_token');
  
  if (!refreshToken || isJwtExpired(refreshToken)) {
    // If refresh token is missing or expired, clear all auth cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    return false;
  }
  
  try {
    const response = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    const data = await response.json();
    
    if (data.success && data.tokens) {
      // Update the tokens in cookies
      Cookies.set('access_token', data.tokens.access.token, { 
        expires: new Date(data.tokens.access.expires),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      if (data.tokens.refresh) {
        Cookies.set('refresh_token', data.tokens.refresh.token, { 
          expires: new Date(data.tokens.refresh.expires),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }
      
      return true;
    } 
    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
}

// This can be used in a React component or custom hook to check and refresh token
export function useTokenRefresh() {
  return async () => {
    const accessToken = Cookies.get('access_token');
    
    if (!accessToken || isJwtExpired(accessToken)) {
      return await refreshAccessToken();
    }
    
    return true; // Token is still valid
  };
}
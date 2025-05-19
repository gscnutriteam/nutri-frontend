"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { isJwtExpired } from '@/lib/jwt';
import useRefreshAPI from '@/services/auth/api/refresh';

// Interface for auth status
interface AuthStatus {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * React hook to handle token refresh on the client side
 * Will automatically refresh the token if needed and redirect to login if refresh fails
 */
export function useTokenRefresh(): AuthStatus {
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const checkAndRefresh = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        const refreshToken = Cookies.get('refresh_token');
        
        // If no tokens exist, redirect to login
        if (!accessToken || !refreshToken) {
          setStatus({
            isAuthenticated: false,
            isLoading: false,
            error: 'No authentication tokens found'
          });
          router.push('/app/login');
          return;
        }
        
        // If access token is not expired, continue as authenticated
        if (!isJwtExpired(accessToken)) {
          setStatus({
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          return;
        }
        
        // If refresh token is expired, redirect to login
        if (isJwtExpired(refreshToken)) {
          // Clear cookies
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          
          setStatus({
            isAuthenticated: false,
            isLoading: false,
            error: 'Authentication expired'
          });
          
          router.push('/app/login');
          return;
        }
        
        // Try to refresh the token
        const response = await fetch('/api/auth/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
        
        const data = await response.json();
        
        if (data.success && data.tokens) {
          // Set new tokens in cookies
          Cookies.set('access_token', data.tokens.access.token, { 
            expires: new Date(data.tokens.access.expires),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          
          Cookies.set('refresh_token', data.tokens.refresh.token, { 
            expires: new Date(data.tokens.refresh.expires),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          
          setStatus({
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          // Refresh failed, redirect to login
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          
          setStatus({
            isAuthenticated: false,
            isLoading: false,
            error: 'Failed to refresh authentication'
          });
          
          router.push('/app/login');
        }
      } catch (error) {
        console.error('Error in token refresh:', error);
        
        // Clear cookies on error
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        
        setStatus({
          isAuthenticated: false,
          isLoading: false,
          error: 'Authentication error occurred'
        });
        
        router.push('/app/login');
      }
    };
    
    checkAndRefresh();
  }, [router]);
  
  return status;
} 
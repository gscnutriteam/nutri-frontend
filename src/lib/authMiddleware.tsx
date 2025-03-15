"use client";

import { useRouter } from 'next/navigation';
import { useEffect, Fragment } from 'react';
import Cookies from 'js-cookie';
import { isJwtExpired, getPayloadFromToken } from './jwt';

type MiddlewareProps = {
  children: React.ReactNode;
};

// For protected routes (authenticated users only)
export function AuthMiddleware({ children }: MiddlewareProps) {
  const router = useRouter();
  const accessToken = Cookies.get('access_token');

  useEffect(() => {
    // Check if token exists and is not expired
    if (!accessToken || isJwtExpired(accessToken)) {
      // Clear invalid tokens
      if (accessToken) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
      }
      router.push('/login');
    }
  }, [accessToken, router]);

  // If no token or expired, don't render the children
  if (!accessToken || isJwtExpired(accessToken)) {
    return null;
  }

  return <>children</>;
}

// For guest routes (non-authenticated users only)
export function GuestMiddleware({ children }: MiddlewareProps) {
  const router = useRouter();
  const accessToken = Cookies.get('access_token');

  useEffect(() => {
    // Check if token exists and is valid
    if (accessToken && !isJwtExpired(accessToken)) {
      router.push('/dashboard');
    }
  }, [accessToken, router]);

  // If token exists and is valid, don't render the children
  if (accessToken && !isJwtExpired(accessToken)) {
    return null;
  }

  return <>{children}</>;
}

// Enhanced isAuthenticated function that checks token validity
export function isAuthenticated() {
  const accessToken = Cookies.get('access_token');
  return accessToken && !isJwtExpired(accessToken);
}

// Get user info from the token
export function getUserFromToken() {
  const accessToken = Cookies.get('access_token');
  if (!accessToken || isJwtExpired(accessToken)) {
    return null;
  }
  
  return getPayloadFromToken(accessToken);
}
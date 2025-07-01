"use client";

import { ReactNode } from 'react';
import { useTokenRefresh } from '../hooks/useTokenRefresh';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface TokenRefreshWrapperProps {
  children: ReactNode;
  loadingComponent?: ReactNode;
}

/**
 * Component that wraps protected content and ensures tokens are refreshed when needed
 */
export default function TokenRefreshWrapper({
  children,
  loadingComponent = <LoadingSpinner />,
}: TokenRefreshWrapperProps) {
  const { isAuthenticated, isLoading, error } = useTokenRefresh();

  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    // If there's an error, the hook will already handle redirection to login
    return null;
  }

  if (!isAuthenticated) {
    // This shouldn't happen if the hook is working correctly, 
    // but we'll handle it just in case
    return null;
  }

  // User is authenticated and token is refreshed if needed
  return <>{children}</>;
} 
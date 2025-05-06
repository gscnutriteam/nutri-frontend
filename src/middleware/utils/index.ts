import { NextRequest, NextResponse } from 'next/server';
import { authRoutes, guestRoutes, memberUserRoutes } from '../config/routes';

/**
 * Check if a path matches any of the routes in a given array
 */
export function isPathInRoutes(pathname: string, routes: string[]): boolean {
  return routes.some(route => pathname.startsWith(route));
}

/**
 * Helper to check if a path is an auth route
 */
export function isAuthRoute(pathname: string): boolean {
  return isPathInRoutes(pathname, authRoutes);
}

/**
 * Helper to check if a path is a guest route
 */
export function isGuestRoute(pathname: string): boolean {
  return isPathInRoutes(pathname, guestRoutes);
}

/**
 * Helper to check if a path is a member route
 */
export function isMemberRoute(pathname: string): boolean {
  return isPathInRoutes(pathname, memberUserRoutes);
}

/**
 * Create a response that clears authentication cookies
 */
export function clearAuthCookies(response: NextResponse): NextResponse {
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  return response;
} 
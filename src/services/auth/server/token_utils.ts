'use server';

import type { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies'; 
import type { LoginResponse } from '@/services/auth/api/login'; 

// Assuming Tokens type is part of LoginResponse or defined elsewhere and re-exported
// If LoginResponse includes a 'tokens' field of type Tokens, we can infer it or use LoginResponse['tokens']
export type Tokens = LoginResponse['tokens'];

// This should be your actual backend API endpoint for refreshing tokens
const REFRESH_API_ENDPOINT = (process.env.NEXT_PUBLIC_API_URL || '') + '/auth/refresh';

/**
 * Calls the backend API to refresh tokens.
 */
async function callRefreshApi(refreshToken: string): Promise<{ success: boolean; data?: LoginResponse; error?: string }> {
  try {
    const response = await fetch(REFRESH_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!response.ok) {
      let errorMsg = `Token refresh failed with status: ${response.status}`;
      try { const errorData = await response.json(); errorMsg = errorData.message || errorMsg; } catch (e) { /* ignore */ }
      return { success: false, error: errorMsg };
    }
    const data: LoginResponse = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "API call error" };
  }
}

/**
 * Sets the authentication tokens as HttpOnly cookies.
 * @param cookieStore The cookie store instance from next/headers (must have .set method).
 * @param tokens The tokens to set.
 */
export async function setHttpOnlyCookies(cookieStore: ResponseCookies, tokens: Tokens): Promise<void> {
  const oneHour = 60 * 60 * 1000;
  const sevenDays = 7 * 24 * oneHour;

  cookieStore.set('access_token', tokens.access.token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', path: '/', expires: new Date(Date.now() + oneHour),
  });
  cookieStore.set('refresh_token', tokens.refresh.token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', path: '/', expires: new Date(Date.now() + sevenDays),
  });
}

/**
 * Attempts to refresh the authentication tokens and sets new HttpOnly cookies.
 * @param cookieStore The cookie store instance from next/headers (must have .get and .set methods).
 */
export async function refreshTokensAndSetCookies(cookieStore: ResponseCookies): Promise<{ success: boolean; error?: string }> {
  const refreshTokenValue = cookieStore.get('refresh_token')?.value;
  if (!refreshTokenValue) return { success: false, error: 'No refresh token found.' };

  const refreshResult = await callRefreshApi(refreshTokenValue);
  if (refreshResult.success && refreshResult.data?.tokens) {
    await setHttpOnlyCookies(cookieStore, refreshResult.data.tokens);
    return { success: true };
  } else {
    return { success: false, error: refreshResult.error || 'Refresh failed.' };
  }
} 
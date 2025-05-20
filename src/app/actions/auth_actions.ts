'use server';

import { cookies } from 'next/headers';
import { 
    refreshTokensAndSetCookies as refreshTokensUtil, 
    setHttpOnlyCookies 
} from '@/services/auth/server/token_utils';
import type { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import useRefreshAPI from '@/services/auth/api/refresh'; // Your existing refresh API

export async function refreshAuthTokenServerAction(): Promise<{ success: boolean; error?: string }> {
  const cookieStore = cookies() as unknown as ResponseCookies;
  
  try {
    const result = await refreshTokensUtil(cookieStore);
    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.error || 'Server action: Token refresh utility failed.' };
    }
  } catch (error) {
    console.error('refreshAuthTokenServerAction error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Server action: Unknown error during token refresh.' };
  }
}

/**
 * Server Action to explicitly refresh tokens (e.g., after profile update)
 * and set them in HttpOnly cookies.
 */
export async function refreshAndSetNewTokensAfterUpdate(): Promise<{ success: boolean; error?: string }> {
  const cookieStore = cookies() as unknown as ResponseCookies;
  const currentRefreshToken = cookieStore.get('refresh_token')?.value;

  if (!currentRefreshToken) {
    return { success: false, error: 'No refresh token found to perform post-update refresh.' };
  }

  try {
    // Call your existing /auth/refresh-tokens API via useRefreshAPI
    const refreshApiResponse = await useRefreshAPI({ refresh_token: currentRefreshToken });

    if (refreshApiResponse.success && refreshApiResponse.data?.tokens) {
      // Set the new tokens as HttpOnly cookies
      setHttpOnlyCookies(cookieStore, refreshApiResponse.data.tokens);
      console.log('Post-update token refresh and cookie set successful.');
      return { success: true };
    } else {
      const errorMsg = refreshApiResponse.error || refreshApiResponse.data?.message || 'Post-update token refresh failed.';
      console.error('Post-update token refresh failed:', errorMsg);
      return { success: false, error: errorMsg };
    }
  } catch (error) {
    console.error('Error in refreshAndSetNewTokensAfterUpdate server action:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error during post-update token refresh.' };
  }
} 
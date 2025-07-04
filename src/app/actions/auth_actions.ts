'use server';

import { cookies } from 'next/headers';
import { 
    setHttpOnlyCookies 
} from '@/services/auth/server/token_utils';
import type { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import useRefreshAPI from '@/services/auth/api/refresh';
import { apiClient } from '@/lib/api_instance';

interface AuthTokens {
  access: { token: string; expires: string; };
  refresh: { token: string; expires: string; };
}

// Removed refreshAuthTokenServerAction as it seemed to use a different pattern
// and was not part of the final verify-email flow we built.
// If it's needed elsewhere, it can be kept or refactored.

export async function refreshAndSetNewTokensAfterUpdate(): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies();
  const currentRefreshToken = cookieStore.get('refresh_token')?.value;

  if (!currentRefreshToken) {
    return { success: false, error: 'No refresh token found to perform post-update refresh.' };
  }
  try {
    const refreshApiResponse = await useRefreshAPI({ refresh_token: currentRefreshToken });
    if (refreshApiResponse.success && refreshApiResponse.data?.tokens) {
      setHttpOnlyCookies(cookieStore as unknown as ResponseCookies, refreshApiResponse.data.tokens);
      return { success: true };
    } else {
      const errorMsg = refreshApiResponse.error || refreshApiResponse.data?.message || 'Post-update token refresh failed.';
      return { success: false, error: errorMsg };
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error during post-update token refresh.' };
  }
}

export async function performTokenRefreshAndSetCookies(): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const currentRefreshToken = cookieStore.get('refresh_token')?.value;

  if (!currentRefreshToken) {
    const msg = 'No refresh token found in cookies. Cannot refresh session.';
    console.warn('Server Action (performTokenRefreshAndSetCookies):', msg);
    return { success: false, message: msg };
  }

  try {
    const refreshApiResponse = await useRefreshAPI({ refresh_token: currentRefreshToken });

    if (refreshApiResponse.success && refreshApiResponse.data?.tokens) {
      setHttpOnlyCookies(cookieStore as unknown as ResponseCookies, refreshApiResponse.data.tokens);
      const msg = 'Session refreshed and new tokens set successfully.';
      return { success: true, message: msg };
    } else {
      const errorMsg = refreshApiResponse.error || refreshApiResponse.data?.message || 'Token refresh from action failed.';
      console.error('Server Action (performTokenRefreshAndSetCookies): Refresh API call unsuccessful:', errorMsg);
      return { success: false, message: errorMsg };
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error during token refresh action.';
    console.error('Server Action (performTokenRefreshAndSetCookies): Critical error:', errorMsg);
    return { success: false, message: errorMsg };
  }
}

export async function resetPasswordAction(
  token: string, 
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  if (!token) {
    return { success: false, message: "Reset token is missing." };
  }
  
  const endpoint = `/auth/reset-password?token=${token}`;
  
  try {
    const response = await apiClient<
      { password: string }, 
      { status: string; message: string } // Expected success response structure
    >(
      endpoint,
      'POST',
      { password: newPassword },
      false // No authentication needed for this endpoint
    );

    console.log(response);
    if (response.success && response.data?.status === 'success') {
      return { success: true, message: response.data.message || "Password reset successfully." };
    } else {
      // Use message from API response if available, otherwise provide a generic error
      const errorMessage = response.data?.message || response.error || "Password reset failed. Please try again.";
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error('Critical error in resetPasswordAction:', error);
    return { success: false, message: error instanceof Error ? error.message : "An unexpected error occurred during password reset." };
  }
}

// Removing the old processEmailVerificationAndSessionRefresh function
// interface VerifyEmailApiResponse { // No longer needed here
//   status: string;
//   message: string;
// }
// export async function processEmailVerificationAndSessionRefresh(...) { ... } // REMOVED 
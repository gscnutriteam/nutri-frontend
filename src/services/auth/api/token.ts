'use server'

import { apiClient } from '@/lib/api_instance'
import { cookies } from 'next/headers'

interface TokenRequest {
    token: string
}

// Match the token structure expected by saveAuthTokens
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

interface APIResponse {
    success: boolean;
    status: number;
    statusText: string;
    data: {
        tokens?: TokensResponse;
        message?: string;
    };
}

/**
 * Calls the token API with the provided token
 * 
 * @param data - The token data
 * @returns A promise with the API response
 */
const useTokenAPI = async (data: TokenRequest) => {
    try {
        // The auth token from cookies will be automatically included by apiClient
        const response = await apiClient<TokenRequest, any>(`/product-token/verify?token=${data.token}`, 'POST', {token: data.token}, true);
        
        // If successful and we have tokens in the response, save them to cookies
        if (response.success && response.data?.tokens) {
            // Get cookie store
            const cookieStore = await cookies();
            
            // Set access token
            cookieStore.set('access_token', response.data.tokens.access.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(response.data.tokens.access.expires),
                path: '/'
            });
            
            // Set refresh token
            cookieStore.set('refresh_token', response.data.tokens.refresh.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(response.data.tokens.refresh.expires),
                path: '/'
            });
        }
        
        return response;
    } catch (error) {
        console.error('Token API error:', error)
        throw error;
    }
}

/**
 * Get the auth token from cookies
 */
export const getAuthToken = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    return cookieStore.get('access_token')?.value || null;
}

/**
 * Get the refresh token from cookies
 */
export const getRefreshToken = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    return cookieStore.get('refresh_token')?.value || null;
}

export const removeAuthTokens = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
}

export const replaceAuthTokens = async (accessToken: string, refreshToken: string) => {
    const cookieStore = await cookies();
    cookieStore.set('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
}

export default useTokenAPI;
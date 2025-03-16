'use server'

import { apiClient } from '@/lib/api_instance'
import { cookies } from 'next/headers'

interface TokenRequest {
    token: string
}

interface TokenResponse {
   message: string,
   status: string
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
        return await apiClient(`/product-token/verify?token=${data.token}`, 'POST', {token: data.token}, true);
    } catch (error) {
        console.error('Token API error:', error)
        throw error;
    }
}



export const getAuthToken = async (): Promise<string | null> => {
    const cookie = await cookies()
    const data =  cookie.get('access_token')?.value || null;
    return data;
}

export default useTokenAPI;
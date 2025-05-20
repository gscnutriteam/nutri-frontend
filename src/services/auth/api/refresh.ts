'use server'

import { apiClient } from "@/lib/api_instance";

interface RefreshRequest {
    refresh_token: string;
}

interface AuthTokens {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string; 
    };
}

interface RefreshResponse {
    message?: string;
    status: string; 
    tokens: AuthTokens;
}

interface ApiResponseWrapper {
    success: boolean;
    status: number;
    statusText: string;
    data?: RefreshResponse;
    error?: string;
}

/**
 * API function to refresh authentication tokens
 * @param data The request containing the refresh token
 * @returns A promise containing the API response with new tokens
 */
const useRefreshAPI = async (data: RefreshRequest): Promise<ApiResponseWrapper> => {
    try {
        const response = await apiClient<RefreshRequest, RefreshResponse>(
            '/auth/refresh-tokens', 
            'POST', 
            data 
        );
        return response as ApiResponseWrapper;
    } catch (error) {
        throw error;
    }
}

export default useRefreshAPI;
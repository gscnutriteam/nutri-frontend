'use server'

import { apiClient } from "@/lib/api_instance";

interface LogoutRequest {
    refresh_token: string;
}

interface LogoutResponse {
    message: string;
    status: string;
}

/**
 * Calls the logout API with the provided refresh token
 * 
 * @param data - The token data
 * @returns A promise with the API response
 */

const useLogoutAPI = async (data: LogoutRequest) => {
    try {
        return await apiClient('/auth/logout', 'POST', data);
    } catch (error) {
        console.error('Logout API error:', error);
        throw error;
    }
}

export default useLogoutAPI;
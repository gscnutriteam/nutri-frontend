'use server'

import { apiClient } from "@/lib/api_instance";

interface RefreshRequest {
    refresh_token: string;
}

interface RefreshResponse {
    message: string;
    status: string; 
    data: AuthTokens;
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


const useRefreshAPI = async (data: RefreshRequest) => {
    try {
        return await apiClient('/auth/refresh-tokens', 'POST', data);
    } catch (error) {
        console.error('Refresh API error:', error);
        throw error;
    }
}

export default useRefreshAPI;
'use server';

import { apiClient } from "@/lib/api_instance";
import { logger } from "@/lib/logger";

interface LoginRequest {
  email: string;
  password: string;
}

// Type definition for API response
export interface LoginResponse {
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    verified_email: boolean;
  };
}

/**
 * Calls the login API with user credentials
 */
const useLoginAPI = async (data: LoginRequest) => {
  try {
    return await apiClient('/auth/login', 'POST', data);
  } catch (error) {
    logger.error('Login API error:', error);
    throw error;
  }
}


const useLoginGoogle = async (token: string) => {
  try {
    return await apiClient(`/auth/google?id_token=${token}`, 'GET');
  } catch (error) {
    logger.error('Login API error:', error);
    throw error;
  }
}

export default useLoginAPI;
export { useLoginGoogle };

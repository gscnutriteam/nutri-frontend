'use server';

import { apiClient } from "@/lib/api_instance";
import { type Gender, type RegisterData, PhsyicalActivity } from "../store/register_store";
import { mapRegisterDataToRequest } from "../util/util";

/**
 * Interface for the register API request payload
 */
export interface RegisterRequest {
    activity_level: string;
    birth_date: Date;
    email: string;
    gender: Gender;
    height: number;
    medical_history: string;
    name: string;
    password: string;
    weight: number;
}

/**
 * Response interface for registration API
 */
export interface RegisterResponse {
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
 * Calls the registration API with the provided user data
 * 
 * @param data - The user registration data
 * @returns A promise with the API response
 */
const useRegisterAPI = async (data: RegisterData) => {
  try {
    const userData: RegisterRequest = mapRegisterDataToRequest(data);
    return await apiClient('/auth/register', 'POST', userData);
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
}

export default useRegisterAPI;
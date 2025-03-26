"use server";

import { apiClient } from "@/lib/api_instance";

export interface WeightHeight {
  height: number;
  id: string;
  recorded_at: string;
  user_id: string;
  weight: number;
}

export interface WeightHeightResponse {
  data: WeightHeight[];
  message: string;
  status: string;
}

export const getWeightHeight = async () => {
  try {
    const response = await apiClient("/weight-height", "GET");

    // Handle response with type assertion
    const responseData = response as any;
    
    // Check if response.data is an array directly or nested
    let data: WeightHeight[] = [];
    
    if (responseData.data) {
      if (Array.isArray(responseData.data)) {
        data = responseData.data;
      } else if (responseData.data.data && Array.isArray(responseData.data.data)) {
        data = responseData.data.data;
      }
    }
    
    return data;
  } catch (error) {
    console.error('❌ getWeightHeight error:', error);
    throw error;
  }
}
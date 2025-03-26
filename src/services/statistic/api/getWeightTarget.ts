"use server";

import { apiClient } from "@/lib/api_instance";

export interface WeightTarget {
  height: number;
  height_history: number;
  id: string;
  record_date: string;
  target_date: string;
  user_id: string;
  weight: number;
  weight_history: number;
}

export interface WeightTargetResponse {
  data: WeightTarget[];
  message: string;
  status: string;
}

export const getWeightTarget = async () => {
  try {
    const response = await apiClient("/weight-height/target", "GET");
    
    // Handle response with type assertion
    const responseData = response as any;
    
    // Check if response.data is an array directly or nested
    let data: WeightTarget[] = [];
    
    if (responseData.data) {
      if (Array.isArray(responseData.data)) {
        data = responseData.data;
      } else if (responseData.data.data && Array.isArray(responseData.data.data)) {
        data = responseData.data.data;
      }
    }

    return data;
  } catch (error) {
    console.error('❌ getWeightTarget error:', error);
    throw error;
  }
}; 
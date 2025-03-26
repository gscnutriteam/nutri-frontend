"use server";

import { apiClient } from "@/lib/api_instance";

export interface WeightTargetInput {
  weight: number;
  height: number;
  target_date: string;
}

export interface WeightTargetData {
  id: string;
  weight: number;
  height: number;
  weight_history: number;
  height_history: number;
  target_date: string;
  record_date: string;
  user_id: string;
}

interface ApiSuccessResponse<T> {
  success: boolean;
  status: number;
  statusText: string;
  data: T;
}

interface ApiErrorResponse {
  success: boolean;
  status: number;
  statusText: string;
  error: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const addWeightTarget = async (data: WeightTargetInput): Promise<ApiResponse<WeightTargetData>> => {
  try {
    const response = await apiClient("/weight-height/target", "POST", {
      weight: data.weight,
      height: data.height,
      target_date: data.target_date,
    });
    return response as ApiResponse<WeightTargetData>;
  } catch (error: any) {
    console.error("Error adding weight target:", error);
    throw error;
  }
}; 
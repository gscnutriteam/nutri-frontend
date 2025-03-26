"use server";

import { apiClient } from "@/lib/api_instance";
import { WeightTargetData } from "./addWeightTarget";

export interface UpdateWeightTargetParams {
  id: string;
  weight: number;
  height: number;
  target_date: string;
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

/**
 * Updates an existing weight target record
 */
export const updateWeightTarget = async (params: UpdateWeightTargetParams): Promise<ApiResponse<WeightTargetData>> => {
  try {
    const response = await apiClient(`/weight-height/target/${params.id}`, "PUT", {
      height: params.height,
      weight: params.weight,
      target_date: params.target_date,
    });
    
    return response as ApiResponse<WeightTargetData>;
  } catch (error) {
    console.error('Error updating weight target:', error);
    throw error;
  }
}; 
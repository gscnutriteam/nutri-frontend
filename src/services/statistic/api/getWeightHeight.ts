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

export const getWeightHeight = async ()=> {
    try {
        const response = await apiClient("/weight-height", "GET");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
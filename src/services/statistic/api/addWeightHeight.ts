"use server";

import { apiClient } from "@/lib/api_instance";

export const addWeightHeight = async (weight: number, height: number) => {
  try {
    const recordedAt = new Date().toISOString();
    const response = await apiClient("/weight-height", "POST", { weight, height, recorded_at: recordedAt });
    return response;
  } catch (error) {
    throw error;
  }
};
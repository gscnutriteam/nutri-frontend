"use server"
import { apiClient } from "@/lib/api_instance";

interface AddMealRequest {
  title: string;
  meal_time: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  comment: string;
  recommendation: string;
}

export interface AddMealResponse {
  meal_history: {
    calories: number;
    carbs: number;
    fat: number;
    id: string;
    label: string;
    meal_time: string;
    protein: number;
    title: string;
    user_id: string;
  };
  message: string;
  status: string;
}

const useAddMeal = async (data: AddMealRequest) => {
  try {
    console.log(data);
    return await apiClient(
      "/meals",
      "POST",
      data
    );
  } catch (error) {
    console.error('Add Meal API error:', error);
    throw error;
  }
};

export default useAddMeal;

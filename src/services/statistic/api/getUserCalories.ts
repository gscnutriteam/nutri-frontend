"use server";

import { apiClient } from "@/lib/api_instance";

interface UserCalorie {
  calories: number;
  carbs: number;
  fat: number;
  id: string;
  label: string;
  meal_image: string;
  title: string;
}

interface GetUserCaloriesResponse {
  limit: number;
  message: string;
  page: number;
  results: UserCalorie[];
}

const useGetUserCalories = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await apiClient(`/meals?page=${page}&limit=${limit}`, "GET");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useGetUserCalories;
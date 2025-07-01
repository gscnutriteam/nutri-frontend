"use server";

import { apiClient } from "@/lib/api_instance";
import { UserNutritionData } from "../data/user-nutrition";
import { calculateMacronutrients, calculateTDEE, calculateCalorieGoal, NutritionUserData, Gender, ActivityLevel } from "../helpers/calculations";

// Interface matching the API response structure from /home/statistic
interface HomeStatisticsResponse {
  status: string;
  message: string;
  data: {
    daily_nutrition: {
      calories: number;
      carbs: number;
      fat: number;
      protein: number;
      date: string;
    };
    weight_height_statistics: {
      current_weight: number;
      current_height: number;
      weight_history: Array<{
        id: string;
        weight: number;
        height: number;
        recorded_at: string;
        user_id: string;
      }>;
      latest_weight_target?: {
        id: string;
        weight: number;
        height: number;
        target_date: string;
        user_id: string;
        weight_history: number;
        height_history: number;
        record_date: string;
      };
    };
  };
}

/**
 * Fetches user's home statistics including nutrition and weight/height data
 */
export const getHomeStatistics = async (): Promise<HomeStatisticsResponse> => {
  try {
    const response = await apiClient("/home/statistic", "GET");
    return response.data as HomeStatisticsResponse;
  } catch (error) {
    console.error("Error fetching home statistics:", error);
    throw error;
  }
};

/**
 * Converts API response to UserNutritionData format
 */
export const convertToUserNutritionData = async (
  statsData: HomeStatisticsResponse, 
  userData: NutritionUserData
): Promise<UserNutritionData> => {
  // Calculate TDEE and calorie goal
  const tdee = calculateTDEE(userData);
  const calorieGoal = calculateCalorieGoal(tdee, userData.weightGoalType);
  
  // Calculate macro targets
  const macros = calculateMacronutrients(calorieGoal);
  
  // Create UserNutritionData object
  const nutritionData: UserNutritionData = {
    userData: userData,
    caloriesGoal: calorieGoal,
    caloriesConsumed: statsData.data.daily_nutrition.calories || 0,
    macros: {
      carbs: { 
        value: statsData.data.daily_nutrition.carbs || 0, 
        max: macros.carbs.grams, 
        unit: 'g' 
      },
      protein: { 
        value: statsData.data.daily_nutrition.protein || 0, 
        max: macros.protein.grams, 
        unit: 'g' 
      },
      fat: { 
        value: statsData.data.daily_nutrition.fat || 0, 
        max: macros.fat.grams, 
        unit: 'g' 
      }
    }
  };
  
  return nutritionData;
}; 
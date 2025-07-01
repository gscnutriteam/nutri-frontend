import { UserNutritionData } from "@/services/nutrition/data/user-nutrition";

// Weight history entry type
export interface WeightHistoryEntry {
  date: string;
  value: number;
}

// Check-in entry type 
export interface DailyCheckin {
  day: string;
  status: string;
  date: string;
}

// Extended user data type
export interface ExtendedUserData {
  name: string;
  isPro: boolean;
  points: number;
  streak?: number;
  currentStreak?: number;
  longestStreak?: number;
  dailyCheckins: DailyCheckin[];
  avatar?: string;
  bmi?: number;
  weight: number;
  targetWeight: number;
  initialWeight?: number;
  weightGoalType: string;
  weightHistory: WeightHistoryEntry[];
  height: number;
  gender?: string;
  age?: number;
  activityLevel?: string;
  [key: string]: any; // Allow additional properties
}

// Meal data type
export interface Meal {
  id: number;
  name: string;
  time: string;
  calories: number;
  image: string;
}

// HomeV2 props interface
export interface HomeV2Props {
  userData: ExtendedUserData;
  nutritionData: UserNutritionData;
  initialLoading: boolean;
}

// CalorieRing component props
export interface CalorieRingProps {
  value: number;
  max: number;
}

// Home API response types
export interface HomeStatisticsResponse {
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
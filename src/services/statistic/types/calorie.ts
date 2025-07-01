export interface UserCalorie {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  id: string;
  label: string;
  meal_image: string;
  meal_time: string;
  title: string;
}

export interface GetUserCaloriesResponse {
  limit: number;
  message: string;
  page: number;
  results: UserCalorie[];
}

export interface CalorieSkeletonProps {
  className?: string;
} 
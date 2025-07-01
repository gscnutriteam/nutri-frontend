import { ActivityLevel, Gender, NutritionUserData, calculateCalorieGoal, calculateMacronutrients, calculateTDEE } from '../helpers/calculations';

/**
 * Interface untuk data nutrisi lengkap pengguna
 */
export interface UserNutritionData {
  // Data dasar pengguna
  userData: NutritionUserData;
  
  // Goal dan konsumsi kalori
  caloriesGoal: number;
  caloriesConsumed: number;
  
  // Makronutrisi (Target dan konsumsi)
  macros: {
    carbs: { value: number; max: number; unit: string };
    protein: { value: number; max: number; unit: string };
    fat: { value: number; max: number; unit: string };
  };
}

/**
 * Mendapatkan data nutrisi pengguna berdasarkan data profil
 */
export function getUserNutritionData(userData: NutritionUserData, caloriesConsumed = 0): UserNutritionData {
  // Menghitung TDEE (Total Daily Energy Expenditure)
  const tdee = calculateTDEE(userData);
  
  // Menghitung target kalori berdasarkan tujuan berat badan
  const caloriesGoal = calculateCalorieGoal(tdee, userData.weightGoalType);
  
  // Menghitung kebutuhan makronutrien
  const macros = calculateMacronutrients(caloriesGoal);
  
  // Nilai konsumsi default (untuk dummy/testing)
  const consumedCarbs = Math.round(macros.carbs.grams * (caloriesConsumed / caloriesGoal));
  const consumedProtein = Math.round(macros.protein.grams * (caloriesConsumed / caloriesGoal));
  const consumedFat = Math.round(macros.fat.grams * (caloriesConsumed / caloriesGoal));
  
  return {
    userData,
    caloriesGoal,
    caloriesConsumed,
    macros: {
      carbs: { value: consumedCarbs, max: macros.carbs.grams, unit: 'g' },
      protein: { value: consumedProtein, max: macros.protein.grams, unit: 'g' },
      fat: { value: consumedFat, max: macros.fat.grams, unit: 'g' }
    }
  };
}

/**
 * Data dummy untuk pengujian
 */
export const dummyUserData: NutritionUserData = {
  gender: Gender.MALE,
  age: 28,
  weight: 68, // kg
  height: 175, // cm
  activityLevel: ActivityLevel.MODERATE,
  weightGoalType: 'loss'
};

/**
 * Mendapatkan data nutrisi dummy untuk testing atau preview
 */
export function getDummyNutritionData(caloriesConsumed = 1000): UserNutritionData {
  return getUserNutritionData(dummyUserData, caloriesConsumed);
} 
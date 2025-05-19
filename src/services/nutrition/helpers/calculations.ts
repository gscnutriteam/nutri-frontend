/**
 * Perhitungan Nutrisi Helper
 * 
 * File ini berisi fungsi-fungsi untuk menghitung kebutuhan nutrisi
 * berdasarkan data pengguna dengan menggunakan formula TDEE dan
 * rasio makronutrien yang direkomendasikan.
 */

// Enum untuk gender
export enum Gender {
  MALE = 'pria',
  FEMALE = 'wanita'
}

// Enum untuk tingkat aktivitas
export enum ActivityLevel {
  SEDENTARY = 'ringan',     // Aktivitas ringan/jarang olahraga
  MODERATE = 'sedang',      // Aktivitas sedang/olahraga 3-5x seminggu
  ACTIVE = 'berat'          // Aktivitas berat/olahraga intensif
}

// Interface untuk user data yang diperlukan untuk perhitungan
export interface NutritionUserData {
  gender: Gender;
  age: number;
  weight: number; // dalam kg
  height: number; // dalam cm
  activityLevel: ActivityLevel;
  weightGoalType: 'loss' | 'maintain' | 'gain';
}

/**
 * Menghitung BMR (Basal Metabolic Rate) menggunakan formula Mifflin-St Jeor
 * BMR adalah jumlah kalori yang dibutuhkan tubuh saat istirahat
 */
export function calculateBMR(gender: Gender, age: number, weight: number, height: number): number {
  if (gender === Gender.MALE) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Menghitung TDEE (Total Daily Energy Expenditure)
 * TDEE adalah total kalori yang dibutuhkan tubuh per hari
 */
export function calculateTDEE(userData: NutritionUserData): number {
  const { gender, age, weight, height, activityLevel } = userData;
  
  // Hitung BMR terlebih dahulu
  const bmr = calculateBMR(gender, age, weight, height);
  
  // Faktor pengganda berdasarkan tingkat aktivitas
  let activityFactor = 1.2; // Default: sedentary
  
  switch (activityLevel) {
    case ActivityLevel.SEDENTARY:
      activityFactor = 1.2; // Sedikit atau tidak ada olahraga
      break;
    case ActivityLevel.MODERATE:
      activityFactor = 1.55; // Olahraga sedang (3-5 hari seminggu)
      break;
    case ActivityLevel.ACTIVE:
      activityFactor = 1.9; // Olahraga berat (6-7 hari seminggu)
      break;
  }
  
  // TDEE = BMR x Activity Factor
  const tdee = Math.round(bmr * activityFactor);
  return tdee;
}

/**
 * Menghitung target kalori berdasarkan TDEE dan tujuan berat badan
 */
export function calculateCalorieGoal(tdee: number, goalType: 'loss' | 'maintain' | 'gain'): number {
  switch (goalType) {
    case 'loss':
      return Math.round(tdee * 0.8); // Deficit 20% untuk penurunan berat badan
    case 'gain':
      return Math.round(tdee * 1.15); // Surplus 15% untuk penambahan berat badan
    default:
      return tdee; // Maintain berat badan
  }
}

/**
 * Interface untuk makronutrien
 */
export interface Macronutrients {
  carbs: {
    grams: number;
    calories: number;
    percentage: number;
  };
  protein: {
    grams: number;
    calories: number;
    percentage: number;
  };
  fat: {
    grams: number;
    calories: number;
    percentage: number;
  };
}

/**
 * Menghitung kebutuhan makronutrien berdasarkan total kalori
 * dengan rasio 30% protein, 35% lemak, 35% karbohidrat
 */
export function calculateMacronutrients(totalCalories: number): Macronutrients {
  // Rasio makronutrien (dalam persen)
  const proteinPercentage = 30;
  const fatPercentage = 35;
  const carbsPercentage = 35;
  
  // Kalori per makronutrien
  const proteinCalories = (totalCalories * proteinPercentage) / 100;
  const fatCalories = (totalCalories * fatPercentage) / 100;
  const carbsCalories = (totalCalories * carbsPercentage) / 100;
  
  // Konversi kalori ke gram
  // 1g protein = 4 kalori, 1g lemak = 9 kalori, 1g karbohidrat = 4 kalori
  const proteinGrams = Math.round(proteinCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);
  const carbsGrams = Math.round(carbsCalories / 4);
  
  return {
    carbs: {
      grams: carbsGrams,
      calories: carbsCalories,
      percentage: carbsPercentage
    },
    protein: {
      grams: proteinGrams,
      calories: proteinCalories,
      percentage: proteinPercentage
    },
    fat: {
      grams: fatGrams,
      calories: fatCalories,
      percentage: fatPercentage
    }
  };
}

/**
 * Menghitung persentase progress (konsumsi terhadap target)
 */
export function calculatePercentage(consumed: number, target: number): number {
  return Math.min(Math.round((consumed / target) * 100), 100);
}

/**
 * Menghitung sisa kalori
 */
export function calculateRemainingCalories(consumed: number, target: number): number {
  return Math.max(target - consumed, 0);
} 
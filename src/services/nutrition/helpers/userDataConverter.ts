"use server";

import { Gender, ActivityLevel, NutritionUserData } from "./calculations";

/**
 * Converts user profile data from API to NutritionUserData format used in calculations
 */
export const profileToNutritionData = async (profileData: any): Promise<NutritionUserData> => {
  // Default to maintenance if goal type is not specified
  let weightGoalType: 'loss' | 'maintain' | 'gain' = 'maintain';
  
  // Determine weight goal type from target weight if available
  if (profileData.targetWeight) {
    if (profileData.targetWeight < profileData.weight) {
      weightGoalType = 'loss';
    } else if (profileData.targetWeight > profileData.weight) {
      weightGoalType = 'gain';
    }
  }
  
  // Map activity level from profile to calculations enum
  let activityLevel: ActivityLevel = ActivityLevel.MODERATE;
  
  if (profileData.activityLevel === 'ringan') {
    activityLevel = ActivityLevel.SEDENTARY;
  } else if (profileData.activityLevel === 'berat') {
    activityLevel = ActivityLevel.ACTIVE;
  }
  
  // Map gender from profile to calculations enum
  const gender: Gender = profileData.gender === 'pria' ? Gender.MALE : Gender.FEMALE;
  
  return {
    gender,
    age: profileData.age || 30, // Default age if not available
    weight: profileData.weight || 70, // Default weight if not available
    height: profileData.height || 170, // Default height if not available
    activityLevel,
    weightGoalType
  };
}; 
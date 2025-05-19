"use server";

import { getDetailUser } from "@/services/profile/api/getUser";
import { getHomeStatistics as fetchHomeStatistics } from "@/services/nutrition/api/getHomeStatistics";
import { profileToNutritionData } from "@/services/nutrition/helpers/userDataConverter";
import { convertToUserNutritionData } from "@/services/nutrition/api/getHomeStatistics";
import { getDummyNutritionData } from "@/services/nutrition/data/user-nutrition";
import { ExtendedUserData, HomeStatisticsResponse } from "../types/homeTypes";

/**
 * Default user data to use as fallback
 */
export const getDefaultUserData = async (): Promise<ExtendedUserData> => {
  // Mendapatkan tanggal hari ini
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Membuat array dummy untuk dailyCheckins dengan data 7 hari
  const dummyDailyCheckins = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    dummyDailyCheckins.push({
      day: days[date.getDay()],
      date: date.toISOString().split('T')[0],
      status: i === 0 ? 'current' : i < 3 ? 'completed' : i < 5 ? 'missed' : 'completed'
    });
  }
  
  return {
    name: 'User',
    isPro: false,
    points: 0,
    currentStreak: 3,
    longestStreak: 5,
    dailyCheckins: dummyDailyCheckins,
    avatar: '/assets/img/default-avatar.png',
    bmi: 0,
    weight: 0,
    targetWeight: 0,
    initialWeight: 0,
    weightGoalType: 'loss',
    weightHistory: [{date: new Date().toISOString().split('T')[0], value: 0}],
    height: 0,
    gender: 'pria',
    age: 25,
    activityLevel: 'ringan',
  };
};

/**
 * Fetch home statistics from the API
 */
export const getHomeStatistics = async (): Promise<HomeStatisticsResponse> => {
  return await fetchHomeStatistics();
};

/**
 * Fetches all data needed for the home page
 */
export const fetchHomePageData = async () => {
  try {
    // Fetch data on the server
    const userData = await getDetailUser();
    
    // Default user data with required fields
    const defaultUser = await getDefaultUserData();
    
    // If userData is null, use the default fallback
    // If userData exists, merge it with the default ensuring all required fields
    const userDataSafe: ExtendedUserData = userData ? {
      ...defaultUser,
      ...userData,
      // Force cast userData as any to bypass type checking for custom properties
    } as ExtendedUserData : defaultUser;
    
    // Make sure the required properties exist
    if (!userDataSafe.weightHistory) {
      userDataSafe.weightHistory = defaultUser.weightHistory;
    }
    if (!userDataSafe.targetWeight) {
      userDataSafe.targetWeight = defaultUser.targetWeight;
    }
    if (!userDataSafe.weightGoalType) {
      userDataSafe.weightGoalType = defaultUser.weightGoalType;
    }
    if (!userDataSafe.dailyCheckins) {
      userDataSafe.dailyCheckins = defaultUser.dailyCheckins;
    }
    
    const homeStats = await getHomeStatistics();
    console.log(homeStats);
    
    // Convert user profile to nutrition data format
    const nutritionUserData = await profileToNutritionData(userDataSafe);
    
    // Convert stats to nutrition data format
    const userNutritionData = await convertToUserNutritionData(homeStats, nutritionUserData);
    
    // Update user weight/height if available from stats
    let userWithUpdatedWeight: ExtendedUserData = { ...userDataSafe };
    
    if (homeStats.data.weight_height_statistics) {
      const stats = homeStats.data.weight_height_statistics;
      
      userWithUpdatedWeight = {
        ...userWithUpdatedWeight,
        weight: stats.current_weight || userWithUpdatedWeight.weight,
        height: stats.current_height || userWithUpdatedWeight.height,
        weightHistory: stats.weight_history ? 
          stats.weight_history.map(item => ({
            date: item.recorded_at.split('T')[0],
            value: item.weight
          })) : 
          userWithUpdatedWeight.weightHistory,
      };
      
      // Update target weight from latest_weight_target if available
      if (stats.latest_weight_target) {
        userWithUpdatedWeight = {
          ...userWithUpdatedWeight,
          targetWeight: stats.latest_weight_target.weight || userWithUpdatedWeight.targetWeight,
          initialWeight: stats.latest_weight_target.weight_history || userWithUpdatedWeight.weight,
          weightGoalType: stats.latest_weight_target.weight < stats.current_weight ? 'loss' : 'gain'
        };
      }
    }

    return {
      userData: userWithUpdatedWeight, 
      nutritionData: userNutritionData,
      initialLoading: false
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    
    // Return fallback data if API fails
    const defaultUser = await getDefaultUserData();
    
    return {
      userData: defaultUser, 
      nutritionData: getDummyNutritionData(1000),
      initialLoading: false
    };
  }
}; 
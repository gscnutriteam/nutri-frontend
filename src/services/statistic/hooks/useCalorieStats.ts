import { useState, useEffect } from "react";
import useGetUserCalories from "../api/getUserCalories";
import type { Period } from "@/services/home/types/chart";
import type { GetUserCaloriesResponse, UserCalorie } from "../types/calorie";

interface CalorieStats {
  todayCalories: number;
  totalCalories: number;
  chartData: Array<{
    day: string;
    calories: number;
  }>;
}

export const useCalorieStats = (period: Period = "daily") => {
  const [stats, setStats] = useState<CalorieStats>({
    todayCalories: 0,
    totalCalories: 0,
    chartData: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchCalorieStats = async () => {
    setIsLoading(true);
    try {
      // Fetch data based on period
      const limit = period === "daily" ? 7 : period === "weekly" ? 4 : 6;
      const response = await useGetUserCalories(1, limit * 10) as GetUserCaloriesResponse | null;
      
      if (!response?.results) {
        setStats({
          todayCalories: 0,
          totalCalories: 0,
          chartData: [],
        });
        return;
      }

      // Calculate today's calories (from the most recent entry)
      const todayCalories = response.results[0]?.calories || 0;

      // Format data for chart based on period
      let chartData = [];
      let totalCalories = 0;
      
      switch (period) {
        case "daily":
          // Use only 7 days for daily view
          chartData = response.results.slice(0, 7).map((item: UserCalorie, index: number) => ({
            day: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"][index],
            calories: item.calories,
          }));
          
          // Calculate total only from the displayed days
          totalCalories = response.results.slice(0, 7).reduce((sum: number, item: UserCalorie) => 
            sum + item.calories, 0);
          break;
          
        case "weekly":
          // Group data by week (max 4 weeks)
          const weeklyData: number[] = [];
          const weekEntries: UserCalorie[][] = [[], [], [], []]; // Store entries for each week
          
          // Group entries by week
          response.results.forEach((item: UserCalorie, index: number) => {
            const weekIndex = Math.floor(index / 7);
            if (weekIndex < 4) { // Only use first 4 weeks
              if (!weeklyData[weekIndex]) weeklyData[weekIndex] = 0;
              weeklyData[weekIndex] += item.calories;
              weekEntries[weekIndex].push(item);
            }
          });
          
          // Map to chart data format
          chartData = weeklyData.map((calories: number, index: number) => ({
            day: `Minggu ${index + 1}`,
            calories,
          }));
          
          // Calculate total from all entries in the displayed weeks
          totalCalories = weekEntries.flat().reduce((sum: number, item: UserCalorie) => 
            sum + item.calories, 0);
          break;
          
        case "monthly":
          // Group data by month (max 6 months)
          const monthlyData: number[] = [];
          const monthEntries: UserCalorie[][] = [[], [], [], [], [], []]; // Store entries for each month
          
          // Group entries by month
          response.results.forEach((item: UserCalorie, index: number) => {
            const monthIndex = Math.floor(index / 30);
            if (monthIndex < 6) { // Only use first 6 months
              if (!monthlyData[monthIndex]) monthlyData[monthIndex] = 0;
              monthlyData[monthIndex] += item.calories;
              monthEntries[monthIndex].push(item);
            }
          });
          
          // Map to chart data format
          chartData = monthlyData.map((calories: number, index: number) => ({
            day: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"][index],
            calories,
          }));
          
          // Calculate total from all entries in the displayed months
          totalCalories = monthEntries.flat().reduce((sum: number, item: UserCalorie) => 
            sum + item.calories, 0);
          break;
      }

      setStats({
        todayCalories,
        totalCalories,
        chartData,
      });
    } catch (error) {
      console.error("Failed to fetch calorie stats:", error);
      setStats({
        todayCalories: 0,
        totalCalories: 0,
        chartData: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalorieStats();
  }, [period]);

  return { ...stats, isLoading, refetch: fetchCalorieStats };
}; 
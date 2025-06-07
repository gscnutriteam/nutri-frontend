import { useState, useEffect } from "react";
import useGetUserCalories from "../api/getUserCalories";
import type { Period } from "@/services/home/types/chart";
import type { GetUserCaloriesResponse, UserCalorie } from "../types/calorie";

// Helper function definitions
const getStartOfDay = (date: Date): Date => { const d = new Date(date); d.setHours(0, 0, 0, 0); return d; };
const getDayShortName = (date: Date): string => ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"][date.getDay()];
const getStartOfWeekMonday = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  return new Date(d.setDate(diff));
};
const getStartOfMonth = (date: Date): Date => { const d = new Date(date); d.setHours(0, 0, 0, 0); d.setDate(1); return d; };
const getMonthShortName = (date: Date): string => ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][date.getMonth()];

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
      
      console.log("response", response);
      if (!response?.results) {
        setStats({
          todayCalories: 0,
          totalCalories: 0,
          chartData: [],
        });
        return;
      }

      // Calculate today's calories
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day for comparison

      const todayCalories = response.results.reduce((sum: number, item: UserCalorie) => {
        const mealDate = new Date(item.meal_time);
        mealDate.setHours(0, 0, 0, 0); // Set to start of day for comparison

        if (mealDate.getTime() === today.getTime()) {
          return sum + item.calories;
        }
        return sum;
      }, 0);

      // Format data for chart based on period
      let chartData = [];
      let totalCalories = 0;
      
      // Assumes helper functions like getStartOfDay, getDayShortName, getStartOfWeekMonday, getStartOfMonth, getMonthShortName 
      // are defined in the outer scope (e.g., within fetchCalorieStats or as utility functions).
      // Example definitions:
      // const getStartOfDay = (date: Date): Date => { const d = new Date(date); d.setHours(0, 0, 0, 0); return d; };
      // const getDayShortName = (date: Date): string => ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"][date.getDay()];
      // const getStartOfWeekMonday = (date: Date): Date => {
      //   const d = new Date(date);
      //   d.setHours(0, 0, 0, 0);
      //   const day = d.getDay();
      //   const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
      //   return new Date(d.setDate(diff));
      // };
      // const getStartOfMonth = (date: Date): Date => { const d = new Date(date); d.setHours(0, 0, 0, 0); d.setDate(1); return d; };
      // const getMonthShortName = (date: Date): string => ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][date.getMonth()];

      switch (period) {
        case "daily": {
          const today = getStartOfDay(new Date());
          const last7DaysAggregated = new Map<string, { date: Date; calories: number }>();

          // Initialize the map for the last 7 days ending with today,
          // ensuring chronological order for the chart (oldest to newest).
          for (let i = 6; i >= 0; i--) {
            const dateInLoop = new Date(today);
            dateInLoop.setDate(today.getDate() - i);
            const dayStartKey = getStartOfDay(dateInLoop);
            last7DaysAggregated.set(dayStartKey.toISOString(), { date: dayStartKey, calories: 0 });
          }

          // Process fetched results and populate calories for the relevant days
          response.results.forEach((item: UserCalorie) => {
            const mealDate = new Date(item.meal_time);
            const dayStartOfMeal = getStartOfDay(mealDate);
            const dayKey = dayStartOfMeal.toISOString();

            if (last7DaysAggregated.has(dayKey)) { // Only consider data within our 7-day window
              const currentEntry = last7DaysAggregated.get(dayKey)!;
              currentEntry.calories += item.calories;
            }
          });

          // Convert map values to array.
          // The order is preserved from insertion (oldest to newest because of the loop i = 6 down to 0).
          const aggregatedDailyData = Array.from(last7DaysAggregated.values());

          chartData = aggregatedDailyData.map(data => ({
            day: getDayShortName(data.date), // Uses helper
            calories: data.calories,
          }));
          totalCalories = aggregatedDailyData.reduce((sum, data) => sum + data.calories, 0);
          break;
        }
        case "weekly": {
          const weeklyMap = new Map<string, { weekStartDate: Date; calories: number }>();
          response.results.forEach((item: UserCalorie) => {
            const mealDate = new Date(item.meal_time);
            const weekStart = getStartOfWeekMonday(mealDate); // Uses helper
            const weekKey = weekStart.toISOString();

            if (!weeklyMap.has(weekKey)) {
              weeklyMap.set(weekKey, { weekStartDate: weekStart, calories: 0 });
            }
            const currentEntry = weeklyMap.get(weekKey)!;
            currentEntry.calories += item.calories;
          });

          const aggregatedWeeklyData = Array.from(weeklyMap.values())
            .sort((a, b) => b.weekStartDate.getTime() - a.weekStartDate.getTime()) // Sort newest week first
            .slice(0, 4) // Take last 4 distinct weeks with data
            .sort((a, b) => a.weekStartDate.getTime() - b.weekStartDate.getTime()); // Sort oldest week first for chart

          chartData = aggregatedWeeklyData.map((data, index) => ({
            day: `Minggu ${index + 1}`, // Label relatively
            calories: data.calories,
          }));
          totalCalories = aggregatedWeeklyData.reduce((sum, data) => sum + data.calories, 0);
          break;
        }
        case "monthly": {
          const monthlyMap = new Map<string, { monthStartDate: Date; calories: number }>();
          response.results.forEach((item: UserCalorie) => {
            const mealDate = new Date(item.meal_time);
            const monthStart = getStartOfMonth(mealDate); // Uses helper
            const monthKey = monthStart.toISOString();

            if (!monthlyMap.has(monthKey)) {
              monthlyMap.set(monthKey, { monthStartDate: monthStart, calories: 0 });
            }
            const currentEntry = monthlyMap.get(monthKey)!;
            currentEntry.calories += item.calories;
          });

          const aggregatedMonthlyData = Array.from(monthlyMap.values())
            .sort((a, b) => b.monthStartDate.getTime() - a.monthStartDate.getTime()) // Sort newest month first
            .slice(0, 6) // Take last 6 distinct months with data
            .sort((a, b) => a.monthStartDate.getTime() - b.monthStartDate.getTime()); // Sort oldest month first for chart
          
          chartData = aggregatedMonthlyData.map(data => ({
            day: getMonthShortName(data.monthStartDate), // Uses helper for actual month name
            calories: data.calories,
          }));
          totalCalories = aggregatedMonthlyData.reduce((sum, data) => sum + data.calories, 0);
          break;
        }
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
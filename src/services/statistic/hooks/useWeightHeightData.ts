import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWeightHeight, type WeightHeight } from "../api/getWeightHeight";
import type { CardBeratProps } from "../types/berat";
import type { ChartData, Period } from "@/services/home/types/chart";

// Query keys for weight data
export const WEIGHT_QUERY_KEYS = {
  statistics: 'weight-statistics',
  currentWeight: 'current-weight',
  targetWeight: 'target-weight',
  weightHeightData: 'weight-height-data',
  weightChartData: 'weight-chart-data',
};

// Function to calculate BMI from weight and height
const calculateBMI = (weight: number, height: number): number => {
  // Convert height from cm to m
  const heightInMeters = height / 100;
  // Calculate BMI: weight(kg) / height²(m)
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

// Format date for chart display
const formatDate = (date: Date): string => {
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  
  return `${days[date.getDay()]}`;
};

// Format week for chart display
const formatWeek = (date: Date): string => {
  const weekNumber = Math.ceil((date.getDate()) / 7);
  return `Minggu ${weekNumber}`;
};

// Format month for chart display
const formatMonth = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return months[date.getMonth()];
};

export const useWeightHeightData = () => {
  const queryClient = useQueryClient();

  const {
    data: weightHeightData = [],
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: [WEIGHT_QUERY_KEYS.weightHeightData],
    queryFn: async () => {
      try {
        // Get data from the API
        const response = await getWeightHeight();
        
        // Check if we have valid data to work with
        if (!response || !Array.isArray(response) || response.length === 0) {
          return [];
        }
        
        // Map API data to CardBeratProps format
        const formattedData = response.map((item: WeightHeight) => {
          return {
            id: item.id,
            tinggi: item.height,
            berat: item.weight,
            bmi: calculateBMI(item.weight, item.height),
            tanggal: new Date(item.recorded_at),
          };
        });
        
        // Sort by date, most recent first
        return formattedData.sort((a: CardBeratProps, b: CardBeratProps) => 
          b.tanggal.getTime() - a.tanggal.getTime()
        );
      } catch (error) {
        console.error("Failed to fetch weight and height data:", error);
        throw error;
      }
    },
  });

  const error = queryError ? (queryError as Error).message : null;

  // Generate chart data based on weightHeightData
  const generateChartData = (period: Period): ChartData[] => {
    if (!weightHeightData.length) return [];
    
    const now = new Date();
    const data: ChartData[] = [];
    
    if (period === 'daily') {
      // Get last 7 days data
      const lastWeekDate = new Date();
      lastWeekDate.setDate(lastWeekDate.getDate() - 7);
      
      // Filter data from the last 7 days
      const lastWeekData = weightHeightData.filter(
        item => item.tanggal > lastWeekDate
      );
      
      // Group data by day and take the most recent entry
      const dailyMap = new Map<string, CardBeratProps>();
      lastWeekData.forEach(item => {
        const dateKey = item.tanggal.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        // If this is the first entry for this day, or this entry is more recent than the saved one
        if (!dailyMap.has(dateKey) || item.tanggal > dailyMap.get(dateKey)!.tanggal) {
          dailyMap.set(dateKey, item);
        }
      });
      
      // Convert to chart data format
      Array.from(dailyMap.values())
        .sort((a, b) => a.tanggal.getTime() - b.tanggal.getTime())
        .forEach(item => {
          data.push({
            day: formatDate(item.tanggal),
            weight: item.berat,
            bmi: item.bmi
          });
        });
      
    } else if (period === 'weekly') {
      // Get data for the current month
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      // Filter data from current month
      const thisMonthData = weightHeightData.filter(
        item => item.tanggal >= startOfMonth
      );
      
      // First deduplicate by day to ensure we only use the most recent entry per day
      const dailyDeduped = new Map<string, CardBeratProps>();
      thisMonthData.forEach(item => {
        const dateKey = item.tanggal.toISOString().split('T')[0];
        if (!dailyDeduped.has(dateKey) || item.tanggal > dailyDeduped.get(dateKey)!.tanggal) {
          dailyDeduped.set(dateKey, item);
        }
      });
      
      // Now group the deduplicated daily data by week
      const weeklyMap = new Map<string, CardBeratProps[]>();
      Array.from(dailyDeduped.values()).forEach(item => {
        const weekKey = formatWeek(item.tanggal);
        if (!weeklyMap.has(weekKey)) {
          weeklyMap.set(weekKey, []);
        }
        weeklyMap.get(weekKey)!.push(item);
      });
      
      // Calculate average for each week
      Array.from(weeklyMap.entries()).forEach(([week, items]) => {
        const totalWeight = items.reduce((sum, item) => sum + item.berat, 0);
        const totalBMI = items.reduce((sum, item) => sum + item.bmi, 0);
        const avgWeight = totalWeight / items.length;
        const avgBMI = totalBMI / items.length;
        
        data.push({
          day: week,
          weight: parseFloat(avgWeight.toFixed(1)),
          bmi: parseFloat(avgBMI.toFixed(1))
        });
      });
      
      // Sort by week number
      data.sort((a, b) => {
        const aWeek = parseInt(a.day.split(' ')[1]);
        const bWeek = parseInt(b.day.split(' ')[1]);
        return aWeek - bWeek;
      });
      
    } else if (period === 'monthly') {
      // Get data for the current year
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      
      // Filter data from current year
      const thisYearData = weightHeightData.filter(
        item => item.tanggal >= startOfYear
      );
      
      // First deduplicate by day to ensure we only use the most recent entry per day
      const dailyDeduped = new Map<string, CardBeratProps>();
      thisYearData.forEach(item => {
        const dateKey = item.tanggal.toISOString().split('T')[0];
        if (!dailyDeduped.has(dateKey) || item.tanggal > dailyDeduped.get(dateKey)!.tanggal) {
          dailyDeduped.set(dateKey, item);
        }
      });
      
      // Now group the deduplicated daily data by month
      const monthlyMap = new Map<string, CardBeratProps[]>();
      Array.from(dailyDeduped.values()).forEach(item => {
        const monthKey = formatMonth(item.tanggal);
        if (!monthlyMap.has(monthKey)) {
          monthlyMap.set(monthKey, []);
        }
        monthlyMap.get(monthKey)!.push(item);
      });
      
      // Calculate average for each month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      months.forEach(month => {
        if (monthlyMap.has(month)) {
          const items = monthlyMap.get(month)!;
          const totalWeight = items.reduce((sum, item) => sum + item.berat, 0);
          const totalBMI = items.reduce((sum, item) => sum + item.bmi, 0);
          const avgWeight = totalWeight / items.length;
          const avgBMI = totalBMI / items.length;
          
          data.push({
            day: month,
            weight: parseFloat(avgWeight.toFixed(1)),
            bmi: parseFloat(avgBMI.toFixed(1))
          });
        }
      });
    }
    
    return data;
  };

  // Generate chart data for each period
  const dailyChartData = generateChartData('daily');
  const weeklyChartData = generateChartData('weekly');
  const monthlyChartData = generateChartData('monthly');

  // Function to refetch and invalidate other related queries
  const resetAndRefetch = async () => {
    await queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightHeightData] });
    // Also invalidate the statistics queries to ensure everything is refreshed
    queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.currentWeight] });
    queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.targetWeight] });
    queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightChartData] });
  };

  return {
    weightHeightData,
    isLoading,
    error,
    resetAndRefetch,
    chartData: {
      daily: dailyChartData,
      weekly: weeklyChartData,
      monthly: monthlyChartData
    }
  };
}; 
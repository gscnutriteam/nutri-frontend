"use client";
import type React from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Chart from './chart';
import 'swiper/css';
import 'swiper/css/pagination';
import type { Period, ChartData } from '../types/chart';
import { useCalorieStats } from "@/services/statistic/hooks/useCalorieStats";
import { useWeightHeightData } from "@/services/statistic/hooks/useWeightHeightData";
import { Skeleton } from "@/components/ui/skeleton";

const CalorieChart: React.FC = () => {
  const [caloriePeriod, setCaloriePeriod] = useState<Period>('daily');
  const [weightPeriod, setWeightPeriod] = useState<Period>('daily');

  // Fetch calorie data using the custom hook
  const { chartData: calorieData, isLoading: calorieLoading } = useCalorieStats(caloriePeriod);
  
  // Fetch weight data using the custom hook
  const { chartData: weightChartData, isLoading: weightLoading } = useWeightHeightData();

  // Format weight data for the chart
  const getWeightData = (): ChartData[] => {
    if (!weightChartData) return [];
    
    let data = [] as any[];
    
    switch (weightPeriod) {
      case "daily":
        data = weightChartData.daily;
        break;
      case "weekly":
        data = weightChartData.weekly;
        break;
      case "monthly":
        data = weightChartData.monthly;
        break;
      default:
        data = [];
    }
    
    // Transform the data to match the expected format
    return data.map((item) => ({
      day: item.date,
      weight: item.weight,
      bmi: item.bmi
    }));
  };

  const getCalorieTitle = () => {
    switch (caloriePeriod) {
      case 'daily':
        return 'Harian';
      case 'weekly':
        return 'Mingguan';
      case 'monthly':
        return 'Bulanan';
    }
  };

  const getWeightTitle = () => {
    switch (weightPeriod) {
      case 'daily':
        return 'Harian';
      case 'weekly':
        return 'Mingguan';
      case 'monthly':
        return 'Bulanan';
    }
  };

  return (
    <div className="relative pb-8">
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        className="w-full"
      >
        <SwiperSlide>
          <div className="px-4 pb-8">
            {calorieLoading ? (
              <div className="w-full">
                <Skeleton className="h-80 w-full rounded-xl" />
              </div>
            ) : (
              <Chart
                title={`Kalori ${getCalorieTitle()}`}
                data={calorieData}
                period={caloriePeriod}
                onPeriodChange={setCaloriePeriod}
                metricKey="calories"
                metricLabel="Kalori"
                metricColor="#53C2C6"
              />
            )}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4 pb-8">
            {weightLoading ? (
              <div className="w-full">
                <Skeleton className="h-80 w-full rounded-xl" />
              </div>
            ) : (
              <Chart
                title={`Berat ${getWeightTitle()}`}
                data={getWeightData()}
                period={weightPeriod}
                onPeriodChange={setWeightPeriod}
                metricKey="weight"
                metricLabel="Berat"
                metricColor="#53C2C6"
              />
            )}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CalorieChart;
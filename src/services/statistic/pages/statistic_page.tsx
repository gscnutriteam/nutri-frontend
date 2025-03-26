"use client";
import { useState } from "react";
import AppMobileLayout from "@/layout/app_mobile_layout";
import Chart from "../../home/components/chart";
import Head from "next/head";
import { BackButton } from "@/services/auth/components/back_button";
import { useWeightHeightData } from "../hooks/useWeightHeightData";
import { useCalorieStats } from "../hooks/useCalorieStats";
import type { Period, ChartData } from "@/services/home/types/chart";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  user?: {
    name: string;
    isPro: boolean;
    points: number;
  };
}

export default function Statistics({ user }: Props) {
  const [caloriePeriod, setCaloriePeriod] = useState<Period>("daily");
  const [weightPeriod, setWeightPeriod] = useState<Period>("daily");
  
  // Fetch weight data using the custom hook
  const { chartData: weightChartData, isLoading: weightLoading } = useWeightHeightData();
  
  // Fetch calorie data using the custom hook
  const { chartData: calorieData, isLoading: calorieLoading } = useCalorieStats(caloriePeriod);

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
      case "daily":
        return "Harian";
      case "weekly":
        return "Mingguan";
      case "monthly":
        return "Bulanan";
    }
  };

  const getWeightTitle = () => {
    switch (weightPeriod) {
      case "daily":
        return "Harian";
      case "weekly":
        return "Mingguan";
      case "monthly":
        return "Bulanan";
    }
  };

  return (
    <AppMobileLayout>
      <Head>
        <title>Statistik | Nutribox</title>
      </Head>
      <div className="w-full relative flex flex-col outfit-font pb-20 bg-[#3E9295]">
        <img
          src="/assets/img/home-pattern.png"
          className="w-full absolute -z-0 top-0 left-0 h-full object-cover opacity-10"
          alt="pattern"
        />
        <BackButton className="ms-8 mt-4 z-10" variant="white" />
        <div className="w-full px-2 md:px-4">
          {calorieLoading ? (
            <div className="rounded-xl shadow-sm w-full">
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          ) : (
            <div className="w-full rounded-xl shadow-sm">
              <Chart
                title={`Kalori ${getCalorieTitle()}`}
                data={calorieData}
                period={caloriePeriod}
                onPeriodChange={setCaloriePeriod}
                metricKey="calories"
                metricLabel="Kalori"
                metricColor="#53C2C6"
                isDetail
              />
            </div>
          )}

          <div className="mt-8"></div>

          {weightLoading ? (
            <div className="rounded-xl shadow-sm w-full">
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          ) : (
            <div className="w-full rounded-xl shadow-sm">
              <Chart
                title={`Berat ${getWeightTitle()}`}
                data={getWeightData()}
                period={weightPeriod}
                onPeriodChange={setWeightPeriod}
                metricKey="weight"
                metricLabel="Berat"
                metricColor="#53C2C6"
                isDetail
              />
            </div>
          )}
        </div>
      </div>
    </AppMobileLayout>
  );
}

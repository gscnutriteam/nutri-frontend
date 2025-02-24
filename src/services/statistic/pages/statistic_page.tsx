"use client";
import { useState } from "react";
import AppMobileLayout from "@/layout/app_mobile_layout";
import Chart from "../../home/components/chart";
import {
  dailyCalorieData,
  weeklyCalorieData,
  monthlyCalorieData,
} from "../../home/data/chart_data";
import {
  dailyWeightData,
  weeklyWeightData,
  monthlyWeightData,
} from "../../home/data/chart_data";
import Head from "next/head";
import { BackButton } from "@/services/auth/components/back_button";

interface Props {
  user?: {
    name: string;
    isPro: boolean;
    points: number;
  };
}

export default function Statistics({ user }: Props) {
  const [caloriePeriod, setCaloriePeriod] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [weightPeriod, setWeightPeriod] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  const getCalorieData = () => {
    switch (caloriePeriod) {
      case "daily":
        return dailyCalorieData;
      case "weekly":
        return weeklyCalorieData;
      case "monthly":
        return monthlyCalorieData;
    }
  };

  const getWeightData = () => {
    switch (weightPeriod) {
      case "daily":
        return dailyWeightData;
      case "weekly":
        return weeklyWeightData;
      case "monthly":
        return monthlyWeightData;
    }
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
        <div className="w-full p-4">
          <div className="rounded-xl px-4 shadow-sm">
            <Chart
              title={`Kalori ${getCalorieTitle()}`}
              data={getCalorieData()}
              period={caloriePeriod}
              onPeriodChange={setCaloriePeriod}
              metricKey="calories"
              metricLabel="Kalori"
              metricColor="#53C2C6"
              isDetail
            />
          </div>

          <div className="rounded-xl p-4 shadow-sm">
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
        </div>
      </div>
    </AppMobileLayout>
  );
}

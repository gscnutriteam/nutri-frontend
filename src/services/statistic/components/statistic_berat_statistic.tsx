import { ArrowDown, ArrowUp } from "lucide-react";
import { BadgeBMI } from "./badge_bmi";
import ProgressBMI from "./progress_bmi";
import { cn } from "@/lib/utils";
import { BMIChart } from "./bmi_chart";
import { useWeightStatistics } from "../hooks/useWeightStatistics";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo } from "react";
import { useWeightHeightData } from "../hooks/useWeightHeightData";

// Function to calculate BMI
const calculateBMI = (weight: number, height: number): number => {
  if (!weight || !height) return 0;
  // Convert height from cm to m
  const heightInMeters = height / 100;
  // Calculate BMI: weight(kg) / height²(m)
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const StatisticBerat = () => {
  const { currentWeight, targetWeight, historyWeight, isDietTurun, loading, error } = useWeightStatistics();
  const { weightHeightData, isLoading: dataLoading } = useWeightHeightData();

  // Get the latest height from the weight/height data
  const latestHeight = useMemo(() => {
    if (weightHeightData && weightHeightData.length > 0) {
      return weightHeightData[0].tinggi;
    }
    return 0;
  }, [weightHeightData]);

  // Calculate BMI
  const bmi = useMemo(() => {
    return calculateBMI(currentWeight, latestHeight);
  }, [currentWeight, latestHeight]);

  if (loading || dataLoading) {
    return (
      <div className="px-5">
        <div className="bg-pr10 rounded-lg border-2 border-black p-4 w-full flex flex-col">
          <div className="flex w-full justify-between items-center">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-4 w-full mt-4" />
          <Skeleton className="h-32 w-full mt-4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5">
        <div className="bg-pr10 rounded-lg border-2 border-black p-4 w-full">
          <p className="text-danger text-center">{error}</p>
        </div>
      </div>
    );
  }

  // If we don't have any weight data yet
  if (!currentWeight && !weightHeightData.length) {
    return (
      <div className="px-5">
        <div className="bg-pr10 rounded-lg border-2 border-black p-4 w-full">
          <p className="text-center text-gray-600">Belum ada data berat. Silakan tambahkan data berat badan.</p>
        </div>
      </div>
    );
  }

  
  return (
    <div className="px-5">
      <div className="bg-pr10 rounded-lg border-2 border-black p-4 w-full flex flex-col">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <p className="text-3xl text-primaryText font-semibold">
              {currentWeight || 0} <span className="text-lg">kg</span>
            </p>
            <SelisihBeratTarget 
              from={historyWeight || 0} 
              target={targetWeight || 0} 
              current={currentWeight || 0} 
              isDietTurun={isDietTurun} 
            />
          </div>
          <div className="flex flex-col text-end">
            <p className="font-semibold text-primaryText">BMI</p>
            <div className="flex gap-1">
              <p className="text-lg font-bold">{bmi}</p>
              <BadgeBMI bmi={bmi} />
            </div>
          </div>
        </div>
        <ProgressBMI 
          from={historyWeight || 0} 
          target={targetWeight || 0} 
          current={currentWeight || 0} 
          isDietTurun={isDietTurun} 
        />
        <BMIChart className="mt-4" />
      </div>
    </div>
  );
};

const SelisihBeratTarget = ({
  from,
  target,
  current,
  isDietTurun,
}: {
  from: number;
  target: number;
  current: number;
  isDietTurun: boolean;
}) => {
  const difference = Math.abs(from - current);

  const getStyleAndIcon = () => {
    if (isDietTurun) {
      if (current < from) {
        return {
          textColor: "text-success",
          Icon: ArrowDown,
        };
      }
      return {
        textColor: "text-danger",
        Icon: ArrowUp,
      };
    }
    if (current < from) {
      return {
        textColor: "text-danger",
        Icon: ArrowDown,
      };
    }
    return {
      textColor: "text-success",
      Icon: ArrowUp,
    };
  };

  const { textColor, Icon } = getStyleAndIcon();

  return (
    <>
      <div className="flex">
        <Icon size={16} className={cn(textColor)} />
        <p className={cn("text-sm", textColor)}>{difference} kg</p>
      </div>
    </>
  );
};
import { ArrowDown, ArrowUp } from "lucide-react";
import { BadgeBMI } from "./badge_bmi";
import ProgressBMI from "./progress_bmi";
import { cn } from "@/lib/utils";
import { BMIChart } from "./bmi_chart";
import { BadgeKalori } from "./badge_kalori";
import { KaloriChart } from "./kalori_chart";
import { useState } from "react";
import type { Period } from "@/services/home/types/chart";
import { useCalorieStats } from "../hooks/useCalorieStats";
import { StatisticKaloriSkeleton } from "./statistic_kalori_skeleton";

export const StatisticKalori = () => {
  const [period, setPeriod] = useState<Period>("daily");
  const { todayCalories, totalCalories, isLoading, chartData } = useCalorieStats(period);

  if (isLoading && chartData.length === 0) {
    return <StatisticKaloriSkeleton />;
  }

  console.log("chartData", period);
  return (
    <div className="px-5">
      <div className="bg-pr10 rounded-lg border-2 border-black p-4 w-full flex flex-col">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <p className="text-4xl text-primaryText font-semibold mb-2">
              {todayCalories} <span className="text-lg">kkal</span>
            </p>
            <BadgeKalori kalori={todayCalories} />
          </div>
          <div className="flex flex-col text-end">
            <p className="font-semibold text-sm text-primaryText">Total dikonsumsi</p>
            <div className="flex gap-1 text-end justify-end">
              <p className="text-lg text-end">{totalCalories} kkal</p>
            </div>
          </div>
        </div>
        <KaloriChart className="mt-2" period={period} onPeriodChange={setPeriod} />
      </div>
    </div>
  );
};

const SelisihBeratTarget = ({from, target, current, isDietTurun}: {from: number, target: number, current: number, isDietTurun: boolean }) => {
    const difference = Math.abs(from - current);
    
    const getStyleAndIcon = () => {
        if (isDietTurun) {
            if (current < from) {
                return {
                    textColor: "text-success",
                    Icon: ArrowDown
                };
            }
                return {
                    textColor: "text-danger",
                    Icon: ArrowUp
                };
        }
            if (current < from) {
                return {
                    textColor: "text-danger",
                    Icon: ArrowDown
                };
            }
                return {
                    textColor: "text-success",
                    Icon: ArrowUp
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
}
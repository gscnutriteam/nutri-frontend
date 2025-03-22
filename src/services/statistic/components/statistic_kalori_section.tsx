"use client";

import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { StatisticKalori } from "./statistic_kalori_statistic";
import { CardKalori } from "./card_kalori";
import { CalorieSkeleton } from "./calorie_skeleton";
import { useCalorieData } from "../hooks/useCalorieData";
import { Toaster } from "sonner";

export default function StatisticsKaloriSection() {
  const { calorieData, isLoading, hasMore, lastItemRef, resetAndRefetch } = useCalorieData();

  return (
    <AppMobileLayout>
      <Toaster position="top-center" richColors />
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Kalori"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <StatisticKalori />
        
        <div className="flex w-full px-5 flex-col mt-4 gap-4">
          {calorieData.map((data, index) => (
            <div
              key={index}
              ref={index === calorieData.length - 1 ? lastItemRef : null}
            >
              <CardKalori {...data} onDelete={resetAndRefetch} />
            </div>
          ))}
          
          {isLoading && (
            <>
              {[...Array(3)].map((_, index) => (
                <CalorieSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          )}
          
          {!hasMore && calorieData.length > 0 && (
            <div className="text-center text-gray-500 py-4">
              No more data to load
            </div>
          )}
          
          {!isLoading && calorieData.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No calorie data available
            </div>
          )}
        </div>
      </div>
    </AppMobileLayout>
  );
}

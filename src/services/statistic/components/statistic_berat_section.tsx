"use client";

import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { StatisticBerat } from "./statistic_berat_statistic";
import { CardBerat } from "./card_berat";
import { ModalTambahBerat2 } from "./modal_tambah_berat";
import { ModalTargetBerat2 } from "./modal_target_berat";
import { Toaster } from "sonner";
import { useWeightHeightData, WEIGHT_QUERY_KEYS } from "../hooks/useWeightHeightData";
import { BeratSkeleton } from "./berat_skeleton";
import { useWeightStatistics } from "../hooks/useWeightStatistics";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatisticsBeratSection() {
  const { weightHeightData, isLoading: isWeightDataLoading, error, resetAndRefetch } = useWeightHeightData();
  const { activeTarget, currentWeight, targetWeight, loading: isStatsLoading } = useWeightStatistics();
  const queryClient = useQueryClient();
  
  const isLoading = isWeightDataLoading || isStatsLoading;
  
  // We always want to show the edit button if there's an active target
  // The criteria of target being reached should be handled by the weight statistics component
  const targetToShow = activeTarget;
  
  const handleDataUpdate = () => {
    // Invalidate all weight-related queries to ensure everything is refreshed
    queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightHeightData] });
    queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.currentWeight] });
    queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.targetWeight] });
    queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.statistics] });
    queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.weightChartData] });
  };
  
  return (
    <AppMobileLayout>
      <Toaster position="top-center" richColors />
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Berat Badan"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <StatisticBerat />
        <div className="flex w-full px-5 mt-2 justify-between gap-3">
          {isLoading ? (
            <>
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </>
          ) : (
            <>
              <ModalTambahBerat2 onSuccess={handleDataUpdate} latestHeight={weightHeightData[0]?.tinggi} />
              <ModalTargetBerat2 
                onSuccess={handleDataUpdate} 
                latestHeight={weightHeightData[0]?.tinggi} 
                existingTarget={targetToShow}
              />
            </>
          )}
        </div>
        <div className="flex w-full px-5 flex-col mt-4 gap-4">
          {isWeightDataLoading && (
            <>
              {[...Array(3)].map((_, index) => (
                <BeratSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          )}
          
          {!isWeightDataLoading && weightHeightData.length > 0 && (
            <>
              {weightHeightData.map((data, index) => (
                <CardBerat key={index} {...data} onUpdate={handleDataUpdate} />
              ))}
            </>
          )}
          
          {!isWeightDataLoading && weightHeightData.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              {error || "Belum ada data berat badan"}
            </div>
          )}
        </div>
      </div>
    </AppMobileLayout>
  );
}

"use client";

import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { StatisticBerat } from "./statistic_berat_statistic";
import { CardBerat } from "./card_berat";
import { ModalTambahBerat2 } from "./modal_tambah_berat";
import { ModalTargetBerat2 } from "./modal_target_berat";
import { Toaster } from "sonner";
import { useWeightHeightData } from "../hooks/useWeightHeightData";
import { BeratSkeleton } from "./berat_skeleton";

export default function StatisticsBeratSection() {
  const { weightHeightData, isLoading, error, resetAndRefetch } = useWeightHeightData();
  
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
        <div className="flex w-full px-5 mt-2 justify-between gap-3 ">
          <ModalTambahBerat2 onSuccess={resetAndRefetch} />
          <ModalTargetBerat2 />
        </div>
        <div className="flex w-full px-5 flex-col mt-4 gap-4">
          {isLoading && (
            <>
              {[...Array(3)].map((_, index) => (
                <BeratSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          )}
          
          {!isLoading && weightHeightData.length > 0 && (
            <>
              {weightHeightData.map((data, index) => (
                <CardBerat key={index} {...data} onUpdate={resetAndRefetch} />
              ))}
            </>
          )}
          
          {!isLoading && weightHeightData.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              {error || "No weight and height data available"}
            </div>
          )}
        </div>
      </div>
    </AppMobileLayout>
  );
}

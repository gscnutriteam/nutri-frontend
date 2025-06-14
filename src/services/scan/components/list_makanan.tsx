"use client";
import { Button } from "@/components/ui/button";
import { BadgeMakanan } from "./badge_makanan";
import { ModalConfirmMakanan } from "./modal_makanan";
import useScanStore, { FoodWithStatus } from "../store/scan_store";
import type { NutritionEstimations } from "../types/type";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useEffect, useState } from "react";

export const ListMakanan = () => {
  const { scanResult, reset } = useScanStore();
  const router = useAppRouter();
  const [shouldRender, setShouldRender] = useState(false);

  // Instead of redirecting, handle the case of missing scanResult by showing a message
  const noResults = !scanResult || scanResult.foods.length === 0;

  // Check if any food has been added - only relevant if we have scanResult with foods
  const hasAddedFood = !noResults && scanResult.foods.some((food: FoodWithStatus) => food.isAdded === true);

  useEffect(() => {
    if (noResults) {
      // reset();
      // window.location.href = '/app/scan';
    }
    if (!noResults) {
      setShouldRender(true);
    }
  }, [noResults, router]);

  // Function to handle continue button click
  const handleContinue = () => {
    // Only navigate if at least one food is added
    if (hasAddedFood) {
      router.push('/scan/result');
    }
  };

  if (!shouldRender) {
    return <>
      <div className="text-center fixed top-0 left-0 right-0 w-full h-full py-6 text-gray-500">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl font-bold">
            Tidak ada hasil makanan yang terdeteksi.
          </div>
          <Button className="mt-4" onClick={() => {
            router.push('/app/scan');
            reset();
          }}>
            Kembali ke halaman scan
          </Button>
        </div>
      </div>
    </>
  }

  return (
    <>
      <div className="w-full flex flex-wrap gap-2 gap-y-3 justify-center">
        {noResults ? (
          <div className="text-center py-6 text-gray-500">
            Tidak ada hasil makanan yang terdeteksi.
          </div>
        ) : (
          scanResult.foods.map((food, key) => { 
            const estimations: NutritionEstimations = {
              calorieEstimation: food.calorie,
              proteinEstimation: food.protein,
              fatEstimation: food.fat,
              carboEstimation: food.carbo,
            }
            return (
            <ModalConfirmMakanan 
              key={`food${key + 1}`} 
              title={food.name} 
              estimations={estimations}
            />
          )})
        )}
      </div>
      <div className="flex w-full justify-center flex-col items-center">
        <Button 
          className="w-3/4 place-items-center mt-5"
          onClick={handleContinue}
          disabled={!hasAddedFood}
        >
          Continue
        </Button>
        {!hasAddedFood && (
          <p className="text-sm text-gray-500 mt-2">
            {noResults 
              ? "Tidak ada makanan yang terdeteksi" 
              : "Tambahkan setidaknya satu makanan untuk melanjutkan"}
          </p>
        )}
      </div>
    </>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import { BadgeMakanan } from "./badge_makanan";
import { ModalConfirmMakanan } from "./modal_makanan";
import useScanStore from "../store/scan_store";
import type { NutritionEstimations } from "../types/type";
import { useAppRouter } from "@/hooks/useAppRouter";

export const ListMakanan = () => {
  const { scanResult } = useScanStore();
  const router = useAppRouter();

  // Function to handle continue button click
  const handleContinue = () => {
    // Navigate to the result page
    router.push('/scan/result');
  };

  return (
    <>
      <div className="w-full flex flex-wrap gap-2 gap-y-3 justify-center">
        {scanResult?.foods.map((food, key) => { 
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
        )})}
      </div>
      <div className="flex w-full justify-center">
        <Button 
          className="w-3/4 place-items-center mt-5"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

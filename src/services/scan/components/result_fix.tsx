"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useScanStore } from "../store/scan_store";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useMealForm } from "../hooks/useMealForm";
import FoodSummary from "./result/FoodSummary";
import NutritionStatsGrid from "./result/NutritionStatsGrid";
import MealDetailsForm from "./result/MealDetailsForm";
import RecommendationWarning from "./common/RecommendationWarning";

const FoodTrackingResult = () => {
  const { scanResult, scanImageLink, reset } = useScanStore();
  const router = useAppRouter();
  const { form, addMealMutation, onSubmit, nutritionTotals } = useMealForm();

  // Redirect if no scan result
  if (!scanResult) {
    router.push("/scan");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Main Content */}
      <div className="flex-1 p-4 pb-24 relative">
        {/* Meal Summary */}
        <FoodSummary 
          imageUrl={scanImageLink} 
          calories={nutritionTotals.calories} 
        />

        {/* Nutrition Stats */}
        <NutritionStatsGrid nutritionTotals={nutritionTotals} />

        {/* Meal Details Form */}
        <MealDetailsForm form={form} />

        {/* Done Button */}
        <Button
          variant="default"
          className="w-full text-white border-2 border-black py-3 font-semibold shadow-md transition-all hover:shadow-lg active:translate-y-0.5"
          onClick={form.handleSubmit(onSubmit)}
          disabled={addMealMutation.isPending || addMealMutation.isSuccess || addMealMutation.isError}
        >
          {addMealMutation.isPending || addMealMutation.isSuccess ? "Loading..." : "Done"}
          {(addMealMutation.isPending || addMealMutation.isSuccess) && (
            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
          )}
        </Button>
      </div>

      {/* Bottom Warning (now modal trigger) */}
      <RecommendationWarning recommendation={scanResult?.recomendation || ""} comment={scanResult?.comment || ""} />
    </div>
  );
};

export default FoodTrackingResult;

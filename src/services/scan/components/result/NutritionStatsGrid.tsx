import React from "react";
import NutritionStats from "../common/NutritionStats";

interface NutritionStatsGridProps {
  nutritionTotals: {
    protein: number;
    fat: number;
    carbo: number;
  };
}

const NutritionStatsGrid = ({ nutritionTotals }: NutritionStatsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <NutritionStats
        title="protein"
        value={Math.round(nutritionTotals.protein)}
        unit="gram"
      />
      <NutritionStats
        title="lemak"
        value={Math.round(nutritionTotals.fat)}
        unit="gram"
      />
      <NutritionStats
        title="karbohidrat"
        value={Math.round(nutritionTotals.carbo)}
        unit="gram"
      />
    </div>
  );
};

export default NutritionStatsGrid; 
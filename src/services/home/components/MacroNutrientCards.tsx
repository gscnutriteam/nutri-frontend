'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { UserNutritionData } from '@/services/nutrition/data/user-nutrition';

interface MacroNutrientCardsProps {
  nutritionData: UserNutritionData;
}

const MacroNutrientCards = ({ nutritionData }: MacroNutrientCardsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full animate-fade-in-slide-up mt-4">
      {/* Carbs Card */}
      <div className="bg-green-100 p-3 rounded-xl border-2 border-black shadow-neobrutalism-sm">
        <p className="text-sm text-textGray mb-1">Karbohidrat</p>
        <div className="flex items-end mb-1">
          <span className="text-xl font-bold">{nutritionData.macros.carbs.value}</span>
          <span className="text-xs ml-1">/ {nutritionData.macros.carbs.max}{nutritionData.macros.carbs.unit}</span>
        </div>
        <Progress 
          value={nutritionData.macros.carbs.value} 
          max={nutritionData.macros.carbs.max} 
          fillColor="bg-green-500"
          className="h-3"
        />
      </div>
      
      {/* Protein Card */}
      <div className="bg-amber-100 p-3 rounded-xl border-2 border-black shadow-neobrutalism-sm">
        <p className="text-sm text-textGray mb-1">Protein</p>
        <div className="flex items-end mb-1">
          <span className="text-xl font-bold">{nutritionData.macros.protein.value}</span>
          <span className="text-xs ml-1">/ {nutritionData.macros.protein.max}{nutritionData.macros.protein.unit}</span>
        </div>
        <Progress 
          value={nutritionData.macros.protein.value} 
          max={nutritionData.macros.protein.max} 
          fillColor="bg-amber-500"
          className="h-3"
        />
      </div>
      
      {/* Fat Card */}
      <div className="bg-purple-100 p-3 rounded-xl border-2 border-black shadow-neobrutalism-sm">
        <p className="text-sm text-textGray mb-1">Lemak</p>
        <div className="flex items-end mb-1">
          <span className="text-xl font-bold">{nutritionData.macros.fat.value}</span>
          <span className="text-xs ml-1">/ {nutritionData.macros.fat.max}{nutritionData.macros.fat.unit}</span>
        </div>
        <Progress 
          value={nutritionData.macros.fat.value} 
          max={nutritionData.macros.fat.max} 
          fillColor="bg-purple-500"
          className="h-3"
        />
      </div>
    </div>
  );
};

export default MacroNutrientCards; 
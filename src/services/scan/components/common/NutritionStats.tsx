import React from "react";
import { CardContent } from "@/components/ui/card";

interface NutritionStatsProps {
  title: string;
  value: number;
  unit: string;
}

const NutritionStats = ({
  title,
  value,
  unit,
}: NutritionStatsProps) => {
  return (
    <div className="bg-primary aspect-square border-2 border-black rounded-lg text-white shadow-md transition-transform hover:scale-[1.02]">
      <CardContent className="p-3 flex flex-col items-center h-full justify-between">
        <div className="font-sm font-medium w-full">Estimasi total {title}</div>
        <div className="text-2xl font-bold flex w-full justify-start items-baseline gap-1">
          {value} <span className="font-sm font-normal font-sm">{unit}</span>
        </div>
      </CardContent>
    </div>
  );
};

export default NutritionStats; 
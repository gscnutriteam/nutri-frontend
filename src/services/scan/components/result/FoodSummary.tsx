import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface FoodSummaryProps {
  imageUrl: string;
  calories: number;
}

const FoodSummary = ({ imageUrl, calories }: FoodSummaryProps) => {
  return (
    <div className="mb-8">
      <div className="relative flex flex-row items-center">
        {/* Food Image - Positioned on the left */}
        <div className="relative z-10 w-[150px] h-[150px] mr-3 flex-shrink-0">
          <div className="w-full h-full bg-white rounded-full border-2 border-border shadow-md overflow-hidden">
            <div className="w-full h-full mx-auto my-auto rounded-full bg-[#f5f5f5] flex items-center justify-center relative">
              <Image
                fill
                src={imageUrl || "/assets/img/nasi.png"}
                alt="Food Image"
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Calorie Box - Next to the image */}
        <div className="flex-1">
          <Card
            variant="default"
            className="bg-[#FFEB3B] border-2 border-black p-2 shadow-md h-full"
          >
            <CardContent className="p-2">
              <div className="font-medium text-black">
                Estimasi total kalori
              </div>
              <div className="text-3xl font-bold text-black">
                {Math.round(calories)}{" "}
                <span className="font-sm text-sm font-normal">kkal</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodSummary; 
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface RecommendationWarningProps {
  recommendation: string;
}

const RecommendationWarning = ({ recommendation }: RecommendationWarningProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-transparent via-[rgba(178,223,219,0.5)] to-[#B2DFDB] pt-10">
      <div className="relative max-w-md mx-auto">
        {/* Character Image - Properly positioned and sized */}
        <div className="absolute bottom-0 left-0 z-10 w-20 h-16">
          <Image
            src="/assets/img/nubo_alert.png"
            alt="Character"
            width={64}
            height={64}
            className="absolute bottom-0 -left-2"
          />
        </div>

        {/* Recommendation Card - Better shaped and positioned */}
        <Card
          variant="default"
          className="bg-main text-black border-2 border-black py-2 pl-14 pr-4 rounded-tr-md rounded-br-md rounded-bl-md shadow-md"
        >
          <CardContent className="p-1">
            <p className="font-sm text-sm font-medium">
              {recommendation || "Kamu perlu makan lebih bergizi dan seimbang"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendationWarning; 
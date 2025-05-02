import React from 'react';
import { Card } from '@/components/ui/card';

const PremiumCardSkeleton: React.FC = () => {
  return (
    <Card className="border-2 border-gray-200 overflow-hidden rounded-xl" variant="neutral">
      <div className="p-5">
        {/* Header skeleton with title and price */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        {/* Features list skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
              <div className="h-4 flex-1 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PremiumCardSkeleton; 
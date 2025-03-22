import { Skeleton } from "@/components/ui/skeleton";

export const StatisticKaloriSkeleton = () => {
  return (
    <div className="px-5">
      <div className="bg-pr10 rounded-lg border-2 border-black p-4 w-full flex flex-col">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <Skeleton className="w-28 h-10 mb-2" /> {/* For calories */}
            <Skeleton className="w-16 h-6 rounded-full" /> {/* For badge */}
          </div>
          <div className="flex flex-col text-end">
            <Skeleton className="w-40 h-4 ml-auto" /> {/* For "Total dikonsumsi" */}
            <div className="flex gap-1 justify-end mt-2">
              <Skeleton className="w-24 h-6" /> {/* For total calories value */}
            </div>
          </div>
        </div>
        
        {/* Chart skeleton */}
        <div className="mt-2">
          <div className="flex justify-end">
            <Skeleton className="w-20 h-8 scale-[0.8]" /> {/* For dropdown */}
          </div>
          <Skeleton className="w-full h-64 mt-2" /> {/* For chart */}
        </div>
      </div>
    </div>
  );
}; 
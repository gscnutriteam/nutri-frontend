import { Skeleton } from "@/components/ui/skeleton";
import type { CalorieSkeletonProps } from "../types/calorie";

export const CalorieSkeleton = ({ className }: CalorieSkeletonProps) => (
  <div className="w-full bg-secondaryLight border-2 px-3 py-2 border-black flex items-center justify-between rounded-lg h-[140px]">
    <div className="flex flex-col h-full">
      <Skeleton className="w-20 h-4 mt-1" />
      <Skeleton className="w-16 h-16 rounded-full my-1" />
      <Skeleton className="w-24 h-8 mt-1" />
    </div>
    <div className="flex flex-col">
      <div className="flex gap-2 w-full justify-end">
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
      <Skeleton className="w-20 h-4 ml-auto mt-1" />
      <div className="flex flex-col w-full items-end mt-2 gap-1">
        <Skeleton className="w-28 h-4" />
        <Skeleton className="w-28 h-4" />
        <Skeleton className="w-28 h-4" />
      </div>
    </div>
  </div>
); 
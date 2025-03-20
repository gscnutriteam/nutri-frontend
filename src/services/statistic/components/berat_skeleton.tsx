import { Skeleton } from "@/components/ui/skeleton";

export const BeratSkeleton = () => {
  return (
    <div className="w-full bg-secondaryLight border-2 px-3 py-2 border-black flex items-center justify-between rounded-lg">
      <div className="flex flex-col h-full">
        <p className="text-textGray">BMI</p>
        <div className="flex flex-col items-start">
          <Skeleton className="h-10 w-16 my-1" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 w-full justify-end">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-5 w-24 mt-1" />
        <div className="flex flex-col w-full items-end mt-2">
          <Skeleton className="h-5 w-20 mb-1" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
}; 
import { Skeleton } from "@/components/ui/skeleton";

export function RecommendationSkeleton() {
  return (
    <div className="flex flex-col mt-5 w-full">
      <div className="flex w-full justify-between items-center">
        <Skeleton className="w-36 h-7" /> {/* Title skeleton */}
        <Skeleton className="w-28 h-5" /> {/* "Selengkapnya" text skeleton */}
      </div>
      
      <div className="flex w-full flex-col mt-5 gap-3">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex rounded-xl overflow-hidden border">
            <Skeleton className="w-24 h-24 rounded-none" /> {/* Image thumbnail skeleton */}
            <div className="flex-1 p-3 space-y-2">
              <Skeleton className="w-20 h-5" /> {/* Category skeleton */}
              <Skeleton className="w-full h-6" /> {/* Title skeleton */}
              <Skeleton className="w-28 h-4" /> {/* Date skeleton */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
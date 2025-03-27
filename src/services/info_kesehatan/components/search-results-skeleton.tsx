import { Skeleton } from "@/components/ui/skeleton";

export function SearchResultsSkeleton() {
  return (
    <div className="mt-5">
      <Skeleton className="w-48 h-7 mb-5" /> {/* "Hasil Pencarian" title skeleton */}
      
      <div className="flex w-full flex-col gap-3">
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
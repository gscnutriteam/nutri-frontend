import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function TopNewsSkeleton() {
  return (
    <div className="flex flex-col w-full mt-5">
      <Skeleton className="w-32 h-7 mb-3" /> {/* Title skeleton */}
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mt-5"
        >
          <CarouselContent>
            {[...Array(3)].map((_, index) => (
              <CarouselItem key={index} className="basis-[90%]">
                <div className="rounded-xl overflow-hidden">
                  <Skeleton className="w-full h-44" /> {/* Image skeleton */}
                  <div className="p-3 space-y-2 border border-t-0 rounded-b-xl">
                    <Skeleton className="w-20 h-6" /> {/* Category skeleton */}
                    <Skeleton className="w-full h-6" /> {/* Title skeleton */}
                    <Skeleton className="w-28 h-4" /> {/* Date skeleton */}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center gap-2 mt-4">
          {[...Array(3)].map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-2 rounded-full bg-gray-300 ${index === 0 ? 'w-6 bg-primary' : ''}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
} 
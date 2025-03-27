import { Skeleton } from "@/components/ui/skeleton";

export function ArticleDetailSkeleton() {
  return (
    <div className="space-y-4">
      {/* Back link skeleton */}
      <Skeleton className="w-48 h-6 mb-4" />
      
      {/* Header section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="w-24 h-6" /> {/* Category skeleton */}
          <div className="flex gap-3">
            <Skeleton className="w-8 h-8 rounded-full" /> {/* Icon button skeleton */}
            <Skeleton className="w-8 h-8 rounded-full" /> {/* Icon button skeleton */}
          </div>
        </div>
        
        <Skeleton className="w-full h-8 mt-2" /> {/* Title skeleton line 1 */}
        <Skeleton className="w-3/4 h-8" /> {/* Title skeleton line 2 */}
        
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4 rounded-full" /> {/* Icon skeleton */}
            <Skeleton className="w-32 h-5" /> {/* Date skeleton */}
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4 rounded-full" /> {/* Icon skeleton */}
            <Skeleton className="w-24 h-5" /> {/* Reading time skeleton */}
          </div>
        </div>
      </div>
      
      {/* Image skeleton */}
      <Skeleton className="w-full h-56 rounded-lg mt-4" />
      
      {/* Reading tip box */}
      <div className="flex items-center mt-4 py-2 border-t border-b border-gray-200">
        <Skeleton className="w-4 h-4 rounded-full mr-2" /> {/* Icon skeleton */}
        <Skeleton className="w-3/4 h-5" /> {/* Text skeleton */}
      </div>
      
      {/* Content paragraphs */}
      <div className="space-y-4 mt-6">
        <Skeleton className="w-full h-7" /> {/* H2 heading skeleton */}
        <Skeleton className="w-full h-4" /> {/* Paragraph line */}
        <Skeleton className="w-full h-4" /> {/* Paragraph line */}
        <Skeleton className="w-11/12 h-4" /> {/* Paragraph line */}
        
        <Skeleton className="w-full h-7 mt-6" /> {/* H2 heading skeleton */}
        <Skeleton className="w-full h-4" /> {/* Paragraph line */}
        <Skeleton className="w-full h-4" /> {/* Paragraph line */}
        <Skeleton className="w-full h-4" /> {/* Paragraph line */}
        <Skeleton className="w-3/4 h-4" /> {/* Paragraph line */}
        
        <Skeleton className="w-full h-7 mt-6" /> {/* H2 heading skeleton */}
        <Skeleton className="w-full h-4" /> {/* Paragraph line */}
        <Skeleton className="w-full h-4" /> {/* Paragraph line */}
        <Skeleton className="w-5/6 h-4" /> {/* Paragraph line */}
      </div>
      
      {/* Back to top button skeleton */}
      <div className="flex justify-center mt-8 pt-4 border-t">
        <Skeleton className="w-36 h-10 rounded-full" />
      </div>
      
      {/* Related articles section */}
      <div className="mt-8 pt-4 border-t">
        <Skeleton className="w-48 h-7 mb-4" /> {/* Section title skeleton */}
        
        <div className="space-y-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-4 p-3 border border-transparent rounded-lg">
              <Skeleton className="w-24 h-24 rounded-lg" /> {/* Thumbnail skeleton */}
              <div className="flex-1 space-y-2">
                <Skeleton className="w-20 h-5" /> {/* Category skeleton */}
                <Skeleton className="w-full h-6" /> {/* Title skeleton */}
                <Skeleton className="w-28 h-4" /> {/* Date skeleton */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
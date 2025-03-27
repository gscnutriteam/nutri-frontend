export function CardInfoKesehatanSkeleton() {
  return (
    <div className="flex flex-row w-full bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-24 h-24 bg-gray-200"></div>
      
      {/* Content placeholder */}
      <div className="flex flex-col justify-between p-3 flex-1">
        {/* Category placeholder */}
        <div className="w-20 h-5 bg-gray-200 rounded-full mb-2"></div>
        
        {/* Title placeholder */}
        <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded mb-3"></div>
        
        {/* Date placeholder */}
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
} 
import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import { TopNewsServer } from "../components/top-news";
import { RecommendationServer } from "../components/recomendation";
import { Suspense } from "react";
import { TopNewsSkeleton } from "../components/top-news-skeleton";
import { RecommendationSkeleton } from "../components/recommendation-skeleton";
import FloatingBackToTopWrapper from "../components/floating-back-to-top-wrapper";
import Link from "next/link";
import { ListFilterIcon, BookmarkIcon, SearchIcon } from "lucide-react";

// Client component for search functionality
import SearchForm from "../components/search-form";

// Set revalidation time to 5 minutes (300 seconds)
export const revalidate = 300;

export default function InfoKesehatan() {
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        {/* Floating Back To Top Button */}
        <FloatingBackToTopWrapper />
        
        <HeaderFeature
          title="Info Kesehatan"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        
        {/* Search Bar and Action Buttons */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
          <div className="px-4 py-3">
            <SearchForm />
          </div>
          
          {/* Action buttons in a horizontal row */}
          <div className="flex overflow-x-auto scrollbar-hide px-4 pb-2">
            <Link 
              href="/app/info-kesehatan/categories" 
              className="flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 px-3 rounded-full mr-3 transition-colors border border-gray-200 whitespace-nowrap"
            >
              <ListFilterIcon size={14} />
              <span className="text-sm">Kategori</span>
            </Link>
            
            <Link 
              href="/app/info-kesehatan/saved" 
              className="flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 px-3 rounded-full transition-colors border border-gray-200 whitespace-nowrap"
            >
              <BookmarkIcon size={14} />
              <span className="text-sm">Artikel Tersimpan</span>
            </Link>
          </div>
        </div>
        
        <div className="px-4 pt-3">
          <Suspense fallback={<TopNewsSkeleton />}>
            <TopNewsServer />
          </Suspense>
          
          <Suspense fallback={<RecommendationSkeleton />}>
            <RecommendationServer />
          </Suspense>
        </div>
      </div>
    </AppMobileLayout>
  );
}

export const metadataInfoKesehatan: Metadata = {
  title: "Info Kesehatan | NutriPlate",
  description: "Info Kesehatan page NutriPlate app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Info Kesehatan | NutriPlate",
    description: "Info Kesehatan NutriPlate app",
  },
};

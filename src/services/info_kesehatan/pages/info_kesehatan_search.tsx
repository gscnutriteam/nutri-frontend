import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import { searchArticles } from "../api/articleService";
import { CardInfoKesehatan } from "../components/card-info-kesehatan";
import { CardInfoKesehatanProps } from "../types/types";
import { Suspense } from "react";
import SearchForm from "../components/search-form";
import { SearchResultsSkeleton } from "../components/search-results-skeleton";
import FloatingBackToTopWrapper from "../components/floating-back-to-top-wrapper";

// Make this page dynamic to always get fresh search results
export const revalidate = 0;

interface InfoKesehatanSearchProps {
  searchParams?: {
    q?: string;
  };
}

export default async function InfoKesehatanSearch({ searchParams = {} }: InfoKesehatanSearchProps) {
  const query = searchParams?.q || "";
  
  // Fetch search results
  const results = query ? await searchArticles(query) : [];
  
  // Map API results to component props
  const searchResults = results.map(article => ({
    tanggal: new Date(article.published_at),
    title: article.title,
    category: article.category_name,
    image: article.image,
    link: `/app/info-kesehatan/${article.id}`,
    id: article.id,
    slug: article.slug
  }));

  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        {/* Floating Back To Top Button */}
        <FloatingBackToTopWrapper />
        
        <HeaderFeature
          title="Pencarian"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <div className="px-4">
          <SearchForm />
          
          <Suspense fallback={<SearchResultsSkeleton />}>
            <div className="mt-5">
              <h2 className="text-lg font-semibold">
                {query ? `Hasil Pencarian "${query}"` : "Hasil Pencarian"}
              </h2>
              
              {searchResults.length === 0 ? (
                <div className="py-4">
                  {query ? "Tidak ada hasil yang ditemukan" : "Silakan masukkan kata kunci pencarian"}
                </div>
              ) : (
                <div className="flex w-full flex-col mt-3 gap-3">
                  {searchResults.map((article) => (
                    <CardInfoKesehatan key={article.id} {...article} />
                  ))}
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </AppMobileLayout>
  );
}

export const metadataInfoKesehatanSearch: Metadata = {
  title: "Cari Info Kesehatan | NutriPlate",
  description: "Info Kesehatan page NutriPlate app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Cari Info Kesehatan | NutriPlate",
    description: "Info Kesehatan NutriPlate app",
  },
};
  
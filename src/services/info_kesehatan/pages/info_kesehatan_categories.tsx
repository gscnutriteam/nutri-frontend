import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getArticleCategories, getArticlesByCategory } from "../api/articleService";
import { CategoryFilter } from "../components/category-filter";
import { CardInfoKesehatan } from "../components/card-info-kesehatan";
import SearchForm from "../components/search-form";
import FloatingBackToTopWrapper from "../components/floating-back-to-top-wrapper";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ArticlesList } from "../components/articles-list";

// Set revalidation time to 5 minutes (300 seconds)
export const revalidate = 300;

interface InfoKesehatanCategoriesProps {
  searchParams?: {
    category?: string;
  };
}

export default async function InfoKesehatanCategories({ searchParams = {} }: InfoKesehatanCategoriesProps) {
  const selectedCategoryId = searchParams?.category || "";
  
  // Fetch categories
  const categories = await getArticleCategories();
  
  // Fetch articles by category
  const articles = await getArticlesByCategory(selectedCategoryId);
  
  // Get the selected category name
  const selectedCategory = selectedCategoryId 
    ? categories.find(cat => cat.id === selectedCategoryId)
    : null;

  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        {/* Floating Back To Top Button */}
        <FloatingBackToTopWrapper />
        
        {/* Custom header */}
        <div className="w-full border-b border-gray-200 py-3 px-4 flex items-center relative bg-white">
          <Link href="/app/info-kesehatan" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors absolute left-4 z-10">
            <ArrowLeftIcon size={20} />
          </Link>
          
          <h1 className="text-lg font-semibold text-center w-full text-gray-800">
            Kategori Artikel
          </h1>
        </div>
        
        <div className="px-4 py-4">
          {/* Search form */}
          <SearchForm />
          
          {/* Category filter */}
          <div className="my-4">
            <h2 className="text-lg font-semibold mb-2">Kategori</h2>
            <CategoryFilter 
              categories={categories} 
              selectedCategoryId={selectedCategoryId}
            />
          </div>
          
          {/* Articles section */}
          <Suspense fallback={<ArticlesSkeleton />}>
            <div className="mt-5">
              <h2 className="text-lg font-semibold mb-3">
                {selectedCategory 
                  ? `Artikel Kategori: ${selectedCategory.name}`
                  : "Semua Artikel"}
              </h2>
              
              {articles.length === 0 ? (
                <div className="py-4 text-center">
                  <p>Tidak ada artikel dalam kategori ini</p>
                </div>
              ) : (
                <ArticlesList articles={articles} />
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </AppMobileLayout>
  );
}

function ArticlesSkeleton() {
  return (
    <div className="mt-5">
      <h2 className="text-lg font-semibold mb-3">Memuat artikel...</h2>
      <div className="flex w-full flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardInfoKesehatanSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// Local skeleton component to avoid import issues
function CardInfoKesehatanSkeleton() {
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

export const metadataInfoKesehatanCategories: Metadata = {
  title: "Kategori Info Kesehatan | NutriCare",
  description: "Kategori Info Kesehatan page NutriCare app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Kategori Info Kesehatan | NutriCare",
    description: "Kategori Info Kesehatan NutriCare app",
  },
}; 
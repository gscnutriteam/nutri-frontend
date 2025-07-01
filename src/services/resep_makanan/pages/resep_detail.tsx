import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import { getRecipeBySlug, getRecipeById } from "../api/recipeService";
import { formatDay, formatLabel } from "../utils/formatUtils";
import { estimateReadingTime } from "../utils/textUtils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Recipe } from "../api/recipeService";
import RecipeDetailContent from "../components/recipe_detail_content";

// Set revalidation time to 5 minutes
export const revalidate = 300;

interface ResepMakananDetailProps {
  params: {
    slug: string;
  };
}

// Generate dynamic metadata based on the recipe
export async function generateMetadata({ params }: ResepMakananDetailProps): Promise<Metadata> {
  const slug = params.slug;
  const recipe = await getRecipeBySlug(slug);
  
  if (!recipe) {
    return {
      title: "Resep Tidak Ditemukan | NutriCare",
      description: "Resep yang Anda cari tidak ditemukan",
    };
  }
  
  return {
    title: `${recipe.name} | Resep Makanan NutriCare`,
    description: recipe.description.substring(0, 160),
    icons: "/assets/img/logo.png",
    openGraph: {
      title: `${recipe.name} | Resep Makanan NutriCare`,
      description: recipe.description.substring(0, 160),
      images: [recipe.image],
    },
  };
}

export default async function ResepMakananDetail({ params }: ResepMakananDetailProps) {
  const slug = params.slug;
  
  // Fetch recipe data - first try by slug, then by ID if needed
  let recipe = await getRecipeBySlug(slug);
  
  // If recipe not found, show 404
  if (!recipe) {
    notFound();
  }
  
  // Calculate reading time
  const readingTime = estimateReadingTime(recipe.instructions + recipe.ingredients);
  
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        {/* Custom header with back button */}
        <div className="w-full border-b border-gray-200 py-3 px-4 flex items-center relative bg-white">
          <Link href="/app/resep-makanan" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors absolute left-4 z-10">
            <ArrowLeftIcon size={20} />
          </Link>
          
          <h1 className="text-lg font-semibold text-center w-full px-4 truncate text-gray-800">
            {recipe.name.length > 30 ? `${recipe.name.slice(0, 30)}...` : recipe.name}
          </h1>
        </div>
        
        <div className="px-4 pb-6">
          <Suspense fallback={<RecipeDetailSkeleton />}>
            <RecipeDetailContent recipe={recipe} readingTime={readingTime} />
          </Suspense>
        </div>
      </div>
    </AppMobileLayout>
  );
}

// Skeleton loading state
function RecipeDetailSkeleton() {
  return (
    <div>
      <div className="relative rounded-base overflow-hidden mt-4 h-60 bg-gray-200 animate-pulse"></div>
      <div className="h-8 w-3/4 bg-gray-200 rounded mt-4 animate-pulse"></div>
      <div className="flex gap-2 mt-2">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-20 w-full bg-gray-200 rounded mt-4 animate-pulse"></div>
      <div className="flex gap-2 mt-6 mb-4 h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-60 w-full bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}
  
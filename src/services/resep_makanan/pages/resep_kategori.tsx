import { HeaderFeature } from "@/components/ui/header_feature";
import { SearchInput } from "@/components/ui/input";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { getRecipes } from "../api/recipeService";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import CategoryFilter from "../components/category_filter";
// import CategoryFilter from "../components/category_filter";

// Set revalidation time to 5 minutes
export const revalidate = 300;

interface ResepMakananKategoriProps {
  searchParams: {
    type?: string;
    day?: string;
  };
}

export default async function ResepMakananKategori({ searchParams }: ResepMakananKategoriProps) {
  // Get query parameters with safer defaults (weekday only)
  const type = searchParams?.type || 'all';
  const day = searchParams?.day || 'monday';
  
  // Validate day is a weekday (Monday-Friday)
  const validDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const safeDay = validDays.includes(day.toLowerCase()) ? day.toLowerCase() : 'monday';
  
  // Fetch all recipes
  const allRecipes = await getRecipes();
  
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        {/* Custom header with back button */}
        <div className="w-full border-b border-gray-200 py-3 px-4 flex items-center relative bg-white">
          <Link href="/app/resep-makanan" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors absolute left-4 z-10">
            <ArrowLeftIcon size={20} />
          </Link>
          
          <h1 className="text-lg font-semibold text-center w-full px-4 truncate text-gray-800">
            Resep Makanan
          </h1>
        </div>
        
        <div className="px-4 pb-6">
          <SearchInput placeholder="Cari Resep Makanan" className="mt-3" />
          
          {/* Client component for filtering and displaying recipes */}
          <CategoryFilter
            recipes={allRecipes} 
            initialType={type} 
            initialDay={safeDay} 
          />
        </div>
      </div>
    </AppMobileLayout>
  );
} 
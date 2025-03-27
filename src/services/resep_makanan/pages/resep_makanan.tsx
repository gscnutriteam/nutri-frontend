import { HeaderFeature } from "@/components/ui/header_feature";
import { SearchInput } from "@/components/ui/input";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { getRecipes } from "../api/recipeService";
import { Recipe } from "../api/recipeService";
import ResepMakananContent from "../components/resep_makanan_content";

// Set revalidation time to 5 minutes
export const revalidate = 300;

// Server component that fetches data
export default async function ResepMakanan() {
  // Fetch recipes from API
  const recipes = await getRecipes();
  
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Resep Makanan"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <div className="px-4 pb-6">
          <SearchInput placeholder="Cari Resep Makanan" className="mt-3" />
          
          {/* Client component wrapper for state sharing */}
          <ResepMakananContent recipes={recipes} />
        </div>
      </div>
    </AppMobileLayout>
  );
}

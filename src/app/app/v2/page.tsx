import { Metadata } from "next";
import HomeV2 from "../../../services/home/pages/home_page_v2";
import { fetchHomePageData } from "@/services/home/data/homeApi";

export const metadata: Metadata = {
  title: "Home | NutriFe",
  description: "Track your nutrition and health progress with NutriFe",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Home | NutriFe",
    description: "Track your nutrition and health progress with NutriFe",
  },
};

export default async function Page() {
  // Fetch all required data using the centralized data fetching function
  const homeData = await fetchHomePageData();

  // Pass the data to the client component
  return <HomeV2 
    userData={homeData.userData} 
    nutritionData={homeData.nutritionData}
    initialLoading={homeData.initialLoading}
  />;
} 
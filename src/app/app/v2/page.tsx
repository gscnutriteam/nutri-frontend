import { Metadata } from "next";
import HomeV2 from "../../../services/home/pages/home_page_v2";

export const metadata: Metadata = {
  title: "Home | NutriFe",
  description: "Track your nutrition and health progress with NutriFe",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Home | NutriFe",
    description: "Track your nutrition and health progress with NutriFe",
  },
};

export default function Page() {
  return <HomeV2 />;
} 
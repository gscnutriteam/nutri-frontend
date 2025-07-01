import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
// import FoodTrackingResult from "../components/result_fix";
import { Toaster } from "sonner";
import FoodTrackingResult from "../components/result_fix";
// import { FoodTrackingResult } from "../components";

export default function ScanDetailResult() {
  return (
    <AppMobileLayout withBottomBar={false}>
      <Toaster position="top-center" richColors />
      <div className="relative h-[95vh] flex flex-col w-full overflow-hidden mt-5">
        <FoodTrackingResult />
      </div>
    </AppMobileLayout>
  );
}

export const metadataScanDetailResult: Metadata = {
  title: "Scan Makanan | NutriCare",
  description: "Scan Makanan page NutriCare app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Scan Makanan | NutriCare",
    description: "Scan Makanan NutriCare app",
  },
};

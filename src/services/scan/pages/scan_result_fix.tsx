import AppMobileLayout from "@/layout/app_mobile_layout";
import { Metadata } from "next";
import FoodTrackingResult from "../components/result_fix";

export default function ScanDetailResult() {
  return (
    <AppMobileLayout withBottomBar={false}>
      <div className="relative h-[95vh] flex flex-col w-full overflow-hidden mt-5">
        <FoodTrackingResult />
      </div>
    </AppMobileLayout>
  );
}

export const metadataScanDetailResult: Metadata = {
  title: "Scan Makanan | NutriBox",
  description: "Scan Makanan page nutribox app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Scan Makanan | NutriBox",
    description: "Scan Makanan nutribox app",
  },
};

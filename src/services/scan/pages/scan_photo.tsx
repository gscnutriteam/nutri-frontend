import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import { CameraScan } from "../components/camera_scan";
import { ScanLoading } from "../components/scan_loading";

export const metadata: Metadata = {
  title: "Scan Photo",
  description: "Take a photo or upload an image",
};

export default function ScanPhoto() {
    return (
    <AppMobileLayout>
      <div className="bg-white relative h-[95vh] flex flex-col w-full overflow-hidden">
        {/* Header with back button and flash toggle */}
        <CameraScan />
        {/* <ScanLoading/> */}
      </div>
    </AppMobileLayout>
  );
}

export const metadataScanPhoto: Metadata = {
    title: "Scan Makanan | NutriBox",
    description: "Scan Makanan page nutribox app",
    icons: "/assets/img/logo.png",
    openGraph: {
      title: "Scan Makanan | NutriBox",
      description: "Scan Makanan nutribox app",
    },
};
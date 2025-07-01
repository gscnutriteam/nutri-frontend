import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import Image from "next/image";
import ImageResult from "../components/image_result";
import { ListMakanan } from "../components/list_makanan";

export default function ScanDetail() {
    return (
    <AppMobileLayout withBottomBar={false}>
      <div className="bg-white relative h-[95vh] flex flex-col w-full overflow-hidden mt-5">
        <div className="text-lg font-semibold text-center">Pilih Komponenen Makanan yang Sesuai</div>
        <ImageResult />
        <div className="px-5">
        <ListMakanan />
        </div>
      </div>
    </AppMobileLayout>
  );
}

export const metadataScanDetail: Metadata = {
    title: "Scan Makanan | NutriPlate",
    description: "Scan Makanan page NutriPlate app",
    icons: "/assets/img/logo.png",
    openGraph: {
      title: "Scan Makanan | NutriPlate",
      description: "Scan Makanan NutriPlate app",
    },
};
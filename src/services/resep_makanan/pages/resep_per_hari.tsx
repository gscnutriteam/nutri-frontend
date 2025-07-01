import { FlipCard } from "@/components/ui/flip-card";
import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";

export default function ResepMakananPerHari() {
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Resep Makanan"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <div className="px-4">
            <p className="text-xl font-bold mt-5">Hari Pertama</p>
            <p className="text-textGray mt-2">Makan SIang</p>
            <div className="grid grid-cols-2 mt-2 w-full gap-3">
            <FlipCard
            title="Nasi Goreng"
            frontImage="/assets/img/nasi.png"
            description="Nasi goreng adalah makanan yang terbuat dari nasi yang digoreng dan diaduk dalam minyak goreng atau margarin"
            buttonText="Resep"
            about="Resep Makanan"
            // className="w-full"
            />
            <FlipCard
            title="Nasi Goreng"
            frontImage="/assets/img/nasi.png"
            description="Nasi goreng adalah makanan yang terbuat dari nasi yang digoreng dan diaduk dalam minyak goreng atau margarin"
            buttonText="Resep"
            about="Resep Makanan"
            // className="w-fit"
            />
            <FlipCard
            title="Nasi Goreng"
            frontImage="/assets/img/nasi.png"
            description="Nasi goreng adalah makanan yang terbuat dari nasi yang digoreng dan diaduk dalam minyak goreng atau margarin"
            buttonText="Resep"
            about="Resep Makanan"
            // className="w-fit"
            />
            </div>
            
        </div>
      </div>
    </AppMobileLayout>
  );
}

export const metadataResepMakananPerhari: Metadata = {
  title: "Resep Makanan | NutriCare",
  description: "Resep Makanan page NutriCare app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Resep Makanan | NutriCare",
    description: "Resep Makanan NutriCare app",
  },
};

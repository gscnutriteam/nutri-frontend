import { HeaderFeature } from "@/components/ui/header_feature";
import { SearchInput } from "@/components/ui/input";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { Metadata } from "next";
import { MakananHarian } from "../components/card_harian";
import { makananHadianData } from "../data/dummy";

export default function ResepMakanan() {
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Resep Makanan"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <div className="px-4">
          <SearchInput placeholder="Cari Resep Makanan" className="mt-3" />
          <div className="mt-5 flex flex-col w-full gap-2">
            <MakananHarian data={{...makananHadianData, variant: 'primary'}} />
            <MakananHarian data={{...makananHadianData, variant: 'secondary'}} />
            <MakananHarian data={{...makananHadianData, variant: 'primary'}} />
            <MakananHarian data={{...makananHadianData, variant: 'secondary'}} />
            <MakananHarian data={{...makananHadianData, variant: 'primary'}} />

          </div>
        </div>
      </div>
    </AppMobileLayout>
  );
}

export const metadataResepMakanan: Metadata = {
  title: "Resep Makanan | NutriBox",
  description: "Resep Makanan page nutribox app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Resep Makanan | NutriBox",
    description: "Resep Makanan nutribox app",
  },
};

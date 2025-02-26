import { HeaderFeature } from "@/components/ui/header_feature";
import { SearchInput } from "@/components/ui/input";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { Metadata } from "next";
import { TopNews } from "../components/top-news";
import { Recomendation } from "../components/recomendation";

export default function InfoKesehatan() {
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Info Kesahatan"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <div className="px-4">
          <SearchInput placeholder="Cari Info Kesehatan" className="mt-3" />
          <TopNews />
          <Recomendation />
        </div>
      </div>
    </AppMobileLayout>
  );
}

export const metadataInfoKesehatan: Metadata = {
  title: "Info Kesehatan | NutriBox",
  description: "Info Kesehatan page nutribox app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Info Kesehatan | NutriBox",
    description: "Info Kesehatan nutribox app",
  },
};

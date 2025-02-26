import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { Recomendation } from "../components/recomendation";
import { SearchInput } from "@/components/ui/input";
import { Metadata } from "next";
import { SearchResultsCard } from "../components/search_result_card";
import { dataInfoKesehatanCards } from "../data/dummy";

export default function InfoKesehatanSearch() {
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
            <p className="my-5">{dataInfoKesehatanCards.length} hasil yang ditemukan</p>
            <SearchResultsCard data={dataInfoKesehatanCards} />
          </div>
        </div>
      </AppMobileLayout>
    )
}

export const metadataInfoKesehatanSearch: Metadata = {
    title: "Cari Info Kesehatan | NutriBox",
    description: "Info Kesehatan page nutribox app",
    icons: "/assets/img/logo.png",
    openGraph: {
      title: "Cari Info Kesehatan | NutriBox",
      description: "Info Kesehatan nutribox app",
    },
  };
  
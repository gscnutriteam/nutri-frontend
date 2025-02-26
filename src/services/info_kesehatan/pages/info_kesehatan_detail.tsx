import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { SearchInput } from "@/components/ui/input";
import { Metadata } from "next";
import { SearchResultsCard } from "../components/search_result_card";
import { dataInfoKesehatanCards } from "../data/dummy";
import { InfoKesehatanHead } from "../components/info_kesehatan_head";
import { InfoKesehatanHeadProps } from "../types/types";
import MarkdownRenderer from "@/components/ui/markdown-renderer";

export default function InfoKesehatanDetail() {
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title=""
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <div className="px-6">
          <InfoKesehatanHead data={dummyData} />
          {/* Markdown Render */}
          <div className="space-y-2 mt-3">
            <MarkdownRenderer>
              {`
# Heading 1
Karbohidrat merupakan
## Heading 2
### Heading 3
#### Heading 4
# Heading 1
Karbohidrat merupakan
## Heading 2
### Heading 3
#### Heading 4# Heading 1
Karbohidrat merupakan
## Heading 2
### Heading 3
#### Heading 4# Heading 1
Karbohidrat merupakan
## Heading 2
### Heading 3
#### Heading 4
            `}
            </MarkdownRenderer>
          </div>
        </div>
      </div>
    </AppMobileLayout>
  );
}

const dummyData: InfoKesehatanHeadProps = {
  tanggal: new Date(),
  category: "Kesehatan",
  title: "Karbohidrat untuk Performa Atlet",
  image: "/assets/img/tes-darah.png",
  link: "/",
  readingTime: 5,
};

export const metadataInfoKesehatanDetail: Metadata = {
  title: "Info Kesehatan | NutriBox",
  description: "Info Kesehatan page nutribox app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Info Kesehatan | NutriBox",
    description: "Info Kesehatan nutribox app",
  },
};

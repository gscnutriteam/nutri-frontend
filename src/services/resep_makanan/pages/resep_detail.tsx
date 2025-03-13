import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import type { DetailHeadProps } from "../types/type";
import { DetailResepHead } from "../components/detail_head";

export default function ResepMakananDetail() {
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Resep Makanan"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <div className="px-6">
            <DetailResepHead data={dummyData} />
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

export const metadataResepDetail: Metadata = {
  title: "Resep Makanan | NutriBox",
  description: "Resep Makanan page nutribox app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Resep Makanan | NutriBox",
    description: "Resep Makanan nutribox app",
  },
};

const dummyData: DetailHeadProps = {
    created_at: new Date(),
    title: "Indomie Goreng",
    image: "/assets/img/tes-darah.png",
    readingTime: 5,
  };
  
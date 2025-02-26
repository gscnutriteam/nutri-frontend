import InfoKesehatan, { metadataInfoKesehatan } from "@/services/info_kesehatan/pages/info_kesehatan";
import InfoKesehatanSearch, { metadataInfoKesehatanSearch } from "@/services/info_kesehatan/pages/info_kesehatan_search";

export const metadata = metadataInfoKesehatanSearch;
export default function Page() {
  return <InfoKesehatanSearch />;
}

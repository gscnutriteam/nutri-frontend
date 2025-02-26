import InfoKesehatan, { metadataInfoKesehatan } from "@/services/info_kesehatan/pages/info_kesehatan";
import ResepMakanan, { metadataResepMakanan } from "@/services/resep_makanan/pages/resep_makanan";

export const metadata = metadataResepMakanan;
export default function Page() {
  return <ResepMakanan/>;
}

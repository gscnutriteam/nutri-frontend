import ResepMakanan from "@/services/resep_makanan/pages/resep_makanan";
import { metadataResepMakanan } from "@/services/resep_makanan/pages/metadata";

export const metadata = metadataResepMakanan;
export default function Page() {
  return <ResepMakanan/>;
}

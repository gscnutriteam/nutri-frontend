import { metadataResepMakananKategori } from "@/services/resep_makanan/pages/metadata";
import ResepMakananKategori from "@/services/resep_makanan/pages/resep_kategori";

export const metadata = metadataResepMakananKategori;
export default function Page({ searchParams }: { searchParams: { type?: string; day?: string } }) {
  return <ResepMakananKategori searchParams={searchParams} />;
} 
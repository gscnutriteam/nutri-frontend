import ResepMakananDetail, { generateMetadata } from "@/services/resep_makanan/pages/resep_detail";

export { generateMetadata };

export default function Page({ params }: { params: { slug: string } }) {
  return <ResepMakananDetail params={params} />;
}

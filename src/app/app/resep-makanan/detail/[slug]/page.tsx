import ResepMakananDetail, { generateMetadata as genMeta } from "@/services/resep_makanan/pages/resep_detail";

export const generateMetadata = genMeta;

// Use server-side data fetching
export default function Page({ params }: { params: { slug: string } }) {
  return <ResepMakananDetail params={params} />;
} 
import InfoKesehatanSearch from "@/services/info_kesehatan/pages/info_kesehatan_search";

export default function Page({ searchParams }: { searchParams: { q?: string } }) {
  return <InfoKesehatanSearch searchParams={searchParams} />;
}

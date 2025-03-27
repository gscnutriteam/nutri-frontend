import InfoKesehatanDetail, { generateMetadata } from "@/services/info_kesehatan/pages/info_kesehatan_detail";

export { generateMetadata };

export default function Page({ params }: { params: { id: string } }) {
  return <InfoKesehatanDetail params={params} />;
}

import InfoKesehatanCategories from '@/services/info_kesehatan/pages/info_kesehatan_categories';
import { metadataInfoKesehatanCategories } from '@/services/info_kesehatan/pages/info_kesehatan_categories';

export const metadata = metadataInfoKesehatanCategories;

export default function Page(props: any) {
  return <InfoKesehatanCategories {...props} />;
} 
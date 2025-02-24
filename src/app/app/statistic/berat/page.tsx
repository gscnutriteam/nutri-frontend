import StatisticsBerat from "@/services/statistic/pages/berat_badan/statistic_berat_page";
import { metadataStatisticBerat } from "@/services/statistic/pages/metadata/metadata_statistic_berat";
export const metadata = metadataStatisticBerat;

export default function Page() {
    return (
        <StatisticsBerat/>
    )
}
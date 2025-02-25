import StatisticsKalori from "@/services/statistic/pages/kalori/statistic_berat_kalori";
import { metadataStatisticKalori } from "@/services/statistic/pages/metadata/metadata_statistic_kalori";
export const metadata = metadataStatisticKalori;

export default function Page() {
    return (
        <StatisticsKalori/>
    )
}
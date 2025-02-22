import { metadataStatistic } from "@/services/statistic/pages/metadata/metadata_statistic";
import Statistics from "@/services/statistic/pages/statistic_page";
export const metadata = metadataStatistic;

const dummyUser = {
    name: 'Murdi',
    isPro: true,
    points: 100,
}

export default function Page() {
    return (
        <Statistics user={dummyUser} />
    )
}
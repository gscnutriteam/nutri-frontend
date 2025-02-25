import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { StatisticKalori } from "./statistic_kalori_statistic";
import { CardKalori } from "./card_kalori";
import { dummyCalorieCardsData } from "../db/dummyCalorie";

export default function StatisticsKaloriSection() {
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Kalori"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <StatisticKalori />
        <div className="flex w-full px-5 flex-col mt-4 gap-4">
          {dummyCalorieCardsData.map((data, index) => (
            <CardKalori key={index} {...data} />
          ))}
        </div>
      </div>
    </AppMobileLayout>
  );
}

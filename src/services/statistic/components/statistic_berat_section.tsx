import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { StatisticBerat } from "./statistic_berat_statistic";
import { CardBerat } from "./card_berat";
import { dummyBeratCardsData } from "../db/dummyBerat";
import { ModalTambahBerat2 } from "./modal_tambah_berat";
import { ModalTargetBerat2 } from "./modal_target_berat";

export default function StatisticsBeratSection() {
  return (
    <AppMobileLayout>
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        <HeaderFeature
          title="Berat Badan"
          variant={"primary"}
          className="text-center w-full py-3"
        />
        <StatisticBerat />
        <div className="flex w-full px-5 mt-2 justify-between gap-3 ">
          <ModalTambahBerat2 />
          <ModalTargetBerat2 />
        </div>
        <div className="flex w-full px-5 flex-col mt-4 gap-4">
          {dummyBeratCardsData.map((data, index) => (
            <CardBerat key={index} {...data} />
          ))}
        </div>
      </div>
    </AppMobileLayout>
  );
}

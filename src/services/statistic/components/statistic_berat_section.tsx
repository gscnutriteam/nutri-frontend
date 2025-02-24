import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import { StatisticBerat } from "./statistic_berat_statistic";
import { Button } from "@/components/ui/button";
import { LocateIcon, PlusCircleIcon } from "lucide-react";
import { CardBerat } from "./card_berat";
import { dummyBeratCardsData } from "../db/dummyBerat";

export default function StatisticsBeratSection() {
    return (
        <AppMobileLayout>
            <div className="bg-white relative max-h-[90vh] flex flex-col w-full overflow-auto">
                <HeaderFeature title="Berat Badan" variant={"primary"} className="text-center w-full py-3" />
                <StatisticBerat />
                <div className="flex w-full px-5 mt-2 justify-between gap-3 ">
                    <Button variant={"neutral"}>
                        <PlusCircleIcon size={24} className="mr-1" />
                        Tambah Data
                    </Button>
                    <Button variant={"default"} className="flex-1">
                        <LocateIcon size={24} className="" />
                        Buat Target Berat 
                    </Button>
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
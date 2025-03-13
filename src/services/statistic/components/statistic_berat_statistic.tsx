import { ArrowDown, ArrowUp } from "lucide-react";
import { BadgeBMI } from "./badge_bmi";
import ProgressBMI from "./progress_bmi";
import { cn } from "@/lib/utils";
import { BMIChart } from "./bmi_chart";

export const StatisticBerat = () => {
  return (
    <div className="px-5">
      <div className="bg-pr10 rounded-lg border-2 border-black p-4 w-full flex flex-col">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <p className="text-3xl text-primaryText font-semibold">
              65 <span className="text-lg">kg</span>
            </p>
            <SelisihBeratTarget from={70} target={60} current={65} isDietTurun={true} />
          </div>
          <div className="flex flex-col text-end">
            <p className="font-semibold text-primaryText">BMI</p>
            <div className="flex gap-1">
                <p className="text-lg font-bold">7.8</p>
                <BadgeBMI bmi={7.8} />
            </div>
          </div>
        </div>
        <ProgressBMI from={70} target={60} current={65} isDietTurun={true} />
        <BMIChart className="mt-4" />
      </div>
    </div>
  );
};

const SelisihBeratTarget = ({from, target, current, isDietTurun}: {from: number, target: number, current: number, isDietTurun: boolean }) => {
    const difference = Math.abs(from - current);
    
    const getStyleAndIcon = () => {
        if (isDietTurun) {
            if (current < from) {
                return {
                    textColor: "text-success",
                    Icon: ArrowDown
                };
            }
                return {
                    textColor: "text-danger",
                    Icon: ArrowUp
                };
        }
            if (current < from) {
                return {
                    textColor: "text-danger",
                    Icon: ArrowDown
                };
            }
                return {
                    textColor: "text-success",
                    Icon: ArrowUp
                };
    };

    const { textColor, Icon } = getStyleAndIcon();

    return (
        <>
            <div className="flex">
                <Icon size={16} className={cn(textColor)} />
                <p className={cn("text-sm", textColor)}>{difference} kg</p>
            </div>
        </>
    );
}
import { BadgeBMI } from "./badge_bmi";
import { parseDateToString } from "../util/util";
import { ButtonIcon } from "./button_icon";
import { CardBeratProps } from "../types/berat";

export const CardBerat = (data: CardBeratProps) => {
  return (
    <div className="w-full bg-secondaryLight border-2 px-3 py-2 border-black flex items-center justify-between rounded-lg">
      <div className="flex flex-col h-full">
        <p className="text-textGray">BMI</p>
        <div className="flex flex-col items-start">
        <p className="text-4xl font-bold">{data.bmi}</p>
        <BadgeBMI className="scale-100 px-4 text-sm" bmi={data.bmi} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 w-full justify-end">
          <ButtonIcon variant="edit" />
          <ButtonIcon variant="delete" />
        </div>
        <p className="text-textGray mt-1">{parseDateToString(data.tanggal)}</p>
        <div className="flex flex-col w-full items-end mt-2">
            <p>Berat: {data.berat}</p>
            <p>Tinggi: {data.tinggi}</p>
        </div>
      </div>
    </div>
  );
};
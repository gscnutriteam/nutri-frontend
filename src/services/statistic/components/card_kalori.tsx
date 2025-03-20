import { parseDateToString } from "../util/util";
import type { CardCalorieProps } from "../types/berat";
import Image from "next/image";
import { ModalDeleteCalorie } from "./modal_delete_calorie";

interface CardKaloriProps extends CardCalorieProps {
  onDelete: () => void;
}

export const CardKalori = ({ onDelete, ...data }: CardKaloriProps) => {
  console.log(data);
  return (
    <div className="w-full bg-secondaryLight border-2 px-3 py-2 border-black flex items-center justify-between rounded-lg">
      <div className="flex flex-col h-full">
        <p className="text-black text-start mt-1">{data.title || "Makan Siang"}</p>
        <Image
          src={data.image}
          width={64}
          height={64}
          className="object-cover aspect-square rounded-full border-2 my-1 border-black"
          alt="Makanan"
        />
        <div className="flex flex-col items-start">
          <p className="text-3xl font-bold">
            {data.calorie} <span className="font-normal text-lg">kkal</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 w-full justify-end">
          <ModalDeleteCalorie id={data.id} onDelete={onDelete} />
        </div>
        <p className="text-textGray text-end mt-1">{parseDateToString(data.tanggal)}</p>
        <div className="flex flex-col w-full items-end mt-2">
          <p>Karbohidrat: {data.carbs}</p>
          <p>Protein: {data.protein}</p>
          <p>Lemak: {data.fat}</p>
        </div>
      </div>
    </div>
  );
};

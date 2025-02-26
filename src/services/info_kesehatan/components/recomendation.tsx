import { dataInfoKesehatanCards } from "../data/dummy";
import { CardInfoKesehatan } from "./card-info-kesehatan";

export const Recomendation = () => {
  return (
    <>
      <div className="flex flex-col mt-5 w-full">
        <div className="flex w-full justify-between items-center">
          <p className="text-lg font-semibold">Rekomendasi</p>
          <p className="text-primary cursor-pointer">Selengkapnya</p>
        </div>
        <div className="flex w-full flex-col mt-5 gap-3">
            {dataInfoKesehatanCards.map((data, index) => (
                <CardInfoKesehatan key={index} {...data} />
            ))}
        </div>
      </div>
    </>
  );
};

import Image from "next/image";
import { BadgeCategory } from "./badge-category";
import type { CardTopNewsProps } from "../types/types";
import { dateTimetoYangLalu } from "../util/date";

export const CardTopNews = (data: CardTopNewsProps) => {
  return (
    <>
        <div className="relative shadow-shadow border-border border-2 rounded-lg aspect-[319/171] w-[100%]">
          <Image
            src={data?.image ?? "/assets/img/nasi.png"}
            fill
            alt="Info Kesehatan"
            objectFit="cover"
            className="rounded-lg object-cover"
          />
          <div className="bg-gradient-to-b from-transparent via-transparent to-black bg-lightgray bg-center bg-cover bg-no-repeat absolute w-full h-full"></div>
          <div className="absolute left-2 bottom-2 flex flex-col gap-2">
            <div className="flex gap-2">
              <p className="text-white">{dateTimetoYangLalu(data.tanggal)}</p>
              <BadgeCategory category={data.category} />
            </div>
            <p className="font-semibold text-white line-clamp-1">
              {data.title}
            </p>
          </div>
        </div>
    </>
  );
};


import Image from "next/image";
import { BadgeCategory } from "./badge-category";
import type { CardTopNewsProps } from "../types/types";
import { dateTimetoYangLalu } from "../util/date";
import Link from "next/link";
import { CalendarIcon, ClockIcon } from "lucide-react";

export const CardTopNews = (data: CardTopNewsProps) => {
  const detailUrl = `/app/info-kesehatan/${data.id || ''}`;

  return (
    <Link href={detailUrl} className="block mb-2 overflow-hidden pb-5 pe-1">
      <div className="relative shadow-shadow border-border border-2 rounded-lg aspect-[319/171] w-[100%] cursor-pointer group transform-gpu">
        <Image
          src={data?.image ?? "/assets/img/nasi.png"}
          fill
          alt={data.title}
          objectFit="cover"
          className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="bg-gradient-to-b from-transparent via-transparent to-black opacity-80 bg-lightgray bg-center bg-cover bg-no-repeat absolute w-full h-full rounded-lg"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Baca selengkapnya</div>
        </div>
        <div className="absolute left-3 bottom-3 flex flex-col gap-2 w-[90%] z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-white text-sm">
              <CalendarIcon size={14} className="text-white" />
              <p>{dateTimetoYangLalu(data.tanggal)}</p>
            </div>
            <BadgeCategory category={data.category} />
          </div>
          <p className="font-semibold text-white text-lg line-clamp-1">
            {data.title}
          </p>
        </div>
      </div>
    </Link>
  );
};


import Image from "next/image";
import type { CardInfoKesehatanProps } from "../types/types";
import { BadgeCategory } from "./badge-category";
import { dateTimetoYangLalu } from "../util/date";

export const CardInfoKesehatan = ({ title, category, image, tanggal }: CardInfoKesehatanProps) => {
    return (
        <div className="flex w-full gap-4 items-center">
            <div className="relative border-border border-2 rounded-lg aspect-[115/105] basis-[36%]">
                <Image src={image} fill alt="Info Kesehatan" objectFit="cover" className="rounded-lg object-cover" />
            </div>
            <div className="flex basis-[64%] flex-col gap-2">
                <div className="flex w-full justify-between items-center">
                    <BadgeCategory category={category} />
                </div>
                <p className="font-semibold text-lg line-clamp-2">{title}</p>
                <p className="text-textGray">{dateTimetoYangLalu(tanggal)}</p>
            </div>
        </div>
    )
}
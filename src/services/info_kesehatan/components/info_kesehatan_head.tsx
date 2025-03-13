import Image from "next/image";
import type { InfoKesehatanHeadProps } from "../types/types";
import { dateTimetoYangLalu } from "../util/date";
import { BadgeCategory } from "./badge-category";

export const InfoKesehatanHead = ({data} : {data: InfoKesehatanHeadProps}) => {
    const {tanggal, category, title, image, link, readingTime} = data;

    return (
        <div className="flex w-full flex-col">
            <BadgeCategory className="w-fit mt-2" category={category} />
            <p className="text-2xl font-bold mt-2">{title}</p>
            <div className="flex w-full justify-between mt-2">
                <p className="text-textGray">{dateTimetoYangLalu(tanggal)}</p>
                <p className="text-textGray">{readingTime} menit baca</p>
            </div>
            <div className="relative w-full aspect-[300/200] mt-3 border-2 border-black rounded-lg">
                <Image fill src={image} alt={title} className="object-cover" />
            </div>
        </div>
    )

}
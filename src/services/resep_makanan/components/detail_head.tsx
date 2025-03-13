import Image from "next/image";
import type { DetailHeadProps } from "../types/type";
import { dateTimetoYangLalu } from "@/services/info_kesehatan/util/date";

export const DetailResepHead = ({data} : {data: DetailHeadProps}) => {
    const {title, image, created_at, readingTime} = data;

    return (
        <div className="flex w-full flex-col">
            <p className="text-2xl font-bold mt-2">{title}</p>
            <div className="flex w-full justify-between mt-2">
                <p className="text-textGray">{dateTimetoYangLalu(created_at)}</p>
                <p className="text-textGray">{readingTime} menit baca</p>
            </div>
            <div className="relative w-full aspect-[300/200] mt-3 border-2 border-black rounded-lg">
                <Image fill src={image} alt={title} className="object-cover" />
            </div>
        </div>
    )

}
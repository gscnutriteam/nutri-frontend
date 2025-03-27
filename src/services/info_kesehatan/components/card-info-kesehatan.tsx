import Image from "next/image";
import type { CardInfoKesehatanProps } from "../types/types";
import { BadgeCategory } from "./badge-category";
import { dateTimetoYangLalu } from "../util/date";
import Link from "next/link";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";

export const CardInfoKesehatan = ({ title, category, image, tanggal, id, link }: CardInfoKesehatanProps) => {
    // Use provided link or construct one from the id
    const detailUrl = link || `/app/info-kesehatan/${id || ''}`;
    
    return (
        <Link href={detailUrl} className="block mb-1">
            <div className="flex w-full gap-4 items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-all duration-300 border border-transparent hover:border-gray-200 group">
                <div className="relative border-border border-2 rounded-lg aspect-[115/105] basis-[36%] overflow-hidden">
                    <Image 
                        src={image} 
                        fill 
                        alt={title} 
                        objectFit="cover" 
                        className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                </div>
                <div className="flex basis-[64%] flex-col gap-2">
                    <div className="flex w-full justify-between items-center">
                        <BadgeCategory category={category} />
                        <ArrowRightIcon size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">{title}</p>
                    <div className="flex items-center gap-1 text-textGray text-sm">
                        <CalendarIcon size={14} className="text-textGray" />
                        <p>{dateTimetoYangLalu(tanggal)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
} 
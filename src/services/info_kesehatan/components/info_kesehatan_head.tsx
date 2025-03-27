import Image from "next/image";
import type { InfoKesehatanHeadProps } from "../types/types";
import { dateTimetoYangLalu } from "../util/date";
import { BadgeCategory } from "./badge-category";
import { CalendarIcon, ClockIcon, BookOpenIcon } from "lucide-react";
import { ShareButton } from "./share-button";
import { SaveButton } from "./save-button";

interface InfoKesehatanHeadComponentProps {
  data: InfoKesehatanHeadProps;
  showActionButtons?: boolean;
}

export const InfoKesehatanHead = ({
  data,
  showActionButtons = true
}: InfoKesehatanHeadComponentProps) => {
    const {tanggal, category, title, image, link, readingTime, id = ""} = data;

    return (
        <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
                <BadgeCategory className="w-fit mt-2" category={category} />
                {showActionButtons && (
                  <div className="flex gap-3">
                      <SaveButton articleId={id} title={title} />
                      <ShareButton url={link} title={title} />
                  </div>
                )}
            </div>
            
            <h1 className="text-2xl font-bold mt-3 leading-tight text-gray-900">{title}</h1>
            
            <div className="flex w-full gap-4 items-center mt-3">
                <div className="flex items-center gap-1 text-textGray">
                    <CalendarIcon size={16} className="text-gray-500" />
                    <p>{dateTimetoYangLalu(tanggal)}</p>
                </div>
                <div className="flex items-center gap-1 text-textGray">
                    <ClockIcon size={16} className="text-gray-500" />
                    <p>{readingTime} menit baca</p>
                </div>
            </div>
            
            <div className="relative w-full aspect-[16/9] mt-4 border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <Image 
                    fill 
                    src={image} 
                    alt={title} 
                    className="object-cover transition-transform duration-700 hover:scale-105" 
                />
            </div>
            
            <div className="flex items-center mt-4 py-2 border-t border-b border-gray-200">
                <BookOpenIcon size={16} className="text-primary mr-2" />
                <p className="text-sm text-gray-600">Baca artikel untuk mendapatkan informasi kesehatan terbaru</p>
            </div>
        </div>
    )
}
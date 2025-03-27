"use client";

import { CardInfoKesehatan } from "./card-info-kesehatan";
import { CardInfoKesehatanProps } from "../types/types";
import LinkAPP from "@/components/util/link";

interface RecommendationClientProps {
  articles: CardInfoKesehatanProps[];
}

export function RecommendationClient({ articles }: RecommendationClientProps) {
  if (articles.length === 0) {
    return <div className="flex flex-col mt-5 w-full py-4">No recommendations available</div>;
  }

  return (
    <>
      <div className="flex flex-col mt-5 w-full">
        <div className="flex w-full justify-between items-center">
          <p className="text-lg font-semibold">Rekomendasi</p>
          <LinkAPP href="/info-kesehatan/categories" className="text-primary cursor-pointer">Selengkapnya</LinkAPP>
        </div>
        <div className="flex w-full flex-col mt-5 ">
            {articles.map((data, index) => (
                <CardInfoKesehatan key={data.id || index} {...data} />
            ))}
        </div>
      </div>
    </>
  );
} 
"use client";
import { useState, useEffect } from "react";
import { CardTopNews } from "./card-top-news";
import { TopNowCardsData } from "../data/dummy";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export const TopNews = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <div className="flex flex-col w-full mt-5">
        <p className="text-lg font-semibold">Top News</p>
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full mt-5"
          >
            <CarouselContent>
              {TopNowCardsData.map((data, index) => (
                <CarouselItem key={index} className="basis-[90%]">
                  <CardTopNews {...data} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex justify-center gap-2 mt-4">
            {[...Array(TopNowCardsData.length).keys()].map((index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 transition-all duration-300 ${
                  current === index
                    ? "w-6 bg-primary rounded-full"
                    : "w-2 bg-gray-300 rounded-full"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

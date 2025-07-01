"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { ChevronRight, HeartHandshake, ArrowRight } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { motion } from 'framer-motion';
import { fadeInUp, useAnimationContext, viewportConfig } from './AnimationProvider';

const reviews = [
  {
    name: "Dr. Andi",
    username: "@dr.andi",
    body: "NutriPlate membantu pasien saya mengontrol porsi makan dengan lebih baik.",
    img: "https://avatar.vercel.sh/drandi",
  },
  {
    name: "Siti",
    username: "@siti.rahayu",
    body: "Berat badan saya turun 8kg dalam 6 bulan berkat porsi makan yang tepat.",
    img: "https://avatar.vercel.sh/siti",
  },
  {
    name: "Budi",
    username: "@budi.s",
    body: "Diabetes saya lebih terkontrol dengan panduan porsi dari NutriPlate.",
    img: "https://avatar.vercel.sh/budi",
  },
  {
    name: "Maya",
    username: "@maya.ind",
    body: "Anak-anak suka dengan piring yang colorful dan porsi yang sesuai.",
    img: "https://avatar.vercel.sh/maya",
  },
  {
    name: "Denny",
    username: "@denny.pro",
    body: "Sebagai atlet, NutriPlate membantu saya mengatur nutrisi dengan tepat.",
    img: "https://avatar.vercel.sh/denny",
  },
  {
    name: "Dr. Linda",
    username: "@dr.linda",
    body: "Inovasi yang sangat membantu dalam edukasi gizi pasien.",
    img: "https://avatar.vercel.sh/linda",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-[2rem] border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={`https://ui-avatars.com/api/?background=random&name=${name}`} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function CallToAction() {
  const { controls, isMobile } = useAnimationContext();
  
  return (
    <motion.section 
      className="py-20 bg-gradient-to-br from-primary/20 to-secondary/20"
      initial="initial"
      animate={isMobile ? controls : undefined}
      whileInView={!isMobile ? "animate" : undefined}
      viewport={viewportConfig}
      variants={fadeInUp}
    >
      <div className="py-14">
        <div className="flex w-full flex-col items-center justify-center p-4">
          <div className="container relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border p-10 py-14">
            <div className="absolute rotate-[35deg] w-[200%] left-[-50%] pointer-events-none">
              <div className="space-y-8">
                <Marquee className="[--gap:1rem] [--duration:40s] [--pause-on-hover:running]">
                  {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <Marquee reverse className="[--gap:1rem] [--duration:35s] [--pause-on-hover:running] [--direction:reverse]">
                  {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <Marquee className="[--gap:1rem] [--duration:40s] [--pause-on-hover:running]">
                  {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <Marquee reverse className="[--gap:1rem] [--duration:35s] [--pause-on-hover:running] [--direction:reverse]">
                  {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <Marquee className="[--gap:1rem] [--duration:40s] [--pause-on-hover:running]">
                  {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <Marquee reverse className="[--gap:1rem] [--duration:35s] [--pause-on-hover:running] [--direction:reverse]">
                  {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
              </div>
            </div>
            <div className="z-10 mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32">
              <HeartHandshake className="mx-auto size-16 text-black dark:text-white lg:size-24" />
            </div>
            <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
              <h1 className="text-3xl font-bold lg:text-4xl">
                Mulai Hidup Sehat Sekarang
              </h1>
              <p className="mt-2">
                Dapatkan NutriPlate dan rasakan manfaatnya dalam 7 hari pertama
              </p>
              <a
                href="/app/register"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "default",
                  }),
                  "group mt-4 rounded-[2rem] px-6"
                )}
              >
                Coba Nutriplate
                <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
              </a>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

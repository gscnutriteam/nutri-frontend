'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Crown } from 'lucide-react';

const PremiumBanner = () => {
  return (
    <div className="relative p-4 bg-secondaryLight rounded-xl border-2 border-black shadow-neobrutalism overflow-hidden animate-fade-in-slide-up">
      <div className="absolute top-0 right-0 bg-secondary px-2 py-1 transform rotate-0 translate-x-4 -translate-y-0 border-l-2 border-b-2 border-black">
        <span className="font-bold text-xs">NEW</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Crown size={18} />
            <h3 className="text-lg font-bold">Go Premium</h3>
          </div>
          <p className="mt-1 text-sm text-textGray max-w-[220px]">Unlock all features and get personalized meal plans</p>
          <Link href="/app/premium" className="inline-block mt-3 px-4 py-2 bg-black text-white rounded-lg shadow-neobrutalism-sm font-semibold">
            Upgrade Now
          </Link>
        </div>
        <div className="relative w-20 h-20">
          <Image
            src="/assets/img/crown.png"
            alt="Premium"
            width={80}
            height={80}
            className="object-contain animate-float-slow"
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumBanner; 
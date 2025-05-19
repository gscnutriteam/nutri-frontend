'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Scroll, HeartPulse } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="grid grid-cols-3 gap-3 animate-fade-in-slide-up">
      <Link href="/app/scan" className="flex flex-col items-center p-4 bg-white rounded-xl border-2 border-black shadow-neobrutalism-sm hover:translate-y-[-2px] transition-transform">
        <div className="w-12 h-12 flex items-center justify-center bg-pr10 rounded-full mb-2">
          <Camera size={24} className="text-primaryText" />
        </div>
        <span className="text-sm font-semibold text-center">Scan Food</span>
      </Link>
      <Link href="/app/resep-makanan" className="flex flex-col items-center p-4 bg-white rounded-xl border-2 border-black shadow-neobrutalism-sm hover:translate-y-[-2px] transition-transform">
        <div className="w-12 h-12 flex items-center justify-center bg-secondaryLight rounded-full mb-2">
          <Scroll size={24} className="text-black" />
        </div>
        <span className="text-sm font-semibold text-center">Recipes</span>
      </Link>
      <Link href="/app/info-kesehatan" className="flex flex-col items-center p-4 bg-white rounded-xl border-2 border-black shadow-neobrutalism-sm hover:translate-y-[-2px] transition-transform">
        <div className="w-12 h-12 flex items-center justify-center bg-pr10 rounded-full mb-2">
          <HeartPulse size={24} className="text-primaryText" />
        </div>
        <span className="text-sm font-semibold text-center">Health Info</span>
      </Link>
    </div>
  );
};

export default QuickActions; 
'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, ChevronRight } from 'lucide-react';
import { ExtendedUserData } from '../types/homeTypes';

interface StatsCardProps {
  user: ExtendedUserData;
}

const StatsCard = ({ user }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-xl border-2 border-black p-4 shadow-neobrutalism animate-fade-in-slide-up">
      <div className="flex items-center gap-2 mb-3">
        <Trophy size={18} />
        <h3 className="text-lg font-bold">Your Stats</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-pr10 rounded-lg border border-black">
          <p className="text-sm text-textGray">Weight</p>
          <p className="text-xl font-bold">{user.weight} kg</p>
        </div>
        <div className="p-3 bg-pr10 rounded-lg border border-black">
          <p className="text-sm text-textGray">Height</p>
          <p className="text-xl font-bold">{user.height} cm</p>
        </div>
        <div className="p-3 bg-pr10 rounded-lg border border-black">
          <p className="text-sm text-textGray">BMI</p>
          <p className="text-xl font-bold">{user.bmi}</p>
        </div>
        <div className="p-3 bg-pr10 rounded-lg border border-black">
          <p className="text-sm text-textGray">Points</p>
          <p className="text-xl font-bold">{user.points}</p>
        </div>
      </div>
      <Link href="/app/statistic" className="flex items-center justify-center gap-1 w-full py-3 bg-primary text-white rounded-lg border-2 border-black shadow-neobrutalism-sm mt-3 font-semibold">
        View Detailed Stats <ChevronRight size={16} />
      </Link>
    </div>
  );
};

export default StatsCard; 
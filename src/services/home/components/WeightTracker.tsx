'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import { ExtendedUserData, WeightHistoryEntry } from '../types/homeTypes';

interface WeightTrackerProps {
  user: ExtendedUserData;
  isLoading: boolean;
}

const WeightTracker = ({ user, isLoading }: WeightTrackerProps) => {
  return (
    <>
      {/* Weight Tracking Card */}
      <div className="relative bg-white rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up p-5">
        <div className="flex flex-col items-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 border-4 border-main border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Loading weight data...</p>
            </div>
          ) : (
            <>
              {/* Simplified weight display */}
              <div className="flex flex-col items-center mb-4">
                <div className="text-4xl font-bold">{user.weight} kg</div>
                <div className="text-sm text-gray-500">Berat Badan Sekarang</div>
              </div>

              {/* Simple progress bar */}
              <div className="w-full mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Awal: {user.initialWeight || user.weightHistory[0]?.value || 0} kg</span>
                  <span className="text-sm">Target: {user.targetWeight} kg</span>
                </div>
                <Progress 
                  value={user.weightGoalType === 'loss' 
                    ? (user.initialWeight || user.weightHistory[0]?.value || 0) - user.weight 
                    : user.weight - (user.initialWeight || user.weightHistory[0]?.value || 0)} 
                  max={user.weightGoalType === 'loss' 
                    ? (user.initialWeight || user.weightHistory[0]?.value || 0) - user.targetWeight 
                    : user.targetWeight - (user.initialWeight || user.weightHistory[0]?.value || 0)}
                  fillColor="bg-primary"
                  className="h-4 mb-1"
                />
                <p className="text-sm text-center">
                  {user.weightGoalType === 'loss'
                    ? `Kamu perlu menurunkan ${(user.weight - user.targetWeight).toFixed(1)} kg lagi`
                    : `Kamu perlu menaikkan ${(user.targetWeight - user.weight).toFixed(1)} kg lagi`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Weight History Card */}
      <div className="bg-white rounded-xl border-2 border-black p-4 shadow-neobrutalism animate-fade-in-slide-up">
        <div className="flex items-center gap-2 mb-3">
          <Trophy size={18} />
          <h3 className="text-lg font-bold">Riwayat Berat Badan</h3>
        </div>
        <div className="flex flex-col gap-3">
          {user.weightHistory.map((entry: WeightHistoryEntry, index: number) => (
            <div key={`weight-entry-${entry.date}-${index}`} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-semibold">{new Date(entry.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold">{entry.value} kg</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeightTracker; 
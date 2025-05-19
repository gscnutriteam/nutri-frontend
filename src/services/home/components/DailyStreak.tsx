'use client';

import React from 'react';
import { Flame, AlertCircle, Star, Check } from 'lucide-react';
import { DailyCheckin, ExtendedUserData } from '../types/homeTypes';

interface DailyStreakProps {
  user: ExtendedUserData;
}

const DailyStreak = ({ user }: DailyStreakProps) => {
  // Helper function to get the status icon for streak days
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check size={16} className="text-white" />;
      case 'missed':
        return <AlertCircle size={16} className="text-white" />;
      case 'current':
        return <Flame size={16} className="text-black fill-red-500" />;
      default:
        return null;
    }
  };

  // Helper function to get the background color for streak days
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary';
      case 'missed':
        return 'bg-danger';
      case 'current':
        return 'bg-secondary';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="p-4 bg-secondaryLight rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame size={20} className="text-black fill-red-500" />
          <h3 className="text-lg font-bold">Daily Streak</h3>
        </div>
        <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-black">
          <Star size={16} className='fill-yellow-500' />
          <span className="font-bold">{user.currentStreak} Hari</span>
        </div>
      </div>
      
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-textGray">Current Streak</p>
          <p className="font-bold text-xl">{user.currentStreak} days</p>
        </div>
        <div>
          <p className="text-sm text-textGray">Longest Streak</p>
          <p className="font-bold text-xl">{user.longestStreak} days</p>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {user.dailyCheckins.map((day: DailyCheckin, index: number) => (
          <div key={`checkin-${day.date}-${index}`} className="flex flex-col items-center">
            <p className="text-xs text-textGray mb-1">{day.day}</p>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-black ${getStatusColor(day.status)}`}>
              {getStatusIcon(day.status)}
            </div>
            <p className="text-xs font-medium mt-1">
              {day.status === 'current' ? 'Today' : 
               day.status === 'upcoming' ? 'Coming' : ''}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs">Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-xs">Today</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-white border border-black"></div>
            <span className="text-xs">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyStreak; 
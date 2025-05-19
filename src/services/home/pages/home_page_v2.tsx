'use client';

import { useState } from 'react';
import BottomNavigation from '../components/bottom_navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HomeV2Props, Meal } from '../types/homeTypes';

// Import extracted components
import UserHeader from '../components/UserHeader';
import CalorieRing from '../components/CalorieRing';
import MacroNutrientCards from '../components/MacroNutrientCards';
import WeightTracker from '../components/WeightTracker';
import DailyStreak from '../components/DailyStreak';
import RecentMeals from '../components/RecentMeals';
import QuickActions from '../components/QuickActions';
import StatsCard from '../components/StatsCard';
import PremiumBanner from '../components/PremiumBanner';
import ChatWithNubo from '../components/ChatWithNubo';

// Define weight history entry type
interface WeightHistoryEntry {
  date: string;
  value: number;
}

// Define check-in entry type 
interface DailyCheckin {
  day: string;
  status: string;
  date: string;
}

// Define extended user data type
interface ExtendedUserData {
  name: string;
  isPro: boolean;
  points: number;
  streak?: number;
  currentStreak?: number;
  longestStreak?: number;
  dailyCheckins: DailyCheckin[];
  avatar?: string;
  bmi?: number;
  weight: number;
  targetWeight: number;
  weightGoalType: string;
  weightHistory: WeightHistoryEntry[];
  height: number;
  gender?: string;
  age?: number;
  activityLevel?: string;
  [key: string]: any; // Allow additional properties
}

export default function HomeV2({ userData, nutritionData, initialLoading = false }: HomeV2Props) {
  // State for loading
  const [isLoading, setIsLoading] = useState(initialLoading);
  
  // Use data from props
  const user = userData;

  // Recent meals state
  const [recentMeals, setRecentMeals] = useState<Meal[]>([
    {
      id: 1,
      name: 'Breakfast',
      time: '8:30 AM',
      calories: 420,
      image: '/assets/img/meals/breakfast.jpg',
    },
    {
      id: 2, 
      name: 'Lunch',
      time: '12:45 PM',
      calories: 650,
      image: '/assets/img/meals/lunch.jpg',
    },
  ]);

  return (
    <div className="w-full relative pb-20">
      <style>{`
        .progress-circle-shadow {
          filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2));
        }
      `}</style>
      <div className="w-full relative flex flex-col gap-4 outfit-font pb-20 bg-bg p-4">
        {/* Header with user profile */}
        <UserHeader user={user} />

        {/* Tabs Navigation */}
        <Tabs defaultValue="calories" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="calories">Kalori</TabsTrigger>
            <TabsTrigger value="weight">Berat Badan</TabsTrigger>
          </TabsList>
            
          {/* Calories Tab Content */}
          <TabsContent value="calories" className="flex flex-col gap-4">
            {/* Calorie Tracking Card */}
            <div className="relative bg-white rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up p-5">
              <div className="flex flex-col items-center">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 border-4 border-main border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading nutrition data...</p>
                  </div>
                ) : (
                  <CalorieRing value={nutritionData.caloriesConsumed} max={nutritionData.caloriesGoal} />
                )}
                  
                {/* Nutrition Cards Grid */}
                <MacroNutrientCards nutritionData={nutritionData} />
              </div>
            </div>
          </TabsContent>
          
          {/* Weight Tab Content */}
          <TabsContent value="weight" className="flex flex-col gap-4">
            <WeightTracker user={user} isLoading={isLoading} />
          </TabsContent>
        </Tabs>

        {/* Streak Section */}
        <DailyStreak user={user} />

        {/* Recent Meals */}
        <RecentMeals meals={recentMeals} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Card */}
        <StatsCard user={user} />

        {/* Premium banner */}
        {!user.isPro && <PremiumBanner />}

        {/* Chat with Nubo */}
        <ChatWithNubo />
      </div>
      <BottomNavigation />
    </div>
  );
} 
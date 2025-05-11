'use client';

import React, { useState } from 'react';
import AppMobileLayout from '@/layout/app_mobile_layout';
import Image from 'next/image';
import Link from 'next/link';
import { getDetailUser } from '@/services/profile/api/getUser';
import { CalendarCheck, Camera, ChevronRight, Crown, HeartPulse, Info, Scroll, Trophy, Utensils } from 'lucide-react';
import BottomNavigation from '../components/bottom_navigation';

export default function HomeV2() {
  // This would be fetched from the API in a real scenario
  // For now using placeholder data
  const [user, setUser] = useState({
    name: 'John',
    isPro: false,
    points: 120,
    streak: 4,
    avatar: '/assets/img/avatar.png', // Placeholder
    bmi: 22.1,
    weight: 68,
    height: 175,
    caloriesGoal: 2000,
    caloriesConsumed: 1280,
  });

  const [nutritionData, setNutritionData] = useState({
    carbs: { value: 88, max: 120, unit: 'g' },
    protein: { value: 24, max: 70, unit: 'g' },
    fat: { value: 32, max: 55, unit: 'g' },
  });

  const [recentMeals, setRecentMeals] = useState([
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

  const getStreakMascot = (streak: number) => {
    if (streak >= 7) return '/assets/img/mascot/mascot-7day.png';
    if (streak >= 3) return '/assets/img/mascot/mascot-3day.png';
    return '/assets/img/mascot/mascot-1day.png';
  };

  // Calculate nutrition percentages
  const calculatePercentage = (value: number, max: number) => {
    return Math.min(Math.round((value / max) * 100), 100);
  };

  return (
    <div className="w-full relative pb-20">
      <div className="w-full relative flex flex-col gap-4 outfit-font pb-20 bg-bg p-4">
        {/* Header with user profile */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-primary shadow-neobrutalism-sm">
              <Image
                src={user.avatar || '/assets/img/default-avatar.png'}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-bold">Hello, {user.name}</p>
              <p className="text-sm text-textGray">Monday, March 22</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/app/notification" className="p-2 bg-white rounded-full border-2 border-black shadow-neobrutalism-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="black"/>
              </svg>
            </Link>
            <Link href="/app/profile" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black shadow-neobrutalism-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z" fill="black"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Calorie Gauge */}
        <div className="relative p-5 bg-white rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up">
          <div className="flex flex-col items-center">
            <div className="relative flex justify-center items-center w-48 h-48">
              {/* Background circle */}
              <div className="absolute inset-0 bg-pr10 rounded-full"></div>
              
              {/* Progress circle */}
              <div 
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  background: `conic-gradient(#53C2C6 0% ${(user.caloriesConsumed / user.caloriesGoal) * 100}%, transparent ${(user.caloriesConsumed / user.caloriesGoal) * 100}% 100%)`
                }}
              ></div>
              
              {/* Center circle with content */}
              <div className="relative z-20 flex flex-col items-center justify-center w-36 h-36 bg-white rounded-full border-2 border-black animate-pulse-slow">
                <span className="text-4xl font-bold">{user.caloriesConsumed}</span>
                <span className="text-sm text-textGray">kcal</span>
              </div>
            </div>
            <div className="flex w-full justify-between mt-4">
              <div className="flex flex-col items-center">
                <p className="text-sm text-textGray">Carbs</p>
                <div className="flex items-end">
                  <span className="text-xl font-bold">{nutritionData.carbs.value}</span>
                  <span className="text-xs ml-1">/{nutritionData.carbs.max}{nutritionData.carbs.unit}</span>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${calculatePercentage(nutritionData.carbs.value, nutritionData.carbs.max)}%`
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-textGray">Protein</p>
                <div className="flex items-end">
                  <span className="text-xl font-bold">{nutritionData.protein.value}</span>
                  <span className="text-xs ml-1">/{nutritionData.protein.max}{nutritionData.protein.unit}</span>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${calculatePercentage(nutritionData.protein.value, nutritionData.protein.max)}%`
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-textGray">Fat</p>
                <div className="flex items-end">
                  <span className="text-xl font-bold">{nutritionData.fat.value}</span>
                  <span className="text-xs ml-1">/{nutritionData.fat.max}{nutritionData.fat.unit}</span>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${calculatePercentage(nutritionData.fat.value, nutritionData.fat.max)}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Section */}
        <div className="p-4 bg-secondaryLight rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CalendarCheck size={18} />
                <h3 className="text-lg font-bold">Daily Streak</h3>
              </div>
              <p className="mt-1 text-sm text-textGray">You're on a roll! Keep it up!</p>
              <div className="flex mt-3 gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div 
                    key={day} 
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-black ${day <= user.streak ? 'bg-secondary' : 'bg-white'}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-24 h-24">
              <Image
                src={getStreakMascot(user.streak)}
                alt="Streak mascot"
                width={96}
                height={96}
                className="object-contain animate-bounce-slow"
              />
            </div>
          </div>
        </div>

        {/* Recent Meals */}
        <div className="bg-white rounded-xl border-2 border-black p-4 shadow-neobrutalism animate-fade-in-slide-up">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Utensils size={18} />
              <h3 className="text-lg font-bold">Recent Meals</h3>
            </div>
            <Link href="/app/statistic" className="flex items-center text-sm text-primaryText">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentMeals.map((meal) => (
              <div key={meal.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-black">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{meal.name}</h4>
                  <p className="text-xs text-textGray">{meal.time}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-bold">{meal.calories}</p>
                  <p className="text-xs text-textGray">kcal</p>
                </div>
              </div>
            ))}
            <button className="w-full py-3 bg-pr10 text-primaryText rounded-lg border-2 border-black shadow-neobrutalism-sm mt-2 font-semibold">
              Add Meal +
            </button>
          </div>
        </div>

        {/* Quick Actions */}
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

        {/* Stats Card */}
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

        {/* Premium banner */}
        {!user.isPro && (
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
        )}

        {/* Chat with Nubo */}
        <Link href="/app/chat-nubo" className="flex items-center justify-between p-4 bg-primary rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-white">
              <Image
                src="/assets/img/nubo-avatar.png"
                alt="Nubo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Chat with Nubo</h3>
              <p className="text-sm text-white opacity-80">Your AI nutrition assistant</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-white" />
        </Link>
      </div>
      <BottomNavigation />
    </div>
  );
} 
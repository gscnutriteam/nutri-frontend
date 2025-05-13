'use client';

import React, { useState, useEffect } from 'react';
import AppMobileLayout from '@/layout/app_mobile_layout';
import Image from 'next/image';
import Link from 'next/link';
import { getDetailUser } from '@/services/profile/api/getUser';
import { CalendarCheck, Camera, ChevronRight, Crown, HeartPulse, Info, Scroll, Trophy, Utensils, Check, X, AlertCircle, Star, Flame } from 'lucide-react';
import BottomNavigation from '../components/bottom_navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function HomeV2() {
  // This would be fetched from the API in a real scenario
  // For now using placeholder data
  const [user, setUser] = useState({
    name: 'John',
    isPro: false,
    points: 120,
    streak: 4,
    currentStreak: 4,
    longestStreak: 7,
    dailyCheckins: [
      { day: 'Mon', status: 'completed', date: '2023-05-01' },
      { day: 'Tue', status: 'completed', date: '2023-05-02' },
      { day: 'Wed', status: 'completed', date: '2023-05-03' },
      { day: 'Thu', status: 'completed', date: '2023-05-04' },
      { day: 'Fri', status: 'current', date: '2023-05-05' },
      { day: 'Sat', status: 'upcoming', date: '2023-05-06' },
      { day: 'Sun', status: 'upcoming', date: '2023-05-07' },
    ],
    avatar: '/assets/img/avatar.png', // Placeholder
    bmi: 22.1,
    weight: 68,
    targetWeight: 64,
    weightGoalType: 'loss', // 'loss' or 'gain'
    weightHistory: [
      { date: '2023-01-01', value: 72 },
      { date: '2023-02-01', value: 70 },
      { date: '2023-03-01', value: 69 },
      { date: '2023-04-01', value: 68 },
    ],
    height: 175,
    gender: 'pria', // 'pria' or 'wanita'
    age: 28,
    activityLevel: 'sedang', // 'ringan', 'sedang', 'berat'
    caloriesGoal: 2540,
    caloriesConsumed: 2539,
  });

  const [nutritionData, setNutritionData] = useState({
    carbs: { value: 281, max: 359, unit: 'g' },
    protein: { value: 20, max: 143, unit: 'g' },
    fat: { value: 169, max: 359, unit: 'g' },
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

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = (
    gender: string, 
    age: number, 
    weight: number, 
    height: number, 
    activityLevel: string
  ): number => {
    // Calculate Basal Metabolic Rate (BMR)
    let bmr;
    if (gender === 'pria') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'wanita') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      throw new Error("Jenis kelamin tidak valid. Gunakan 'pria' atau 'wanita'.");
    }

    // Determine activity factor based on activity level
    let activityFactor;
    switch (activityLevel) {
      case 'ringan':
        activityFactor = 1.2; // Light activity
        break;
      case 'sedang':
        activityFactor = 1.55; // Moderate activity
        break;
      case 'berat':
        activityFactor = 1.9; // Heavy activity
        break;
      default:
        throw new Error("Tingkat aktivitas tidak valid. Pilih dari: 'ringan', 'sedang', 'berat'.");
    }

    // Calculate TDEE
    const tdee = Math.round(bmr * activityFactor);
    return tdee;
  };

  // Update calories goal based on TDEE
  useEffect(() => {
    const tdee = calculateTDEE(user.gender, user.age, user.weight, user.height, user.activityLevel);
    setUser(prevUser => ({
      ...prevUser,
      caloriesGoal: 2540 // Set to match the target in the image
    }));
  }, []);

  // Calculate nutrition percentages
  const calculatePercentage = (value: number, max: number) => {
    return Math.min(Math.round((value / max) * 100), 100);
  };

  // Calculate remaining calories
  const remainingCalories = user.caloriesGoal - user.caloriesConsumed;
  const caloriePercentage = Math.min((user.caloriesConsumed / user.caloriesGoal) * 100, 100);
  
  // Calculate the circumference of the progress circle
  const circleRadius = 42;
  const circleCircumference = 2 * Math.PI * circleRadius;
  
  // Calculate the actual progress percentage for the circle
  const progressPercentage = user.caloriesConsumed / user.caloriesGoal;
  const progressValue = progressPercentage * circleCircumference;

  // Calculate weight progress percentage based on goal type
  const weightProgressPercentage = user.weightGoalType === 'loss'
    ? Math.min(
        Math.max(
          (user.weightHistory[0].value - user.weight) / (user.weightHistory[0].value - user.targetWeight) * 100, 
          0
        ), 
        100
      )
    : Math.min(
        Math.max(
          (user.weight - user.weightHistory[0].value) / (user.targetWeight - user.weightHistory[0].value) * 100, 
          0
        ), 
        100
      );
  
  // Determine if weight goal is achieved
  const isWeightGoalAchieved = user.weightGoalType === 'loss' 
    ? user.weight <= user.targetWeight 
    : user.weight >= user.targetWeight;
  
  // Calculate weight progress for circle
  const weightProgressValue = (weightProgressPercentage / 100) * circleCircumference;

  // Create a ProgressCircle component for reuse
  const ProgressCircle = ({ 
    value, 
    max, 
    progressValue, 
    label, 
    unit,
    color = "#53C2C6" 
  }: {
    value: number;
    max: number;
    progressValue: number;
    label: string;
    unit: string;
    color?: string;
  }) => (
    <div className="relative flex justify-center items-center w-48 h-48">
      {/* Background circle */}
      <div className="absolute inset-0 bg-white rounded-full"></div>
      
      {/* Progress circle - using SVG for rounded progress */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {/* Background track */}
          <circle 
            cx="50" 
            cy="50" 
            r="42" 
            fill="none" 
            stroke="#E6F7F8" 
            strokeWidth="14"
          />
          
          {/* Progress arc with rounded ends - full circle when value >= max */}
          {value >= max ? (
            // Full circle when over target
            <circle 
              cx="50" 
              cy="50" 
              r="42" 
              fill="none" 
              stroke={color} 
              strokeWidth="14"
              strokeLinecap="round"
              className="progress-circle-shadow"
            />
          ) : (
            // Partial circle based on percentage
            <circle 
              cx="50" 
              cy="50" 
              r="42" 
              fill="none" 
              stroke={color} 
              strokeWidth="14"
              strokeDasharray={`${progressValue} ${circleCircumference}`}
              strokeDashoffset={circleCircumference * 0.25}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="progress-circle-shadow"
            />
          )}
        </svg>
        <div className="absolute inset-0 border-2 border-black rounded-full"></div>
      </div>
      
      {/* Center circle with content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-36 h-36 bg-white rounded-full border-2 border-black shadow-md">
        <span className="text-4xl font-bold">{value}</span>
        <span className="text-sm text-textGray">{unit}</span>
      </div>
    </div>
  );

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
    <div className="w-full relative pb-20">
      <style jsx>{`
        .progress-circle-shadow {
          filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2));
        }
      `}</style>
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
                <ProgressCircle 
                  value={user.caloriesConsumed} 
                  max={user.caloriesGoal} 
                  progressValue={progressValue}
                  label="Kalori"
                  unit="kcal"
                  color="#53C2C6"
                />
                
                <div className="mt-4 text-center w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Dimakan</span>
                    <span className="text-sm font-medium">Target</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full border-2 border-black overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${progressPercentage * 100}%`,
                        borderRadius: '9999px'
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-bold">{user.caloriesConsumed} kcal</span>
                    <span className="text-sm font-bold">{user.caloriesGoal} kcal</span>
                  </div>
                  <p className="text-sm text-textGray mt-2">
                    {remainingCalories > 0 
                      ? `Kamu masih bisa makan ${remainingCalories} kalori lagi hari ini` 
                      : `Kamu sudah melebihi ${Math.abs(remainingCalories)} kalori dari target harian`}
                  </p>
                  <p className="font-semibold mt-1 text-sm">
                    {remainingCalories > 0 
                      ? `${Math.round(remainingCalories / 100) * 100} kalori ≈ ${Math.round(remainingCalories / 250)} porsi makanan sedang` 
                      : 'Sebaiknya kurangi asupan kalori besok'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Nutrition Cards Grid */}
            <div className="grid grid-cols-3 gap-3 w-full animate-fade-in-slide-up">
              {/* Carbs Card */}
              <div className="bg-green-100 p-3 rounded-xl border-2 border-black shadow-neobrutalism-sm">
                <p className="text-sm text-textGray mb-1">Carbs</p>
                <div className="flex items-end mb-1">
                  <span className="text-xl font-bold">{nutritionData.carbs.value}</span>
                  <span className="text-xs ml-1">/ {nutritionData.carbs.max}{nutritionData.carbs.unit}</span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${calculatePercentage(nutritionData.carbs.value, nutritionData.carbs.max)}%`,
                      borderRadius: '9999px'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Protein Card */}
              <div className="bg-amber-100 p-3 rounded-xl border-2 border-black shadow-neobrutalism-sm">
                <p className="text-sm text-textGray mb-1">Protein</p>
                <div className="flex items-end mb-1">
                  <span className="text-xl font-bold">{nutritionData.protein.value}</span>
                  <span className="text-xs ml-1">/ {nutritionData.protein.max}{nutritionData.protein.unit}</span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${calculatePercentage(nutritionData.protein.value, nutritionData.protein.max)}%`,
                      borderRadius: '9999px'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Fat Card */}
              <div className="bg-purple-100 p-3 rounded-xl border-2 border-black shadow-neobrutalism-sm">
                <p className="text-sm text-textGray mb-1">Fat</p>
                <div className="flex items-end mb-1">
                  <span className="text-xl font-bold">{nutritionData.fat.value}</span>
                  <span className="text-xs ml-1">/ {nutritionData.fat.max}{nutritionData.fat.unit}</span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{
                      width: `${calculatePercentage(nutritionData.fat.value, nutritionData.fat.max)}%`,
                      borderRadius: '9999px'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Weight Tab Content */}
          <TabsContent value="weight" className="flex flex-col gap-4">
            {/* Weight Tracking Card */}
            <div className="relative bg-white rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up p-5">
              <div className="flex flex-col items-center">
                {/* Progress circle for weight */}
                <div className="relative flex justify-center items-center w-48 h-48">
                  {/* Background circle */}
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  
                  {/* Progress circle - using SVG for rounded progress */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      {/* Background track */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="42" 
                        fill="none" 
                        stroke="#E6F7F8" 
                        strokeWidth="14"
                      />
                      
                      {/* Progress arc with rounded ends */}
                      {isWeightGoalAchieved ? (
                        // Full circle when goal is achieved
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="42" 
                          fill="none" 
                          stroke="#8B5CF6" 
                          strokeWidth="14"
                          strokeLinecap="round"
                          className="progress-circle-shadow"
                        />
                      ) : (
                        // Partial circle based on percentage
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="42" 
                          fill="none" 
                          stroke="#8B5CF6" 
                          strokeWidth="14"
                          strokeDasharray={`${weightProgressValue} ${circleCircumference}`}
                          strokeDashoffset={circleCircumference * 0.25}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                          className="progress-circle-shadow"
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 border-2 border-black rounded-full"></div>
                  </div>
                  
                  {/* Center circle with content */}
                  <div className="relative z-20 flex flex-col items-center justify-center w-36 h-36 bg-white rounded-full border-2 border-black shadow-md">
                    <span className="text-4xl font-bold">{user.weight}</span>
                    <span className="text-sm text-textGray">kg</span>
                  </div>
                </div>
                
                <div className="mt-4 text-center w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Sekarang</span>
                    <span className="text-sm font-medium">Target</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full border-2 border-black overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${weightProgressPercentage}%`,
                        borderRadius: '9999px'
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-bold">{user.weight} kg</span>
                    <span className="text-sm font-bold">{user.targetWeight} kg</span>
                  </div>
                  <p className="text-sm text-textGray mt-2">
                    {!isWeightGoalAchieved
                      ? user.weightGoalType === 'loss'
                        ? `Kamu perlu menurunkan ${(user.weight - user.targetWeight).toFixed(1)} kg lagi`
                        : `Kamu perlu menaikkan ${(user.targetWeight - user.weight).toFixed(1)} kg lagi`
                      : `Kamu sudah mencapai target berat badan!`}
                  </p>
                  <p className="font-semibold mt-1 text-sm">
                    {!isWeightGoalAchieved
                      ? user.weightGoalType === 'loss'
                        ? `Turun ${(user.weightHistory[0].value - user.weight).toFixed(1)} kg dari berat awal`
                        : `Naik ${(user.weight - user.weightHistory[0].value).toFixed(1)} kg dari berat awal`
                      : 'Pertahankan berat badan idealmu!'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Weight History Card */}
            <div className="bg-white rounded-xl border-2 border-black p-4 shadow-neobrutalism animate-fade-in-slide-up">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={18} />
                <h3 className="text-lg font-bold">Riwayat Berat Badan</h3>
              </div>
              <div className="flex flex-col gap-3">
                {user.weightHistory.map((entry, index) => (
                  <div key={entry.date} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-semibold">{new Date(entry.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{entry.value} kg</p>
                      {index > 0 && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          entry.value < user.weightHistory[index-1].value 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {entry.value < user.weightHistory[index-1].value 
                            ? `-${(user.weightHistory[index-1].value - entry.value).toFixed(1)}` 
                            : `+${(entry.value - user.weightHistory[index-1].value).toFixed(1)}`}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Streak Section - Redesigned */}
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
            {user.dailyCheckins.map((day) => (
              <div key={day.day} className="flex flex-col items-center">
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
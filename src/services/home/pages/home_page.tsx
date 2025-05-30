import React from 'react';
import AppMobileLayout from '@/layout/app_mobile_layout';
import UserProfile from '../components/user_profile';
import CalorieChart from '../components/calorie_chart';
import BMIStats from '../components/BMI_stats';
import MenuGrid from '../components/menu_grid';
import Head from 'next/head';
import type { Metadata } from 'next';
import { getDetailUser, getUserData } from '@/services/profile/api/getUser';
import Image from 'next/image';
import { Crown } from 'lucide-react';
import LinkAPP from '@/components/util/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Import components from v2
import CalorieRing from '../components/CalorieRing';
import MacroNutrientCards from '../components/MacroNutrientCards';
import WeightTracker from '../components/WeightTracker';
import { fetchHomePageData } from '../data/homeApi';
import { getDummyNutritionData } from '@/services/nutrition/data/user-nutrition';

export const metadataHome: Metadata = {
  title: 'Home | NutriPlate',
  description: 'Homepage NutriPlate app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Home | NutriPlate',
    description: 'Homepage NutriPlate app',
  }
}

interface Props {
  user?: {
    name: string;
    isPro?: boolean;
    points?: number;
  };
  healthData?: {
    bmi: number;
    weight: number;
    height: number;
    healthScore: number;
  };
}

export default async function Home({
  healthData = {
    bmi: 7.8,
    weight: 48,
    height: 170,
    healthScore: 20,
  },
}: Props) {
  const user = (await getDetailUser());
  const isPro = Object.values(user?.subscriptionFeatures ?? {}).some(Boolean);
  
  // Fetch nutritional and user data for calorie and weight tracking components
  const homeData = await fetchHomePageData();

  // console.log(homeData);
  
  return (
    <AppMobileLayout>
      <Head  >
        <title>Home | NutriPlate</title>
      </Head>
      <div className="w-full relative flex flex-col outfit-font pb-20">
        
        
        <div className="relative z-10">
          <UserProfile
            name={user?.name || 'No Data'}
            profile_picture={user?.profile_picture}
            isPro={isPro}
            points={10}
            bmi={user?.bmi}
          />
        </div>
        
        {/* Tabs for Calorie and Weight tracking */}
        <div className="relative z-20 px-4 mt-4">
          <Tabs defaultValue="calories" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="calories">Kalori</TabsTrigger>
              <TabsTrigger value="weight">Berat Badan</TabsTrigger>
            </TabsList>
              
            {/* Calories Tab Content */}
            <TabsContent value="calories" className="flex flex-col gap-4">
              {/* Calorie Tracking Card */}
              <div className="relative  rounded-xl border-2 border-black shadow-neobrutalism animate-fade-in-slide-up p-5">
                <div className="flex flex-col items-center">
                  <CalorieRing 
                    value={homeData.nutritionData.caloriesConsumed} 
                    max={homeData.nutritionData.caloriesGoal} 
                  />
                    
                  {/* Nutrition Cards Grid */}
                  <MacroNutrientCards nutritionData={homeData.nutritionData} />
                </div>
              </div>
            </TabsContent>
            
            {/* Weight Tab Content */}
            <TabsContent value="weight" className="flex flex-col gap-4">
              <WeightTracker 
                user={homeData.userData} 
                isLoading={false} 
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="relative z-20 mt-4">
          <CalorieChart />
        </div>
        <MenuGrid />
      </div>
    </AppMobileLayout>
  );
}

import React from 'react';
import AppMobileLayout from '@/layout/app_mobile_layout';
import UserProfile from '../components/user_profile';
import CalorieChart from '../components/calorie_chart';
import BMIStats from '../components/BMI_stats';
import MenuGrid from '../components/menu_grid';
import Head from 'next/head';
import type { Metadata } from 'next';

export const metadataHome: Metadata = {
  title: 'Home | NutriBox',
  description: 'Homepage nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Home | NutriBox',
    description: 'Homepage nutribox app',
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

export default function Home({
  user = { name: 'Murdi' },
  healthData = {
    bmi: 7.8,
    weight: 48,
    height: 170,
    healthScore: 20,
  },
}: Props) {
  return (
    <AppMobileLayout>
      <Head  >
        <title>Home | Nutribox</title>
      </Head>
      <div className="w-full relative flex flex-col outfit-font pb-20">
        <div className="relative z-10">
          <UserProfile
            name={user.name}
            isPro={user.isPro}
            points={user.points}
          />
        </div>
        <div className="relative z-20">
          <CalorieChart />
        </div>
        <MenuGrid />
      </div>
    </AppMobileLayout>
  );
}

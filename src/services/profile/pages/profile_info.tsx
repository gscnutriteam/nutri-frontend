import React from 'react';
import { Card } from '@/components/ui/card';
import AppMobileLayout from '@/layout/app_mobile_layout';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Head from 'next/head';
import type { Metadata } from 'next';
import { Gender, PhsyicalActivity } from '@/services/auth/store/register_store';

interface ProfileProps {
  user: {
    name: string;
    age: number;
    gender: string;
    physical_activity: string;
    bmi: number;
    medical_history: string;
    profile_picture: string;
    progress: number;
  };
}

export const metadataProfile: Metadata = {
  title: 'Profile | NutriBox',
  description: 'Profile page nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Profile | NutriBox',
    description: 'Profile nutribox app',
  }
}

export default function Profile({ user }: ProfileProps) {
  return (
    <>
      <Head>
        <title>Profile | NutriBox</title>
      </Head>
      <AppMobileLayout>
        <div className="">
          <div className="max-w-7xl mx-auto pb-20">
            <div className="relative">
              {/* Profile Header Background */}
              <div className="h-48  relative ">
                
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover rounded-b-xl"
                    src={user.profile_picture}
                    alt="People working on laptops"
                  />
                </div>
                <div className="absolute rounded-b-xl inset-0 bg-teal-600 opacity-25"></div>
              </div>

              {/* Profile Picture */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-12  px-8 py-6">
              <div className="flex flex-col justify-start items-center mb-6">
                <div>
                  <h2 className="text-2xl text-center font-semibold">
                    {user.name}
                  </h2>
                  <p className="text-gray-600">
                    {user.gender == Gender.male ? "Laki-Laki" : "Perempuan"} | {user.age} tahun
                  </p>
                </div>
                <div className="flex items-center w-full justify-center">
                  <Progress value={user.progress} className="w-1/2" />
                  <span className="ml-2 text-black">{user.progress}</span>
                  <Star className="mx-2 fill-yellow-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary relative rounded-lg p-4 pt-6 pb-2 border-2 border-black">
                  <div className="bg-white absolute -top-4 -left-[2px] rounded-t-lg rounded-br-lg p-1 px-2 border-2 border-black">
                    <p className=" font-medium text-black text-center">
                      Aktivitas Fisik
                    </p>
                  </div>
                  <p className="text-lg font-medium text-white text-center">
                    {user.physical_activity == PhsyicalActivity.high ? "Tinggi" : user.physical_activity == PhsyicalActivity.moderate ? "Sedang" : "Rendah"}
                  </p>
                </div>
                <div className="bg-primary relative rounded-lg p-4 pt-6 pb-2 border-2 border-black">
                  <div className="bg-white absolute -top-4 -right-[2px] rounded-t-lg rounded-bl-lg p-1 px-2 border-2 border-black">
                    <p className=" font-medium text-black text-center">
                      Rata Rata BMI
                    </p>
                  </div>
                  <div className='flex w-full gap-2 items-center justify-center'>
                  <p className="text-lg font-medium text-white text-center">
                    {user.bmi}
                  </p>
                  <Badge className='py-1 rounded-full' >
                    {user.bmi < 18.5 ? "Kurus" : user.bmi < 24.9 ? "Normal" : user.bmi < 29.9 ? "Gemuk" : "Obesitas"}
                  </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-main relative rounded-lg p-4 pt-6 pb-2 border-2 border-black">
                  <div className="bg-white absolute -top-4 -left-[2px] rounded-t-lg rounded-br-lg p-1 px-2 border-2 border-black">
                    <p className=" font-medium text-black text-center">
                      Riwayat Penyakit
                    </p>
                  </div>
                  <p className="text-lg font-medium text-black text-start">
                    {user.medical_history}
                  </p>
                </div>
            </div>
          </div>
        </div>
      </AppMobileLayout>
    </>
  );
}

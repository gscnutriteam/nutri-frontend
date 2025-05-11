"use client"
import { Check, Crown, LucideUser, Star, User, User2 } from 'lucide-react';
import type React from 'react';
import BMIStats from './BMI_stats';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getBMIStatus } from '@/services/info_kesehatan/util/util';
import { trimString } from '@/services/profile/util/util';
import LinkAPP from '@/components/util/link';
import { getDetailUser, getUserData } from '@/services/profile/api/getUser';
import { isUserPro, useUser } from '@/services/auth/util/useUser';
import Image from 'next/image';

interface UserProfileProps {
  name: string;
  isPro?: boolean;
  points?: number;
  bmi?: number;
  weight?: number;
  height?: number;
  healthScore?: number;
  profile_picture?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  isPro = true,
  points = 0,
  bmi = 0,
  weight = 0,
  height = 0, 
  healthScore = 0,
  profile_picture = '',
}) => {
  // Don't override the prop value here - causes hydration mismatch
  const userIsPro = isPro;
  return (
    <div className="flex flex-col relative w-full" >
      {/* <img src="/assets/img/home-pattern.png" className="w-full absolute -z-0 top-0 left-0 h-full object-cover" alt="pattern" /> */}
      {/* <div className="flex items-center justify-between z-10  p-4">
        <div className="flex items-center gap-2 bg-white py-1 px-2 border-2 border-black rounded-full">
          <span className="text-lg">
            <User className="fill-black" />
          </span>
          <span className="font-medium">{trimString(name, 20)}</span>
        </div>
        <div className="flex items-center gap-4 ">
          {userIsPro ? (<>
            <LinkAPP href='/app/premium' className="cursor-pointer flex items-center gap-2 justify-center bg-gradient-to-r from-emerald-500 to-teal-500 py-1.5 px-4 border-2 border-black rounded-full shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white">Pro</span>
                <div className="bg-white rounded-full p-0.5 flex items-center justify-center">
                  <Check className="size-3.5 text-emerald-600" strokeWidth={3} />
                </div>
              </div>
            </LinkAPP>
          </>) : (<>
          <LinkAPP href='/app/premium' className="flex items-center bg-white py-1 px-3 border-2 border-black rounded-full">
            <span>Try</span> 
            <span className="font-medium ml-1">Pro</span>
          </LinkAPP>
          </>)}
          <div className="flex items-center gap-1 bg-white py-1 px-3 border-2 border-black rounded-full">
            <span>
              <Star className="size-4 fill-[#E6C64F]" />
            </span>
            <span>{points}</span>
          </div>
        </div>
      </div> */}
      {/* Header with user profile */}
      <div className="flex justify-between items-center mb-2 p-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-primary shadow-neobrutalism-sm">
              {profile_picture ? (
                <Image src={profile_picture} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div>
              <p className="text-lg font-bold line-clamp-1">Halo, {name || 'No Data'} !</p>
              <p className="text-sm text-textGray">{new Date().toLocaleDateString('id-ID', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          
          {/* Premium Badge */}
          <div className="flex items-center">
            {isPro ? (
              <LinkAPP href="/app/premium" className="flex items-center gap-1 px-3 py-1 bg-secondaryLight rounded-full border-2 border-black shadow-neobrutalism-sm">
                <Crown size={16} className='fill-black' />
                <span className="font-bold text-sm">PRO</span>
              </LinkAPP>
            ) : (
              <LinkAPP href="/app/premium" className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full border-2 border-black shadow-neobrutalism-sm">
                <Crown size={16}  />
                <span className="font-bold text-sm text-gray-500">FREE</span>
              </LinkAPP>
            )}
          </div>
        </div>
      <div className="flex w-full px-4 items-center z-10">
        <img src="/assets/img/home.png" className="w-1/2" alt="avatar" />
        <div className="w-1/2 flex flex-col">
          <p className='' >BMI</p>
          <div className='flex w-full items-center gap-2 my-2'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-3xl font-bold'>{bmi}</h1>
              <Badge variant="default">{getBMIStatus(bmi)[0]}</Badge>
            </div>
            <div>
              <p>Berat: {weight}kg</p>
              <p>Tinggi: {height}cm</p>
            </div>
          </div>
          <div>
            <p className='text-sm'>Poin Hidup Sehat</p>
            <div className='flex items-center gap-2'>
            <Progress value={points} />
            <p>{points}</p>
            <Star className="size-6 fill-[#E6C64F]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;

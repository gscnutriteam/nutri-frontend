import { LucideUser, Star, User, User2 } from 'lucide-react';
import React from 'react';
import BMIStats from './BMI_stats';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface UserProfileProps {
  name: string;
  isPro?: boolean;
  points?: number;
  bmi?: number;
  weight?: number;
  height?: number;
  healthScore?: number;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  isPro = true,
  points = 0,
  bmi = 0,
  weight = 0,
  height = 0,
  healthScore = 0,
}) => {
  return (
    <div className="flex flex-col relative w-full" style={{ background: 'linear-gradient(180deg, #D0FBFD 0%, rgba(83, 194, 198, 0.00) 100%)' }}>
      <img src="/assets/img/home-pattern.png" className="w-full absolute -z-0 top-0 left-0 h-full object-cover" alt="pattern" />
      <div className="flex items-center justify-between z-10  p-4">
        <div className="flex items-center gap-2 bg-white py-1 px-2 border-2 border-black rounded-full">
          <span className="text-lg">
            <User className="fill-black" />
          </span>
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex items-center gap-4 ">
          <div className="flex items-center bg-white py-1 px-3 border-2 border-black rounded-full">
            <span>Try</span>
            {isPro && <span className="font-medium ml-1">Pro</span>}
          </div>
          <div className="flex items-center gap-1 bg-white py-1 px-3 border-2 border-black rounded-full">
            <span>
              <Star className="size-4 fill-[#E6C64F]" />
            </span>
            <span>{points}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full px-4 items-center z-10">
        <img src="/assets/img/home.png" className="w-1/2" alt="avatar" />
        <div className="w-1/2 flex flex-col">
          <p className='' >BMI</p>
          <div className='flex w-full items-center gap-2 my-2'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-3xl font-bold'>7.8</h1>
              <Badge variant="default">Normal</Badge>
            </div>
            <div>
              <p>Berat: 48kg</p>
              <p>Tinggi: 160cm</p>
            </div>
          </div>
          <div>
            <p className='text-sm'>Poin Hidup Sehat</p>
            <div className='flex items-center gap-2'>
            <Progress value={50} />
            <p>20</p>
            <Star className="size-6 fill-[#E6C64F]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;

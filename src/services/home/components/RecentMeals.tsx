'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Utensils, ChevronRight } from 'lucide-react';
import { Meal } from '../types/homeTypes';

interface RecentMealsProps {
  meals: Meal[];
}

const RecentMeals = ({ meals }: RecentMealsProps) => {
  return (
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
        {meals.map((meal, index) => (
          <div key={`meal-${meal.id}-${index}`} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
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
  );
};

export default RecentMeals; 
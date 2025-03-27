"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Recipe } from "../api/recipeService";

interface DaySelectorProps {
  recipes: Recipe[];
  selectedDayIndex: number;
  setSelectedDayIndex: Dispatch<SetStateAction<number>>;
  weekDates: Array<{day: string, date: string, isToday: boolean, dayCode: string}>;
  setWeekDates: Dispatch<SetStateAction<Array<{day: string, date: string, isToday: boolean, dayCode: string}>>>;
}

export default function DaySelector({ 
  recipes, 
  selectedDayIndex, 
  setSelectedDayIndex,
  weekDates,
  setWeekDates
}: DaySelectorProps) {
  const [isLoading, setIsLoading] = useState(true);

  // All days of the week - Indonesian names and their corresponding codes
  const dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const dayEnums = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  // Initialize the dates and set the current day index on component mount
  useEffect(() => {
    // Only generate dates if they don't exist yet
    if (weekDates.length === 0) {
      try {
        // Generate the dates starting from today
        const dates = getDatesFromToday();
        setWeekDates(dates);
      } catch (error) {
        // Handle error silently
      }
    }
    
    setIsLoading(false);
  }, [weekDates.length, setWeekDates]);
  
  // Generate 5 days starting from today
  const getDatesFromToday = () => {
    const today = new Date();
    const dates = [];
    
    // Month names in Indonesian
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    
    // Generate 5 consecutive days starting from today
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Format the date: day and month
      const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}`;
      
      // JavaScript day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const jsDay = date.getDay();
      
      // Convert JS day to our array indexes (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
      // This calculation ensures Sunday (0 in JS) maps to index 6 in our array
      const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
      
      // Check if this date is today
      const isToday = i === 0; // First date is always today
      
      dates.push({
        day: dayNames[dayIndex],
        date: formattedDate,
        isToday: isToday,
        dayCode: dayEnums[dayIndex]
      });
    }
    
    return dates;
  };

  if (isLoading || weekDates.length === 0) {
    return <DaySelectorSkeleton />;
  }

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">Pilih Hari:</h3>
        <Card variant={"default"} className="px-3 py-1 transform translate-x-1 translate-y-1">
          <p className="text-sm font-medium">
            {weekDates[selectedDayIndex]?.isToday ? "Hari ini" : weekDates[selectedDayIndex]?.day}
          </p>
        </Card>
      </div>
      <div className="flex overflow-x-auto py-1 px-2 gap-2 no-scrollbar">
        {weekDates.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDayIndex(index)}
            className={`flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-base w-[90px] h-[90px] border-2 border-border transition-all ${
              selectedDayIndex === index
                ? "bg-main transform translate-x-[-2px] translate-y-[-2px] shadow-shadow"
                : "bg-bw hover:bg-gray-100 transform hover:translate-x-[-1px] hover:translate-y-[-1px]"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-xs font-bold">{date.day}</span>
              <span className="text-base font-extrabold">{date.date}</span>
              {date.isToday ? (
                <span className="text-xs font-bold px-2 py-0.5 bg-green-200 border-2 border-green-800 text-green-800 rounded-full transform translate-x-[1px] translate-y-[1px]">
                  Hari ini
                </span>
              ) : (
               <></>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Skeleton UI for the day selector
function DaySelectorSkeleton() {
  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex overflow-x-auto py-1 px-2 gap-2 no-scrollbar">
        {[...Array(5)].map((_, index) => (
          <Skeleton 
            key={index}
            className="flex-shrink-0 w-[90px] h-[90px] rounded-base"
          />
        ))}
      </div>
    </div>
  );
} 
"use client";

import { useState } from "react";
import DaySelector from "./day_selector";
import CategoryGrid from "./category_grid";
import { Recipe } from "../api/recipeService";

interface ResepMakananContentProps {
  recipes: Recipe[];
}

// Client component wrapper to manage shared state
export default function ResepMakananContent({ recipes }: ResepMakananContentProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [weekDates, setWeekDates] = useState<Array<{day: string, date: string, isToday: boolean, dayCode: string}>>([]);

  return (
    <>
      {/* Pass state and state setters to child components */}
      <DaySelector 
        recipes={recipes} 
        selectedDayIndex={selectedDayIndex}
        setSelectedDayIndex={setSelectedDayIndex}
        weekDates={weekDates}
        setWeekDates={setWeekDates}
      />
      
      <CategoryGrid 
        recipes={recipes} 
        selectedDayIndex={selectedDayIndex}
        weekDates={weekDates}
      />
    </>
  );
} 
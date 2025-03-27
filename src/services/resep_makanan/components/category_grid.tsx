"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Recipe } from "../api/recipeService";
import { formatDay, formatLabel } from "../utils/formatUtils";

interface CategoryGridProps {
  recipes: Recipe[];
  selectedDayIndex: number;
  weekDates: Array<{day: string, date: string, isToday: boolean, dayCode: string}>;
}

export default function CategoryGrid({ 
  recipes, 
  selectedDayIndex,
  weekDates 
}: CategoryGridProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // All days of the week - Indonesian names and their corresponding codes
  const dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const dayEnums = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const mealTypes = [
    { title: "Makan Pagi", label: "breakfast", icon: "☀️", variant: "default" as const },
    { title: "Makan Siang", label: "lunch", icon: "🌤️", variant: "primary" as const },
    { title: "Makan Malam", label: "dinner", icon: "🌙", variant: "neutral" as const }
  ];

  // Update filtered recipes when dates or selected day changes
  useEffect(() => {
    if (weekDates.length === 0) {
      return; // Don't do anything if weekDates is empty
    }
    
    setIsLoading(true);
    
    try {
      if (recipes.length > 0 && weekDates.length > 0 && selectedDayIndex >= 0) {
        const dayCode = weekDates[selectedDayIndex]?.dayCode || dayEnums[0];
        filterRecipesForDay(recipes, dayCode);
      }
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [selectedDayIndex, recipes, weekDates]);
  
  // Filter recipes for a specific day
  const filterRecipesForDay = (recipesList: Recipe[], dayCode: string) => {
    const filtered = recipesList.filter(recipe => recipe.day.toLowerCase() === dayCode);
    setFilteredRecipes(filtered);
  };

  // Get the selected day enum
  const getSelectedDayEnum = () => {
    if (weekDates.length === 0 || selectedDayIndex < 0) return "monday";
    return weekDates[selectedDayIndex]?.dayCode || "monday";
  };

  if (isLoading || weekDates.length === 0) {
    return <CategoryCardsSkeleton />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-2"
    >
      <div className="grid grid-cols-2 gap-4">
        {mealTypes.map((meal, index) => {
          // Filter recipes for this meal type on the selected day
          const dayCode = getSelectedDayEnum();
          const recipesForThisType = filteredRecipes.filter(
            r => r.label.toLowerCase() === meal.label.toLowerCase()
          );
          const recipeCount = recipesForThisType.length;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card variant={meal.variant} className="transform translate-x-1 translate-y-1 hover:translate-x-0 hover:translate-y-0 transition-transform">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="text-3xl mb-2">{meal.icon}</div>
                  <h3 className="font-extrabold text-center">{meal.title}</h3>
                  <p className="text-xs font-medium mb-1">
                    {weekDates[selectedDayIndex]?.isToday ? "Hari ini" : weekDates[selectedDayIndex]?.day},
                    {" " + weekDates[selectedDayIndex]?.date}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">{recipeCount} resep</p>
                  <Link 
                    href={`/app/resep-makanan/kategori?type=${meal.label}&day=${dayCode}`} 
                    className="w-full"
                  >
                    <Button variant="default" size="sm" className="w-full font-bold">
                      Lihat Resep
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card variant="default" className="transform translate-x-1 translate-y-1 hover:translate-x-0 hover:translate-y-0 transition-transform">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-3xl mb-2">🍲</div>
              <h3 className="font-extrabold text-center">Semua Resep</h3>
              <p className="text-xs font-medium mb-1">
                {weekDates[selectedDayIndex]?.isToday ? "Hari ini" : weekDates[selectedDayIndex]?.day},
                {" " + weekDates[selectedDayIndex]?.date}
              </p>
              <p className="text-xs text-gray-500 mb-3">{filteredRecipes.length} resep</p>
              <Link href={`/app/resep-makanan/kategori?type=all&day=${getSelectedDayEnum()}`} className="w-full">
                <Button variant="default" size="sm" className="w-full font-bold">
                  Lihat Semua
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Skeleton UI for the category cards
function CategoryCardsSkeleton() {
  return (
    <div className="mt-2">
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, index) => (
          <Skeleton 
            key={index}
            className="rounded-lg h-[180px]"
          />
        ))}
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FlipCard } from "@/components/ui/flip-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Recipe } from "../api/recipeService";
import { formatDay, formatLabel } from "../utils/formatUtils";

interface CategoryFilterProps {
  recipes: Recipe[];
  initialType: string;
  initialDay: string;
}

export default function CategoryFilter({ recipes, initialType, initialDay }: CategoryFilterProps) {
  const [title, setTitle] = useState("Semua Resep");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState(initialType);
  const [day, setDay] = useState(initialDay);
  
  // All days of the week
  const validDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  useEffect(() => {
    try {
      // Make sure day is valid
      const normalizedDay = day.toLowerCase();
      const validDay = validDays.includes(normalizedDay) ? normalizedDay : "monday";
      
      // Filter recipes by day
      let dayFiltered = recipes.filter(recipe => 
        recipe.day.toLowerCase() === validDay
      );
      
      // Further filter by type if not 'all'
      if (type !== 'all') {
        dayFiltered = dayFiltered.filter(recipe => 
          recipe.label.toLowerCase() === type.toLowerCase()
        );
      }
      
      setFilteredRecipes(dayFiltered);
      
      // Set title based on type
      if (type !== 'all') {
        setTitle(formatLabel(type));
      } else {
        setTitle("Semua Resep");
      }
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [type, day, recipes]);
  
  if (isLoading) {
    return <RecipesGridSkeleton />;
  }
  
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <Card className="px-3 py-1 transform translate-x-1 translate-y-1">
          <p className="text-sm font-medium">{formatDay(day)}</p>
        </Card>
      </div>
      
      <p className="text-textGray mb-4">
        {type === 'all' 
          ? `Resep makanan untuk hari ${formatDay(day)}` 
          : `Resep ${title.toLowerCase()} untuk hari ${formatDay(day)}`}
      </p>
      
      {filteredRecipes.length > 0 ? (
        <RecipesGrid recipes={filteredRecipes} />
      ) : (
        <EmptyState day={day} type={type} />
      )}
    </div>
  );
}

// Grid of recipe cards with animation
function RecipesGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
        >
          <Link href={`/app/resep-makanan/detail/${recipe.slug}`}>
            <FlipCard
              title={recipe.name}
              frontImage={recipe.image}
              description={recipe.description.substring(0, 100) + (recipe.description.length > 100 ? '...' : '')}
              buttonText="Lihat Resep"
              about={formatLabel(recipe.label)}
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// Skeleton loading state
function RecipesGridSkeleton() {
  return (
    <div className="mt-5">
      <Skeleton className="h-8 w-40 mb-2" />
      <Skeleton className="h-4 w-80 mb-4" />
      
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, index) => (
          <Skeleton 
            key={index}
            className="h-[220px] rounded-base"
          />
        ))}
      </div>
    </div>
  );
}

// Empty state when no recipes are found
function EmptyState({ day, type }: { day: string, type: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center py-12 px-4"
    >
      <div className="text-4xl mb-4">🍽️</div>
      <h3 className="text-xl font-medium mb-2">Tidak ada resep</h3>
      <p className="text-textGray">
        {type === 'all' 
          ? `Belum ada resep untuk hari ${formatDay(day)}` 
          : `Belum ada resep ${formatLabel(type).toLowerCase()} untuk hari ${formatDay(day)}`}
      </p>
      <Link href="/app/resep-makanan" className="mt-4 inline-block underline text-primary">
        Kembali ke halaman utama
      </Link>
    </motion.div>
  );
} 
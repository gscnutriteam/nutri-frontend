"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import { Recipe } from "../api/recipeService";
import { formatDay, formatLabel } from "../utils/formatUtils";
import { Clock, Utensils, ListChecks } from "lucide-react";

interface RecipeDetailContentProps {
  recipe: Recipe;
  readingTime: number;
}

export default function RecipeDetailContent({ recipe, readingTime }: RecipeDetailContentProps) {
  return (
    <div className="pb-8">
      {/* Recipe Image with badges */}
      <div className="relative rounded-base overflow-hidden mt-4">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 bg-main text-black text-xs font-bold rounded-full border-2 border-black transform translate-x-[1px] translate-y-[1px]">
            {formatLabel(recipe.label)}
          </span>
          <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full border-2 border-black transform translate-x-[1px] translate-y-[1px]">
            {formatDay(recipe.day)}
          </span>
        </div>
      </div>
      
      {/* Recipe Title */}
      <h1 className="text-2xl font-extrabold mt-4 mb-2">{recipe.name}</h1>
      
      {/* Meta information */}
      <div className="flex items-center gap-4 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{readingTime} menit</span>
        </div>
        <div className="flex items-center gap-1">
          <Utensils size={16} />
          <span>{formatLabel(recipe.label)}</span>
        </div>
        <div className="flex items-center gap-1">
          <ListChecks size={16} />
          <span>{formatDay(recipe.day)}</span>
        </div>
      </div>
      
      {/* Recipe Description */}
      <div className="mb-6 text-gray-700">
        {recipe.description}
      </div>
      
      {/* Tabs for Ingredients and Instructions */}
      <RecipeTabs 
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
      />
    </div>
  );
}

interface RecipeTabsProps {
  ingredients: string;
  instructions: string;
}

function RecipeTabs({ ingredients, instructions }: RecipeTabsProps) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  
  return (
    <div>
      {/* Tab buttons */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`flex-1 py-3 font-bold text-center relative ${
            activeTab === 'ingredients' ? 'text-black' : 'text-gray-500'
          }`}
        >
          Bahan-bahan
          {activeTab === 'ingredients' && (
            <motion.div 
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-1 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('instructions')}
          className={`flex-1 py-3 font-bold text-center relative ${
            activeTab === 'instructions' ? 'text-black' : 'text-gray-500'
          }`}
        >
          Instruksi
          {activeTab === 'instructions' && (
            <motion.div 
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-1 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </button>
      </div>
      
      {/* Tab content */}
      <div className="min-h-[300px]">
        {activeTab === 'ingredients' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 bg-bw border-2 border-border transform translate-x-1 translate-y-1">
              <MarkdownRenderer>
                {ingredients}
              </MarkdownRenderer>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 bg-bw border-2 border-border transform translate-x-1 translate-y-1">
              <MarkdownRenderer>
                {instructions}
              </MarkdownRenderer>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
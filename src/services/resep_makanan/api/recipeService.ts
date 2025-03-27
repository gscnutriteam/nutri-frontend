"use server";

import { apiClient } from "@/lib/api_instance";

// Types for recipe data
export interface Recipe {
  day: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  description: string;
  id: string;
  image: string;
  ingredients: string;
  instructions: string;
  label: 'breakfast' | 'lunch' | 'dinner';
  name: string;
  slug: string;
  user_id: string;
}

export interface RecipeResponse {
  data: Recipe | Recipe[];
  message: string;
  status: string;
}

// Get all recipes
export async function getRecipes(): Promise<Recipe[]> {
  try {
    const response = await apiClient("/recipes", "GET");
    
    // Handle response with type assertion
    const responseData = response as any;
    
    // Check if response.data is an array directly or nested
    let data: Recipe[] = [];
    
    if (responseData.data) {
      if (Array.isArray(responseData.data)) {
        data = responseData.data;
      } else if (responseData.data.data && Array.isArray(responseData.data.data)) {
        data = responseData.data.data;
      }
    }
    
    return data;
  } catch (error) {
    console.error('❌ getRecipes error:', error);
    return [];
  }
}

// Get recipe by ID
export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const response = await apiClient(`/recipes/${id}`, "GET");
    
    // Handle response with type assertion
    const responseData = response as any;
    
    // Check if response.data exists
    let recipe: Recipe | null = null;
    
    if (responseData.data) {
      if (responseData.data.data) {
        recipe = responseData.data.data;
      } else {
        recipe = responseData.data;
      }
    }
    
    return recipe;
  } catch (error) {
    console.error(`❌ getRecipeById error for ID ${id}:`, error);
    return null;
  }
}

// Get recipe by slug
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    // First try to get all recipes and filter by slug
    const recipes = await getRecipes();
    const recipe = recipes.find(r => r.slug === slug);
    
    if (recipe) {
      return recipe;
    }
    
    // If not found by slug, try to get by ID in case slug is an ID
    return await getRecipeById(slug);
  } catch (error) {
    console.error(`Error fetching recipe with slug ${slug}:`, error);
    return null;
  }
}

// Get recipes by day
export async function getRecipesByDay(day: string): Promise<Recipe[]> {
  try {
    const recipes = await getRecipes();
    return recipes.filter(recipe => recipe.day.toLowerCase() === day.toLowerCase());
  } catch (error) {
    console.error(`Error fetching recipes for day ${day}:`, error);
    return [];
  }
}

// Get recipes by label (breakfast, lunch, dinner)
export async function getRecipesByLabel(label: string): Promise<Recipe[]> {
  try {
    const recipes = await getRecipes();
    return recipes.filter(recipe => recipe.label.toLowerCase() === label.toLowerCase());
  } catch (error) {
    console.error(`Error fetching recipes for label ${label}:`, error);
    return [];
  }
} 
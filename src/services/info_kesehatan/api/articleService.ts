"use server";

import { apiClient } from "@/lib/api_instance";
import { cache } from 'react';

// Type definitions based on the API documentation
export interface ArticleCategory {
  id: string;
  name: string;
  user_id: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  image: string;
  category_id: string;
  category_name: string;
  published_at: string;
  created_at?: string;
  updated_at?: string;
  user_id: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

/**
 * Get all article categories - cached with React cache
 */
export const getArticleCategories = cache(async (): Promise<ArticleCategory[]> => {
  try {
    const response = await apiClient<null, ApiResponse<ArticleCategory[]>>("/article-categories", "GET");
    
    // Check if response is successful and contains data
    if (response.success && response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('❌ getArticleCategories error:', error);
    return [];
  }
});

/**
 * Get all articles - cached with React cache
 */
export const getArticles = cache(async (): Promise<Article[]> => {
  try {
    const response = await apiClient<null, ApiResponse<Article[]>>("/articles", "GET");
    
    // Check if response is successful and contains data
    if (response.success && response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('❌ getArticles error:', error);
    return [];
  }
});

/**
 * Get articles by category ID - Uses the cache from getArticles
 */
export const getArticlesByCategory = cache(async (categoryId?: string): Promise<Article[]> => {
  // If no category ID is provided, return all articles
  if (!categoryId) {
    return getArticles();
  }
  
  // Get all articles and filter by category
  const articles = await getArticles();
  return articles.filter(article => article.category_id === categoryId);
});

/**
 * Get top articles (first 5) - Uses the cache from getArticles
 */
export const getTopArticles = cache(async (): Promise<Article[]> => {
  const articles = await getArticles();
  return articles.slice(0, 5);
});

/**
 * Get recommended articles (next 5 after top articles) - Uses the cache from getArticles
 */
export const getRecommendedArticles = cache(async (): Promise<Article[]> => {
  const articles = await getArticles();
  return articles.slice(5, 10);
});

/**
 * Get article by ID - cached with React cache
 */
export const getArticleById = cache(async (id: string): Promise<Article | null> => {
  try {
    const response = await apiClient<null, ApiResponse<Article>>(`/articles/${id}`, "GET");
    
    // Check if response is successful and contains data
    if (response.success && response.data && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error(`❌ getArticleById(${id}) error:`, error);
    return null;
  }
});

/**
 * Search articles by title or content - Uses the cache from getArticles
 */
export const searchArticles = cache(async (query: string): Promise<Article[]> => {
  if (!query) return [];
  
  // Since we don't have a direct search endpoint in the API, 
  // fetch all articles and filter them locally
  const articles = await getArticles();
  
  if (articles.length === 0) {
    return [];
  }
  
  // Filter articles that contain the search query in title or content (case insensitive)
  const lowerQuery = query.toLowerCase();
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) || 
    article.content.toLowerCase().includes(lowerQuery)
  );
  
  return filteredArticles;
}); 
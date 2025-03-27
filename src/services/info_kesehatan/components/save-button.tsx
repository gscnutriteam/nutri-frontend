"use client";

import { useState, useEffect } from "react";
import { BookmarkIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SaveButtonProps {
  articleId: string;
  title: string;
  className?: string;
}

// Local storage key for saved articles
const SAVED_ARTICLES_KEY = "nutribox-saved-articles";

interface SavedArticle {
  id: string;
  title: string;
  savedAt: string;
}

export function SaveButton({ articleId, title, className }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  // Check if the article is already saved
  useEffect(() => {
    const savedArticles = getSavedArticles();
    const isAlreadySaved = savedArticles.some(article => article.id === articleId);
    setIsSaved(isAlreadySaved);
  }, [articleId]);
  
  // Get saved articles from local storage
  const getSavedArticles = (): SavedArticle[] => {
    if (typeof window === 'undefined') return [];
    
    const savedArticlesJson = localStorage.getItem(SAVED_ARTICLES_KEY);
    return savedArticlesJson ? JSON.parse(savedArticlesJson) : [];
  };
  
  // Save or unsave an article
  const toggleSave = () => {
    const savedArticles = getSavedArticles();
    
    if (isSaved) {
      // Remove article from saved articles
      const updatedArticles = savedArticles.filter(article => article.id !== articleId);
      localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
      setIsSaved(false);
      toast.success("Artikel dihapus dari simpanan");
    } else {
      // Add article to saved articles
      const articleToSave: SavedArticle = {
        id: articleId,
        title,
        savedAt: new Date().toISOString()
      };
      
      const updatedArticles = [...savedArticles, articleToSave];
      localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
      setIsSaved(true);
      toast.success("Artikel disimpan");
    }
  };
  
  return (
    <button
      onClick={toggleSave}
      className={cn("p-2 rounded-full hover:bg-gray-100 transition-colors", className)}
      aria-label={isSaved ? "Hapus dari simpanan" : "Simpan artikel"}
    >
      <BookmarkIcon 
        size={18} 
        className={cn(
          isSaved ? "fill-current" : "", 
          className || "text-gray-600"
        )} 
      />
    </button>
  );
} 
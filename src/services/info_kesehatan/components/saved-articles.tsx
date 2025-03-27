"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookmarkIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

// Local storage key for saved articles
const SAVED_ARTICLES_KEY = "nutribox-saved-articles";

interface SavedArticle {
  id: string;
  title: string;
  savedAt: string;
}

export function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Load saved articles from local storage
  useEffect(() => {
    const loadSavedArticles = () => {
      if (typeof window === 'undefined') return;
      
      const savedArticlesJson = localStorage.getItem(SAVED_ARTICLES_KEY);
      const articles = savedArticlesJson ? JSON.parse(savedArticlesJson) : [];
      
      // Sort by saved date (newest first)
      articles.sort((a: SavedArticle, b: SavedArticle) => 
        new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
      );
      
      setSavedArticles(articles);
      setIsLoading(false);
    };
    
    loadSavedArticles();
  }, []);
  
  // Remove an article from saved list
  const removeArticle = (id: string) => {
    const updatedArticles = savedArticles.filter(article => article.id !== id);
    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
    setSavedArticles(updatedArticles);
    toast.success("Artikel dihapus dari simpanan");
  };
  
  // Navigate to article
  const viewArticle = (id: string) => {
    router.push(`/app/info-kesehatan/${id}`);
  };
  
  // Clear all saved articles
  const clearAllArticles = () => {
    localStorage.removeItem(SAVED_ARTICLES_KEY);
    setSavedArticles([]);
    toast.success("Semua artikel tersimpan dihapus");
  };
  
  // Format saved date
  const formatSavedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Memuat artikel tersimpan...</p>
      </div>
    );
  }
  
  if (savedArticles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <BookmarkIcon size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Tidak ada artikel tersimpan</h2>
        <p className="text-gray-600 mb-4">Artikel yang Anda simpan akan muncul di sini</p>
        <button
          onClick={() => router.push('/app/info-kesehatan')}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Jelajahi artikel
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Artikel Tersimpan</h2>
        {savedArticles.length > 0 && (
          <button
            onClick={clearAllArticles}
            className="text-sm text-red-500 flex items-center"
          >
            <Trash2Icon size={14} className="mr-1" />
            Hapus Semua
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {savedArticles.map((article) => (
          <div 
            key={article.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 
                className="font-medium text-primary cursor-pointer hover:underline"
                onClick={() => viewArticle(article.id)}
              >
                {article.title}
              </h3>
              <button
                onClick={() => removeArticle(article.id)}
                className="text-gray-400 hover:text-red-500 p-1"
                aria-label="Hapus artikel"
              >
                <Trash2Icon size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Disimpan pada {formatSavedDate(article.savedAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 
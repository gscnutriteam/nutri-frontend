"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArticleCategory } from "../api/articleService";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CategoryFilterProps {
  categories: ArticleCategory[];
  selectedCategoryId?: string;
}

export function CategoryFilter({ categories, selectedCategoryId }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  // Handle filter selection
  const handleCategoryClick = useCallback((categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryId === selectedCategoryId) {
      // If clicking the already selected category, remove the filter
      params.delete("category");
    } else {
      // Otherwise set the new category filter
      params.set("category", categoryId);
    }
    
    // Update the URL with the new params
    router.push(`/app/info-kesehatan/categories?${params.toString()}`);
  }, [router, searchParams, selectedCategoryId]);

  // Scroll the filter container
  const scroll = useCallback((direction: "left" | "right") => {
    if (!containerRef) return;
    
    const scrollAmount = containerWidth * 0.8;
    const newPosition = direction === "left"
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(contentWidth - containerWidth, scrollPosition + scrollAmount);
    
    containerRef.scrollTo({
      left: newPosition,
      behavior: "smooth"
    });
    
    setScrollPosition(newPosition);
  }, [containerRef, containerWidth, contentWidth, scrollPosition]);

  // Update dimensions when components mount or window resizes
  useEffect(() => {
    if (!containerRef || !contentRef) return;
    
    const updateDimensions = () => {
      setContainerWidth(containerRef.offsetWidth);
      setContentWidth(contentRef.scrollWidth);
    };
    
    // Initial measurement
    updateDimensions();
    
    // Listen for resize events
    window.addEventListener("resize", updateDimensions);
    
    // Clean up
    return () => window.removeEventListener("resize", updateDimensions);
  }, [containerRef, contentRef]);

  // Update scroll position when container is scrolled manually
  useEffect(() => {
    if (!containerRef) return;
    
    const handleScroll = () => {
      setScrollPosition(containerRef.scrollLeft);
    };
    
    containerRef.addEventListener("scroll", handleScroll);
    
    return () => containerRef.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef && contentRef && scrollPosition < contentWidth - containerWidth;

  return (
    <div className="relative">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button 
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon size={20} />
        </button>
      )}
      
      {/* Scrollable container */}
      <div 
        ref={setContainerRef}
        className="flex gap-2 overflow-x-auto py-2 px-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div ref={setContentRef} className="flex gap-2 min-w-min">
          {/* All categories chip */}
          <button
            onClick={() => handleCategoryClick("")}
            className={cn(
              "bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
              "hover:bg-gray-200 transition-colors duration-300",
              !selectedCategoryId && "bg-primary text-white hover:bg-primary/90"
            )}
          >
            Semua Kategori
          </button>
          
          {/* Category chips */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                "bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
                "hover:bg-gray-200 transition-colors duration-300",
                selectedCategoryId === category.id && "bg-primary text-white hover:bg-primary/90"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Right scroll button */}
      {canScrollRight && (
        <button 
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1"
          aria-label="Scroll right"
        >
          <ChevronRightIcon size={20} />
        </button>
      )}
    </div>
  );
} 
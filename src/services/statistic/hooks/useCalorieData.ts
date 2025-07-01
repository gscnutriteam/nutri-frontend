import { useEffect, useRef, useState } from "react";
import useGetUserCalories from "../api/getUserCalories";
import type { CardCalorieProps } from "../types/berat";
import type { GetUserCaloriesResponse, UserCalorie } from "../types/calorie";

export const useCalorieData = () => {
  const [calorieData, setCalorieData] = useState<CardCalorieProps[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const resetAndRefetch = async () => {
    setIsLoading(true);
    setPage(1);
    setHasMore(true);
    
    try {
      const response = await useGetUserCalories(1, 10) as GetUserCaloriesResponse | null;
      
      if (!response || !response.results || response.results.length === 0) {
        setHasMore(false);
        setCalorieData([]);
      } else {
        const formattedData = response.results.map((item: UserCalorie) => ({
          id: item.id,
          tanggal: new Date(item.meal_time),
          calorie: item.calories,
          carbs: item.carbs,
          protein: item.protein,
          fat: item.fat,
          title: item.title,
          image: item.meal_image
        }));
        
        setCalorieData(formattedData);
        setPage(2);
      }
    } catch (error) {
      console.error("Failed to fetch calorie data:", error);
      setCalorieData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCalorieData = async () => {
    if (!hasMore) return;
    
    setIsLoading(true);
    try {
      const response = await useGetUserCalories(page, 10) as GetUserCaloriesResponse | null;
      
      if (!response || !response.results || response.results.length === 0) {
        setHasMore(false);
      } else {
        const formattedData = response.results.map((item: UserCalorie) => ({
          id: item.id,
          tanggal: new Date(item.meal_time),
          calorie: item.calories,
          carbs: item.carbs,
          protein: item.protein,
          fat: item.fat,
          title: item.title,
          image: item.meal_image
        }));
        
        setCalorieData((prev) => [...prev, ...formattedData]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to fetch calorie data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalorieData();
  }, []);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchCalorieData();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [calorieData, isLoading, hasMore]);

  return {
    calorieData,
    isLoading,
    hasMore,
    lastItemRef,
    resetAndRefetch
  };
}; 
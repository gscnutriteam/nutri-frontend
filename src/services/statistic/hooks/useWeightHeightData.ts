import { useEffect, useRef, useState } from "react";
import { getWeightHeight, type WeightHeight, type WeightHeightResponse } from "../api/getWeightHeight";
import type { CardBeratProps } from "../types/berat";

// Function to calculate BMI from weight and height
const calculateBMI = (weight: number, height: number): number => {
  // Convert height from cm to m
  const heightInMeters = height / 100;
  // Calculate BMI: weight(kg) / height²(m)
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const useWeightHeightData = () => {
  const [weightHeightData, setWeightHeightData] = useState<CardBeratProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeightHeightData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getWeightHeight() as WeightHeightResponse;
      
      if (!response || !response.data) {
        throw new Error("Failed to fetch weight and height data");
      }
      
      // Map API data to CardBeratProps format
      const formattedData = response.data.map((item: WeightHeight) => ({
        id: item.id,
        tinggi: item.height,
        berat: item.weight,
        bmi: calculateBMI(item.weight, item.height),
        tanggal: new Date(item.recorded_at),
      }));
      
      // Sort by date, most recent first
      formattedData.sort((a: CardBeratProps, b: CardBeratProps) => b.tanggal.getTime() - a.tanggal.getTime());
      
      setWeightHeightData(formattedData);
    } catch (error) {
      console.error("Failed to fetch weight and height data:", error);
      setError("Failed to load data. Please try again.");
      setWeightHeightData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndRefetch = async () => {
    await fetchWeightHeightData();
  };

  useEffect(() => {
    fetchWeightHeightData();
  }, []);

  return {
    weightHeightData,
    isLoading,
    error,
    resetAndRefetch
  };
}; 
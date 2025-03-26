'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWeightHeight, WeightHeight } from "../api/getWeightHeight";
import { getWeightTarget, WeightTarget } from "../api/getWeightTarget";
import { WEIGHT_QUERY_KEYS } from "./useWeightHeightData";

export const useWeightStatistics = () => {
  const queryClient = useQueryClient();
  
  // Fetch current weight with react-query
  const { 
    data: weightHeightData,
    isLoading: weightHeightLoading,
    error: weightHeightError,
  } = useQuery({
    queryKey: [WEIGHT_QUERY_KEYS.currentWeight],
    queryFn: async () => {
      const data = await getWeightHeight();
      return data;
    },
  });

  // Fetch target weight with react-query
  const {
    data: targetData,
    isLoading: targetLoading,
    error: targetError,
  } = useQuery({
    queryKey: [WEIGHT_QUERY_KEYS.targetWeight],
    queryFn: async () => {
      const data = await getWeightTarget();
      return data;
    },
  });

  // Process weight height data
  const currentWeight = weightHeightData && Array.isArray(weightHeightData) && weightHeightData.length > 0
    ? weightHeightData[0]
    : null;

  // Process target data to get the earliest future target
  let targetWeight = null;
  let newestTargetRecord = null;
  
  if (targetData && Array.isArray(targetData) && targetData.length > 0) {
    // Debug log the raw target data
    console.log("Processing target data:", targetData);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    try {
      // Find targets in the future
      const futureTargets = targetData.filter((target) => {
        if (!target.target_date) return false;
        const targetDate = new Date(target.target_date);
        return targetDate >= today;
      });
      
      console.log("Future targets:", futureTargets);

      // Find the most recently created target
      if (targetData.length > 0) {
        // Sort by record_date descending to get the most recent first
        newestTargetRecord = [...targetData].sort((a, b) => 
          new Date(b.record_date).getTime() - new Date(a.record_date).getTime()
        )[0];
        
        console.log("Newest target record:", newestTargetRecord);
      }

      // If there are future targets, get the earliest one
      if (futureTargets.length > 0) {
        targetWeight = futureTargets.sort((a, b) => 
          new Date(a.target_date).getTime() - new Date(b.target_date).getTime()
        )[0];
        
        console.log("Selected future target:", targetWeight);
      } else if (newestTargetRecord) {
        // If no future targets, use the newest recorded target
        targetWeight = newestTargetRecord;
        console.log("Using newest target as active:", targetWeight);
      }
    } catch (error) {
      console.error('Error processing targets:', error);
    }
  }

  // Combined loading state
  const loading = weightHeightLoading || targetLoading;
  
  // Combined error state
  const error = weightHeightError || targetError 
    ? ((weightHeightError || targetError) as Error)?.message || 'Failed to fetch weight data'
    : null;
  
  // Make sure the activeTarget actually has a valid id for proper edit mode detection
  const activeTarget = targetWeight && targetWeight.id ? targetWeight : null;
  console.log("Final active target:", activeTarget);
  
  // Prepare return values
  const returnValues = {
    currentWeight: currentWeight?.weight ?? 0,
    targetWeight: targetWeight?.weight ?? 0,
    historyWeight: targetWeight?.weight_history ?? 0,
    isDietTurun: targetWeight ? targetWeight.weight < targetWeight.weight_history : false,
    loading,
    error,
    // Raw data for other components to use
    rawWeightHeightData: weightHeightData,
    // Add the active target for edit functionality
    activeTarget,
    // Also expose the newest target record for reference
    newestTargetRecord,
    // Refetch function to manually trigger data refresh
    refetch: () => {
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.currentWeight] });
      queryClient.invalidateQueries({ queryKey: [WEIGHT_QUERY_KEYS.targetWeight] });
    }
  };

  return returnValues;
}; 
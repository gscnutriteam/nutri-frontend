"use server";

import { apiClient } from "@/lib/api_instance";
import { cache } from 'react';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  price_formatted: string;
  ai_scan_limit: number;
  validity_days: number;
  features: {
    bmi_check: boolean;
    scan_ai: boolean;
    [key: string]: boolean;
  };
  is_recommended?: boolean;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  start_date: string;
  end_date: string;
  is_active: boolean;
  ai_scans_used: number;
  payment_method: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

/**
 * Get all subscription plans - cached with React cache
 */
export const getAllSubscriptionPlans = cache(async (): Promise<SubscriptionPlan[]> => {
  try {
    const response = await apiClient<null, ApiResponse<SubscriptionPlan[]>>("/subscriptions/plans", "GET");
    
    // Check if response is successful and contains data
    if (response.success && response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('❌ getAllSubscriptionPlans error:', error);
    return [];
  }
});

/**
 * Get user's current subscription - cached with React cache
 */
export const getUserSubscription = cache(async (): Promise<UserSubscription | null> => {
  try {
    const response = await apiClient<null, ApiResponse<UserSubscription>>("/subscriptions/me", "GET");
    
    // Check if response is successful and contains data
    if (response.success && response.data && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('❌ getUserSubscription error:', error);
    return null;
  }
});

/**
 * Check if user has already purchased a specific plan and it's still active
 */
export const isPlanActive = cache(async (planId: string): Promise<boolean> => {
  try {
    const subscription = await getUserSubscription();
    
    if (!subscription || !subscription.is_active) {
      return false;
    }
    
    // Check if the current active subscription is for the given plan
    return subscription.plan.id === planId;
  } catch (error) {
    console.error(`❌ isPlanActive(${planId}) error:`, error);
    return false;
  }
});

/**
 * Purchase a subscription plan - server action
 */
export async function purchaseSubscription(
  planId: string, 
  paymentMethod: string
): Promise<UserSubscription | null> {
  try {
    const response = await apiClient<{ payment_method: string }, ApiResponse<UserSubscription>>(
      `/subscriptions/purchase/${planId}`, 
      "POST",
      { payment_method: paymentMethod }
    );
    
    // Check if response is successful and contains data
    if (response.success && response.data && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('❌ purchaseSubscription error:', error);
    return null;
  }
}

/**
 * Check if user has access to a feature - cached with React cache
 */
export const checkFeatureAccess = cache(async (feature: string): Promise<boolean> => {
  try {
    const response = await apiClient<null, ApiResponse<{ access: boolean; feature: string }>>(
      `/subscriptions/check-feature?feature=${feature}`, 
      "GET"
    );
    
    // Check if response is successful and contains data
    if (response.success && response.data && response.data.data) {
      return response.data.data.access;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ checkFeatureAccess(${feature}) error:`, error);
    return false;
  }
}); 
"use server";

import { apiClient } from "@/lib/api_instance";
import { cache } from 'react';
import { cookies } from 'next/headers';
import { hasFeatureAccess } from '@/lib/jwt';

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

export interface MidtransPaymentResponse {
  order_id: string;
  redirect_url: string;
  transaction_token: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

/**
 * Helper function to extract feature access directly from JWT token
 */
function extractFeatureAccessFromToken(token: string, feature: string): boolean {
  try {
    // Parse the JWT payload
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    const userData = payload.userData;
    
    // Check if the userData has subscriptionFeatures
    if (!userData || !userData.subscriptionFeatures) {
      return false;
    }
    
    // Return if the feature is enabled
    return !!userData.subscriptionFeatures[feature];
  } catch (error) {
    console.error(`Error extracting feature access for ${feature}:`, error);
    return false;
  }
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
 * Returns Midtrans payment data for Snap integration
 */
export async function purchaseSubscription(
  planId: string, 
  paymentMethod: string
): Promise<MidtransPaymentResponse | null> {
  try {
    const response = await apiClient<{ payment_method: string }, ApiResponse<MidtransPaymentResponse>>(
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
 * Uses JWT token directly to avoid API call, falls back to API if useApi is true
 */
export const checkFeatureAccess = cache(async (feature: string, useApi: boolean = false): Promise<boolean> => {
  try {
    if (!useApi) {
      // Get access token from cookies
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('access_token')?.value;
      
      // Use direct token extraction if token is available
      if (accessToken) {
        return extractFeatureAccessFromToken(accessToken, feature);
      }
      
      // If no token is available, fall back to API
    }
    
    // API Fallback - use when JWT might not be updated with latest subscription data
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
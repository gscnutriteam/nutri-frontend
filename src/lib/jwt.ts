import type { PhsyicalActivity } from '@/services/auth/store/register_store';
import { jwtVerify, createRemoteJWKSet, jwtDecrypt } from 'jose';
export * from './jwt_server';
// For client-side basic verification (checks expiration without signature verification)
export function isJwtExpired(token: string): boolean {
  try {
    if (!token) return true;
    const base64Url = token.split('.')[1];
    if (!base64Url) return true;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    const { exp } = JSON.parse(jsonPayload);
    const currentTime = Math.floor(Date.now() / 1000);
    
    return exp < currentTime;
  } catch (error) {
    console.error('JWT parsing error:', error);
    return true; // If there's any error parsing, consider the token expired
  }
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
  height: number;
  weight: number;
  birth_date: Date;
  activity_level: PhsyicalActivity;
  medical_history: string;
  verified_email: boolean;
  isProductTokenVerified: boolean;
  profile_picture?: string;
  subscriptionFeatures?: {
    bmi_check?: boolean;
    scan_ai?: boolean;
    scan_calorie?: boolean;
    health_info?: boolean;
    chatbot?: boolean;
    weight_tracking?: boolean;
    [key: string]: boolean | undefined;
  } | null;
}

export interface JWTPayload {
  exp: number;
  iat: number;
  sub: string;
  type: string;
  userData: UserData;
}

// Get payload from token (client-side)
export function getPayloadFromToken(token: string): JWTPayload | null {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    let result = JSON.parse(jsonPayload);
    
    // Check if the result is a string that looks like JSON
    if (typeof result === 'string' && result.startsWith('{') && result.endsWith('}')) {
      try {
        // Try to parse it again if it's a stringified JSON
        result = JSON.parse(result);
      } catch (e) {
        // If parsing fails, return the original result
        console.log('Could not parse nested JSON string, returning as is');
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error decoding token payload:', error);
    return null;
  }
}

/**
 * Check if user has access to a specific feature directly from the JWT token
 * @param token - JWT token string
 * @param feature - Feature name to check
 * @returns boolean indicating whether the user has access to the feature
 */
export function hasFeatureAccess(token: string | null | undefined, feature: string): boolean {
  if (!token) return false;
  
  try {
    const payload = getPayloadFromToken(token);
    if (!payload) return false;
    
    const { userData } = payload;
    
    // If user doesn't have a subscription features object or it's null, deny access
    if (!userData.subscriptionFeatures) return false;
    
    // Check if the specific feature exists and is true
    return !!userData.subscriptionFeatures[feature];
  } catch (error) {
    console.error(`Error checking feature access for ${feature}:`, error);
    return false;
  }
}
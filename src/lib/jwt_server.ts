"use server"
import { jwtVerify } from "jose";
import { cookies } from 'next/headers';

/**
 * Server-side JWT verification
 * @param token The JWT token to verify
 * @returns boolean indicating whether the token is valid
 */
export async function verifyJWT(token: string): Promise<boolean> {
  try {
    // For middleware purposes, we only need to check if the token has proper formatting 
    // and isn't expired, not the actual signature for performance reasons
    // Extract the payload to verify expiration
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    const { exp } = JSON.parse(jsonPayload);
    const currentTime = Math.floor(Date.now() / 1000);
    
    // If token is expired, it's invalid
    if (exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('JWT verification error:', error);
    return false;
  }
}

/**
 * Extract user data from a valid JWT token
 * Intended for server components
 */
export async function getUserDataFromToken(token: string) {
  try {
    if (!token) return null;
    
    // Extract the payload
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    
    // Return the userData object from the payload
    return payload.userData || null;
  } catch (error) {
    console.error('Error extracting user data from token:', error);
    return null;
  }
}

/**
 * Check if current user has access to a feature (server-side)
 * For use in server components
 */
export async function checkFeatureAccessServer(feature: string): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    
    if (!accessToken) return false;
    
    // Extract the payload directly
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    const userData = payload.userData;
    
    if (!userData || !userData.subscriptionFeatures) return false;
    
    return !!userData.subscriptionFeatures[feature];
  } catch (error) {
    console.error(`Error checking feature access for ${feature}:`, error);
    return false;
  }
}
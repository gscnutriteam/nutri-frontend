import type { PhsyicalActivity } from '@/services/auth/store/register_store';
import { jwtVerify, createRemoteJWKSet, jwtDecrypt } from 'jose';

// For server-side verification
export async function verifyJWT(token: string): Promise<boolean> {
  try {
    // For verification with your own secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-fallback-secret');
    
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error('JWT verification error:', error);
    return false;
  }
}

// For client-side basic verification (checks expiration without signature verification)
export function isJwtExpired(token: string): boolean {
  try {
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
    const base64Url = token.split('.')[1];
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
"use server"
import { jwtVerify } from "jose";

export async function verifyJWT(token: string): Promise<boolean> {
    try {
      // For verification with your own secret
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-fallback-secret');
      
      await jwtVerify(token, secret);
      return true;
    } catch (error) {
      console.error('JWT verification error:', error);
      console.log('JWT token:', token);
      console.log('JWT secret:', process.env.JWT_SECRET);
      return false;
    }
  }
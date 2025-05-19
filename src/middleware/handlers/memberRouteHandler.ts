import { NextRequest, NextResponse } from 'next/server';
import { getPayloadFromToken } from '@/lib/jwt';

/**
 * Handler for member user routes - redirects to token verification if not a verified member
 */
export async function handleMemberRoutes(request: NextRequest): Promise<NextResponse | null> {
  console.log("👥 Member routes handler running");
  
  const accessToken = request.cookies.get('access_token')?.value;
  
  // If no access token at all, redirect to token verification
  if (!accessToken) {
    console.log("❌ No access token, redirecting to token verification");
    return NextResponse.redirect(new URL('/app/token', request.url));
  }
  
  // We don't check token validity here - that's handled by the token refresh middleware
  // We only check if the user has verified their product token
  
  // Try to get the user data from the token
  try {
    const payload = getPayloadFromToken(accessToken);
    
    // If user exists but isn't verified, redirect to token verification
    if (payload && !payload.userData.isProductTokenVerified) {
      console.log("⚠️ User not verified, redirecting to token verification");
      return NextResponse.redirect(new URL('/app/token', request.url));
    }
    
    // User is verified, allow access
    console.log("✅ Verified member, allowing access");
    return null;
  } catch (error) {
    // Error parsing token - let the token refresh middleware handle it
    console.error("Error extracting user data from token:", error);
    return null;
  }
} 
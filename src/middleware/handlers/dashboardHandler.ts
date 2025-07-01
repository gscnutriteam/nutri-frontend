import { NextRequest, NextResponse } from 'next/server';
import { getPayloadFromToken, isJwtExpired } from '@/lib/jwt';
import { refreshTokenMiddleware } from '@/services/auth/middleware/authMiddleware';

/**
 * Special handler for the main dashboard page
 */
export async function handleDashboardPage(request: NextRequest, pathname: string): Promise<NextResponse | null> {
  if (pathname !== '/app') {
    return null;
  }
  
  console.log("📊 Dashboard handler running");
  
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  
  // Check if we have a refresh token even if access token is missing
  if (refreshToken && (!accessToken || isJwtExpired(accessToken))) {
    console.log("🔄 No valid access token but refresh token exists, trying refresh flow");
    const refreshResponse = await refreshTokenMiddleware(request);
    if (refreshResponse) {
      console.log("✅ Refresh token used, returning refresh response");
      return refreshResponse;
    }
  }
  
  // If no access token and refresh didn't work or no refresh token, redirect to login
  if (!accessToken) {
    console.log("❌ No access token and refresh failed, redirecting to login");
    return NextResponse.redirect(new URL('/app/login', request.url));
  }

  // Just check if the user is verified for product token
  let payload;
  try {
    payload = getPayloadFromToken(accessToken);
  } catch (error) {
    console.error("Error extracting payload from token:", error);
    // Don't redirect here, let the refresh middleware handle it
    return null;
  }
  
  // Only check verification status if we could extract the payload
  if (payload && !payload.userData.isProductTokenVerified) {
    console.log("⚠️ User not verified for product token, redirecting to token page");
    return NextResponse.redirect(new URL('/app/token', request.url));
  }
  
  // User is authenticated and verified, continue to dashboard
  console.log("✅ Dashboard access granted");
  return null;
} 
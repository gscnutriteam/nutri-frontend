import { NextRequest, NextResponse } from 'next/server';
import { hasFeatureAccess } from '@/lib/jwt';
import { featureRoutes } from '../config/routes';

/**
 * Handler for feature-protected routes - redirects to login if not authenticated
 * or to premium page if lacking the required feature
 */
export async function handleFeatureRoutes(
  request: NextRequest, 
  pathname: string
): Promise<NextResponse | null> {
  // Find the matching feature route
  const matchingRoute = Object.entries(featureRoutes).find(
    ([routePath]) => pathname.startsWith(routePath)
  );
  
  // If not a feature route, continue
  if (!matchingRoute) {
    return null;
  }
  
  console.log("🔒 Feature route handler running for", pathname);
  
  const [routePath, requiredFeature] = matchingRoute;
  const accessToken = request.cookies.get('access_token')?.value;
  
  // Check if access token exists
  if (!accessToken) {
    console.log("❌ No access token, redirecting to login");
    return NextResponse.redirect(new URL('/app/login', request.url));
  }
  
  // We don't check token validity here - that's handled by the token refresh middleware
  // We only check if the user has the required feature
  
  try {
    // Check if user has the required feature
    const hasAccess = hasFeatureAccess(accessToken, requiredFeature);
    if (!hasAccess) {
      console.log(`⚠️ User lacks required feature: ${requiredFeature}, redirecting to premium page`);
      // Redirect to subscription page if they don't have access to the feature
      return NextResponse.redirect(new URL('/app/premium', request.url));
    }
    
    // User has access to the feature, continue
    console.log("✅ User has feature access, allowing access");
    return null;
  } catch (error) {
    // Error checking feature access - let the token refresh middleware handle it
    console.error("Error checking feature access:", error);
    return null;
  }
} 
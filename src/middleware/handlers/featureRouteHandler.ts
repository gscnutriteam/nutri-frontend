import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, hasFeatureAccess } from '@/lib/jwt';
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
  
  const [routePath, requiredFeature] = matchingRoute;
  const accessToken = request.cookies.get('access_token')?.value;
  
  if (!accessToken) {
    return NextResponse.redirect(new URL('/app/login', request.url));
  }

  const isValid = await verifyJWT(accessToken);
  if (!isValid) {
    const response = NextResponse.redirect(new URL('/app/login', request.url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }

  // Check if user has the required feature
  const hasAccess = hasFeatureAccess(accessToken, requiredFeature);
  if (!hasAccess) {
    // Redirect to subscription page if they don't have access to the feature
    return NextResponse.redirect(new URL('/app/premium', request.url));
  }
  
  // User has access to the feature, continue
  return null;
} 
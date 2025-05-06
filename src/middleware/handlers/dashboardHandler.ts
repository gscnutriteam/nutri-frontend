import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, getPayloadFromToken } from '@/lib/jwt';

/**
 * Special handler for the main dashboard page
 */
export async function handleDashboardPage(request: NextRequest, pathname: string): Promise<NextResponse | null> {
  if (pathname !== '/app') {
    return null;
  }
  
  const accessToken = request.cookies.get('access_token')?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/app/login', request.url));
  }

  const isValid = await verifyJWT(accessToken);
  const payload = await getPayloadFromToken(accessToken);

  if (!isValid || !payload?.userData.isProductTokenVerified) {
    return NextResponse.redirect(new URL('/app/token', request.url));
  }
  
  // User is authenticated and verified, continue to dashboard
  return null;
} 
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, getPayloadFromToken } from '@/lib/jwt';

/**
 * Special handler for the token page - prevents verified members from accessing it
 */
export async function handleTokenPage(request: NextRequest, pathname: string): Promise<NextResponse | null> {
  if (!pathname.startsWith('/app/token')) {
    return null;
  }
  
  const accessToken = request.cookies.get('access_token')?.value;
  if (!accessToken) {
    return null; // Continue to token page
  }
  
  // Verify the JWT token
  const isValid = await verifyJWT(accessToken);
  const payload = await getPayloadFromToken(accessToken);
  
  if (isValid && payload?.userData.isProductTokenVerified) {
    return NextResponse.redirect(new URL('/app', request.url));
  }
  
  // Not verified yet, continue to token page
  return null;
} 
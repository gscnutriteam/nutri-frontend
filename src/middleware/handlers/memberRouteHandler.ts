import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, getPayloadFromToken } from '@/lib/jwt';

/**
 * Handler for member user routes - redirects to token verification if not a verified member
 */
export async function handleMemberRoutes(request: NextRequest): Promise<NextResponse | null> {
  const accessToken = request.cookies.get('access_token')?.value;
  
  if (!accessToken) {
    return NextResponse.redirect(new URL('/app/token', request.url));
  }
  
  // Verify the JWT token
  const isValid = await verifyJWT(accessToken);
  const payload = getPayloadFromToken(accessToken);
  
  if (!isValid || !payload?.userData.isProductTokenVerified) {
    return NextResponse.redirect(new URL('/app/token', request.url));
  }
  
  // User is a verified member, continue
  return null;
} 
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';

/**
 * Handler for guest routes - redirects to dashboard if already authenticated
 */
export async function handleGuestRoutes(request: NextRequest): Promise<NextResponse | null> {
  const accessToken = request.cookies.get('access_token')?.value;
  
  if (accessToken) {
    // Verify the JWT token
    const isValid = await verifyJWT(accessToken);
    if (isValid) {
      return NextResponse.redirect(new URL('/app', request.url));
    }
    
    // If token is invalid, clear it but don't redirect (let them stay on guest routes)
    const response = NextResponse.next();
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }
  
  // User is not authenticated, continue
  return null;
} 
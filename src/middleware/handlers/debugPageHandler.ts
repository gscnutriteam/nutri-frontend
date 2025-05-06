import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler for debug routes - requires debug auth
 */
export async function handleDebugPages(request: NextRequest, pathname: string): Promise<NextResponse | null> {
  if (!pathname.startsWith('/debug') || pathname === '/debug/auth') {
    return null;
  }
  
  // Check if debug mode is enabled
  const isDebugEnabled = process.env.APP_DEBUG === 'true';
  if (!isDebugEnabled) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Get the debug PIN from environment variable
  const correctPin = process.env.DEBUG_PIN;
  if (!correctPin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Check if user is authenticated for debug
  const debugSession = request.cookies.get('debug_session');
  if (!debugSession || debugSession.value !== correctPin) {
    return NextResponse.redirect(new URL('/debug/auth', request.url));
  }
  
  // User is authenticated for debug, continue
  return null;
} 
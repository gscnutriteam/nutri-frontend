import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const correctPin = process.env.DEBUG_PIN;
    const isDebugEnabled = process.env.APP_DEBUG === 'true';

    if (!isDebugEnabled) {
      return NextResponse.json({ error: 'Debug mode is disabled' }, { status: 403 });
    }

    if (!correctPin) {
      return NextResponse.json({ error: 'Debug PIN not configured' }, { status: 500 });
    }

    if (pin !== correctPin) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
    }

    // Create response with success status
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Set the debug session cookie in the response
    response.cookies.set('debug_session', pin, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7200 // 2 hours
    });

    return response;
  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import useRefreshAPI from '@/services/auth/api/refresh';

// Define response type
interface RefreshResponse {
  success: boolean;
  status: number;
  statusText: string;
  data?: {
    tokens?: {
      access: {
        token: string;
        expires: string;
      };
      refresh: {
        token: string;
        expires: string;
      };
    };
  };
}

/**
 * API route handler for token refresh
 * POST /api/auth/refresh-token
 */
export async function POST(request: NextRequest) {
  try {
    // Get the refresh token from the request body
    const body = await request.json();
    const refreshToken = body.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Call the refresh API
    const response = await useRefreshAPI({ refresh_token: refreshToken }) as RefreshResponse;

    if (!response.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to refresh token' },
        { status: 401 }
      );
    }

    // Return the new tokens
    return NextResponse.json({
      success: true,
      tokens: response.data?.tokens
    });
  } catch (error) {
    console.error('Error in refresh token route:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 
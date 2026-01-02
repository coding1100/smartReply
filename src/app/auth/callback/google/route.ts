import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy route for Google OAuth callback
 * This route receives the OAuth callback from Google at /auth/callback/google
 * and redirects to NextAuth's callback handler at /api/auth/callback/google
 * 
 * This allows us to use /auth/callback/google as the redirect URI in Google Cloud Console
 * while NextAuth handles the actual OAuth flow at /api/auth/callback/google
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Get the current origin
  const origin = request.nextUrl.origin;
  
  // Build the NextAuth callback URL - using root path
  const callbackPath = "/api/auth/callback/google";
  
  const callbackUrl = new URL(callbackPath, origin);
  
  // Copy all query parameters from the original request (code, state, etc.)
  searchParams.forEach((value, key) => {
    callbackUrl.searchParams.set(key, value);
  });
  
  // Log for debugging (remove in production if needed)
  if (process.env.NODE_ENV === 'development') {
    console.log('OAuth callback proxy - redirecting to:', callbackUrl.toString());
  }
  
  // Redirect to NextAuth's callback handler
  return NextResponse.redirect(callbackUrl);
}


import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy route for Facebook OAuth callback
 * This route receives the OAuth callback from Facebook at /auth/callback/facebook
 * and redirects to NextAuth's callback handler at /api/auth/callback/facebook
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const origin = request.nextUrl.origin;
    const callbackPath = "/api/auth/callback/facebook";
    const callbackUrl = new URL(callbackPath, origin);

    searchParams.forEach((value, key) => {
        callbackUrl.searchParams.set(key, value);
    });

    if (process.env.NODE_ENV === 'development') {
        console.log('Facebook OAuth callback proxy - redirecting to:', callbackUrl.toString());
    }

    return NextResponse.redirect(callbackUrl);
}

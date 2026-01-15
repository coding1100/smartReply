import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Always use the live API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://pseudoangular-maryrose-unbreathing.ngrok-free.dev";

// Get the base URL for redirect URI based on environment
const getBaseUrl = () => {
    // Use NEXTAUTH_URL if set (recommended)
    // Ensure we strip trailing slash for consistency
    if (process.env.NEXTAUTH_URL) {
        return process.env.NEXTAUTH_URL.replace(/\/$/, "");
    }

    // Detect environment
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
        // Local development - using root path
        return "http://localhost:3000";
    }

    // Production: Try to detect from Vercel environment variables
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // Fallback: Use NEXT_PUBLIC_API_URL if available (for custom domains)
    if (process.env.NEXT_PUBLIC_API_URL) {
        // Extract domain from API URL if it's a full URL
        try {
            const url = new URL(process.env.NEXT_PUBLIC_API_URL);
            // If API URL is on same domain, use it
            if (url.hostname.includes('vercel.app') || url.hostname.includes('smart-reply')) {
                return `https://smart-reply-xi.vercel.app`;
            }
        } catch (e) {
            // Invalid URL, continue to fallback
        }
    }

    // Final fallback: Use known production URL
    return "https://smart-reply-xi.vercel.app";
};

const baseUrl = getBaseUrl();
// Construct the redirect URI using NextAuth's NEW base path (/auth)
const googleRedirectUri = `${baseUrl}/auth/callback/google`;
const facebookRedirectUri = `${baseUrl}/auth/callback/facebook`;

// Build providers array conditionally based on available credentials
const providers = [];

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;

console.log("Auth Configuration Initializing (at /auth)...");
console.log("📍 Base URL:", baseUrl);
console.log("📍 Facebook Redirect URI:", facebookRedirectUri);
console.log("📍 Google Redirect URI:", googleRedirectUri);
console.log("⚠️  IMPORTANT: These redirect URIs MUST be whitelisted in OAuth provider consoles!");

// Validate critical environment variables
// Don't throw during build - NextAuth will handle missing secret at runtime
if (!process.env.NEXTAUTH_SECRET) {
    // Only log warnings, don't throw (prevents build failures)
    // NextAuth will handle the missing secret gracefully at runtime
    if (process.env.NODE_ENV === 'production') {
        console.warn("⚠️  WARNING: NEXTAUTH_SECRET is not set!");
        console.warn("   This will cause 500 errors on /auth/session endpoint at runtime");
        console.warn("   Generate with: openssl rand -base64 32");
        console.warn("   Add to Vercel Environment Variables: NEXTAUTH_SECRET=your-secret-here");
    } else {
        console.error("❌ CRITICAL ERROR: NEXTAUTH_SECRET is not set!");
        console.error("   This will cause 500 errors on /auth/session endpoint");
        console.error("   Generate with: openssl rand -base64 32");
        console.error("   Add to .env.local: NEXTAUTH_SECRET=your-secret-here");
    }
    // Don't throw - let the build complete, NextAuth will handle it at runtime
}

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === 'production') {
    console.warn("⚠️  WARNING: NEXTAUTH_URL is not set in production");
    console.warn("   Set in Vercel: NEXTAUTH_URL=https://smart-reply-xi.vercel.app");
}

// Add Google provider if credentials are available
if (googleClientId && googleClientSecret) {
    providers.push(
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            authorization: {
                params: {
                    redirect_uri: googleRedirectUri,
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            checks: ["pkce", "state"],
        })
    );
}

// Add Facebook provider if credentials are available
if (facebookClientId && facebookClientSecret) {
    providers.push(
        FacebookProvider({
            clientId: facebookClientId,
            clientSecret: facebookClientSecret,
            authorization: {
                params: {
                    redirect_uri: facebookRedirectUri,
                    scope: "email,public_profile",
                },
            },
        })
    );
}

export const authOptions: NextAuthOptions = {
    providers,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        redirect({ url, baseUrl }) {
            // Redirect to dashboard after successful login
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl + "/dashboard";
        },
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const response = await fetch(`${API_URL}/auth/google/callback`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            access_token: account.access_token,
                            id_token: account.id_token,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }),
                    });
                    return true;
                } catch (error) {
                    console.error("Error during Google sign in:", error);
                    return true;
                }
            }

            if (account?.provider === "facebook") {
                try {
                    const response = await fetch(`${API_URL}/auth/facebook/callback`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            access_token: account.access_token,
                            provider_account_id: account.providerAccountId,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }),
                    });
                    return true;
                } catch (error) {
                    console.warn("Backend unreachable during Facebook sign in:", error);
                    return true;
                }
            }

            return true;
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                token.id = user.id || user.email || "";
                token.email = user.email || "";
                token.name = user.name || "";
                token.image = user.image || "";
                token.provider = account.provider;
                token.providerAccountId = account.providerAccountId;

                if (account.provider === "google" && account.access_token) {
                    token.googleAccessToken = account.access_token;
                }
                if (account.provider === "facebook" && account.access_token) {
                    token.facebookAccessToken = account.access_token;
                }

                try {
                    let apiEndpoint = "";
                    let requestBody: any = {};

                    if (account.provider === "google") {
                        apiEndpoint = `${API_URL}/auth/google/callback`;
                        requestBody = {
                            access_token: account.access_token,
                            id_token: account.id_token,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        };
                    } else if (account.provider === "facebook") {
                        apiEndpoint = `${API_URL}/auth/facebook/callback`;
                        requestBody = {
                            access_token: account.access_token,
                            provider_account_id: account.providerAccountId,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        };
                    }

                    const response = await fetch(apiEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        token.accessToken = data.access_token;
                        token.tokenType = data.token_type || "Bearer";
                        token.backendUserId = data.user_id;
                    }
                } catch (error) {
                    console.error("Error fetching backend token:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                if (token.id) session.user.id = token.id as string;
                if (token.email) session.user.email = token.email as string;
                if (token.name) session.user.name = token.name as string;
                if (token.image) session.user.image = token.image as string;
            }

            if (token.accessToken) {
                session.accessToken = token.accessToken as string;
            }
            if (token.tokenType) {
                session.tokenType = token.tokenType as string;
            }
            if (token.backendUserId) {
                session.backendUserId = token.backendUserId as string;
            }
            if (token.googleAccessToken) {
                session.googleAccessToken = token.googleAccessToken as string;
            }
            if (token.facebookAccessToken) {
                session.facebookAccessToken = token.facebookAccessToken as string;
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

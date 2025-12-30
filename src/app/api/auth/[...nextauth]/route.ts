import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from "next/server";

// Always use the live API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sme.namatechnologlies.com";

// Get the base URL for redirect URI based on environment
const getBaseUrl = () => {
  // Use NEXTAUTH_URL if set (recommended)
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // Detect environment
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // Local development - using root path
    return "http://localhost:3000";
  }
  
  // Production fallback
  return "https://sme.namatechnologlies.com";
};

const baseUrl = getBaseUrl();
// Construct the redirect URI using NextAuth's direct callback path
// For local: http://localhost:3000/api/auth/callback/google
// For production: https://sme.namatechnologlies.com/api/auth/callback/google
const redirectUri = `${baseUrl}/api/auth/callback/google`;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: redirectUri,
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      // Ensure proper scopes
      checks: ["pkce", "state"],
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Send user data to backend API for registration/login
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

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend authentication failed:", response.status, errorText);
            // Don't fail the OAuth flow if backend fails - allow user to sign in
            // The backend token will be fetched in the jwt callback
            return true;
          }

          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          // Don't fail the OAuth flow if backend is unreachable
          // Allow the user to sign in, backend token will be handled in jwt callback
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in - store user and account info
      if (account && user) {
        // Store user info first
        token.id = user.id || user.email || "";
        token.email = user.email || "";
        token.name = user.name || "";
        token.image = user.image || "";
        
        // Store Google account info
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;

        // Try to get backend token from the live API
        try {
          console.log("Calling live API:", `${API_URL}/auth/google/callback`);
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

          if (response.ok) {
            const data = await response.json();
            token.accessToken = data.access_token;
            token.tokenType = data.token_type || "Bearer";
            token.backendUserId = data.user_id;
            
            // Log success
            console.log("Backend token received successfully");
          } else {
            const errorText = await response.text();
            console.error("Error fetching backend token:", response.status, errorText);
          }
        } catch (error) {
          console.error("Error fetching backend token:", error);
          // Continue even if backend call fails
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Send token and user properties to the client
      try {
        if (session?.user) {
          // User information
          if (token.id) session.user.id = token.id as string;
          if (token.email) session.user.email = token.email as string;
          if (token.name) session.user.name = token.name as string;
          if (token.image) session.user.image = token.image as string;
        }
        
        // Backend token information (will be stored in localStorage by SessionSync component)
        if (token.accessToken) {
          session.accessToken = token.accessToken as string;
        }
        if (token.tokenType) {
          session.tokenType = token.tokenType as string;
        } else {
          session.tokenType = "Bearer";
        }
        if (token.backendUserId) {
          session.backendUserId = token.backendUserId as string;
        }
        
        // Log in development to verify token is being set
        if (process.env.NODE_ENV === 'development' && token.accessToken) {
          console.log('Session callback - Token available:', !!token.accessToken);
        }
      } catch (error) {
        console.error('Error in session callback:', error);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error", // Use /error page which will redirect appropriately
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug logging in development
};

const handler = NextAuth(authOptions);

// Export handlers directly - NextAuth handles all routes (session, providers, callback, etc.)
export { handler as GET, handler as POST };


"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * Component to sync NextAuth session data to localStorage
 * This ensures tokens and user data are always available in localStorage
 */
export function SessionSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Only sync when session is authenticated
    if (status === "authenticated" && session) {
      // Store backend token in localStorage
      if (session.accessToken) {
        localStorage.setItem("accessToken", session.accessToken);
      }
      if (session.tokenType) {
        localStorage.setItem("tokenType", session.tokenType);
      } else {
        localStorage.setItem("tokenType", "Bearer");
      }

      // Store user information in localStorage
      if (session.user) {
        if (session.user.id) {
          localStorage.setItem("userId", session.user.id);
        }
        if (session.user.email) {
          localStorage.setItem("userEmail", session.user.email);
        }
        if (session.user.name) {
          localStorage.setItem("userName", session.user.name);
        }
        if (session.user.image) {
          localStorage.setItem("userImage", session.user.image);
        }
      }

      // Store backend user ID if available
      if (session.backendUserId) {
        localStorage.setItem("backendUserId", session.backendUserId);
      }

      // Store Google OAuth access_token if available
      if (session.googleAccessToken) {
        localStorage.setItem("googleAccessToken", session.googleAccessToken);
      }
    } else if (status === "unauthenticated") {
      // Clear localStorage when user logs out
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenType");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      localStorage.removeItem("userImage");
      localStorage.removeItem("backendUserId");
      localStorage.removeItem("googleAccessToken");
    }
  }, [session, status]);

  // This component doesn't render anything
  return null;
}


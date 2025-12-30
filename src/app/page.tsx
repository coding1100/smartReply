"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect once
    if (hasRedirected.current) return;
    hasRedirected.current = true;
    
    // Check for accessToken or googleAccessToken in localStorage
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const googleAccessToken = typeof window !== "undefined" ? localStorage.getItem("googleAccessToken") : null;
    
    // User is authenticated if they have either token
    const isAuthenticated = accessToken || googleAccessToken;
    
    if (isAuthenticated) {
      // If token exists, redirect to home
      router.replace("/home");
    } else {
      // If no token, redirect to login
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto"></div>
        <p className="mt-4 text-zinc-600">Loading...</p>
      </div>
    </div>
  );
}

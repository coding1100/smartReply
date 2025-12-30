"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the error parameter from the URL
    const error = searchParams.get("error");
    // Get the callbackUrl to see where the user was trying to go
    const callbackUrl = searchParams.get("callbackUrl");
    
    // Determine where to redirect based on callbackUrl or default to login
    let redirectPath = "/login";
    if (callbackUrl) {
      // If callbackUrl contains register, redirect to register
      if (callbackUrl.includes("/register")) {
        redirectPath = "/register";
      } else if (callbackUrl.includes("/login")) {
        redirectPath = "/login";
      }
    }
    
    // Redirect with error parameter
    if (error) {
      router.replace(`${redirectPath}?error=${error}`);
    } else {
      router.replace(redirectPath);
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-zinc-600">Redirecting...</p>
      </div>
    </div>
  );
}


"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const hasChecked = useRef(false);
  const isRedirecting = useRef(false);

  useEffect(() => {
    // Only check once on mount
    if (hasChecked.current || isRedirecting.current) return;

    // Wait for window to be available
    if (typeof window === "undefined") {
      return;
    }

    // Check current pathname - don't protect public routes
    const currentPath = window.location.pathname;
    const publicRoutes = ["/login", "/register", "/error"];

    if (publicRoutes.includes(currentPath)) {
      hasChecked.current = true;
      setIsAuthorized(true);
      return;
    }

    // Check for accessToken in localStorage
    const checkAuth = () => {
      // Prevent multiple redirects
      if (isRedirecting.current) return;

      const currentPathNow = window.location.pathname;
      const accessToken = localStorage.getItem("accessToken");
      // User is authenticated if they have accessToken
      const isAuthenticated = !!accessToken;
      
      console.log("🔐 AdminLayout - Auth Check:", {
        hasAccessToken: !!accessToken,
        isAuthenticated: isAuthenticated,
        currentPath: currentPathNow
      });

      // Double-check we're not on a public route
      if (publicRoutes.includes(currentPathNow)) {
        hasChecked.current = true;
        setIsAuthorized(true);
        return;
      }

      if (!isAuthenticated) {
        // If no token and not already on login, redirect to login
        if (currentPathNow !== "/login" && !isRedirecting.current) {
          isRedirecting.current = true;
          hasChecked.current = true;
          setIsAuthorized(false);
          router.replace("/login");
        } else {
          hasChecked.current = true;
          setIsAuthorized(false);
        }
      } else {
        hasChecked.current = true;
        setIsAuthorized(true);
      }
    };

    // Check immediately - no delay needed as localStorage is synchronous
    checkAuth();
  }, []); // Only run once on mount

  // Show loading state while checking
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin !rounded-xl h-8 w-8 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="mt-4 text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authorized, don't render the layout
  if (isAuthorized === false) {
    return null;
  }

  return (
    <div className="h-dvh bg-zinc-50">
      <div className="mx-auto flex h-full w-full items-stretch">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />
          <main className={`min-w-0 flex-1 overflow-auto ${pathname === "/home" ? "" : "p-6"}`}>
            {children}
          </main>
          <footer className="border-t border-zinc-200 bg-white px-6 py-3 text-right text-xs text-zinc-500">
            Copyright © 2021 SmartReply. All rights reserved
          </footer>
        </div>
      </div>
    </div>
  );
}



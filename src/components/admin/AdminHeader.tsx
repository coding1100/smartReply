"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function AdminHeader() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Get user image and name from localStorage
    const image = localStorage.getItem("userImage");
    const name = localStorage.getItem("userName");
    
    if (image) {
      setUserImage(image);
    }
    if (name) {
      setUserName(name);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = async () => {
    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
    localStorage.removeItem("backendUserId");
    localStorage.removeItem("googleAccessToken");
    localStorage.removeItem("facebookAccessToken");

    // Sign out from NextAuth
    await signOut({ 
      redirect: false,
      callbackUrl: "/login" 
    });

    // Redirect to login
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="!text-sm !font-semibold text-zinc-900">Admin</div>
        <div className="relative flex items-center gap-3" ref={dropdownRef}>
          {/* User Name */}
          {userName && (
            <span className="text-sm font-medium text-zinc-700 hidden sm:block">
              {userName}
            </span>
          )}
          
          {/* Avatar with Dropdown */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center focus:outline-none rounded-full hover:ring-2 hover:ring-indigo-100 transition-all"
            aria-label="User menu"
          >
            {userImage ? (
              <img
                src={userImage}
                alt={userName || "User"}
                className="h-9 w-9 rounded-full object-cover border-2 border-zinc-200 hover:border-indigo-300 transition-all cursor-pointer shadow-sm"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-indigo-700 text-xs font-semibold border-2 border-zinc-200 hover:border-indigo-300 transition-all cursor-pointer shadow-sm">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-xl border border-zinc-100 focus:outline-none z-50 overflow-hidden">
              <div className="py-1">
                {userName && (
                  <div className="px-4 py-3 text-sm text-zinc-700 border-b border-zinc-100 bg-zinc-50/50">
                    <p className="font-semibold text-zinc-900">{userName}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {localStorage.getItem("userEmail") || ""}
                    </p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



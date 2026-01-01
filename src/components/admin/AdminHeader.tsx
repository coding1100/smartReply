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
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
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
            className="flex items-center focus:outline-none"
            aria-label="User menu"
          >
            {userImage ? (
              <img
                src={userImage}
                alt={userName || "User"}
                className="h-8 w-8 rounded-full object-cover border-2 border-zinc-300 hover:border-zinc-400 transition-colors cursor-pointer"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 text-xs font-medium border-2 border-zinc-300 hover:border-zinc-400 transition-colors cursor-pointer">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1">
                {userName && (
                  <div className="px-4 py-2 text-sm text-zinc-700 border-b border-zinc-200">
                    <p className="font-medium">{userName}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {localStorage.getItem("userEmail") || ""}
                    </p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



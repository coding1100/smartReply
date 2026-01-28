"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { api } from "@/services/api";

export default function LoginPage() {
    console.log("🔍 LoginPage Rendering...");
    console.log("📍 Current URL:", typeof window !== "undefined" ? window.location.href : "SSR");

    // IMMEDIATE token check BEFORE any state/hooks
    if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log("🎯 IMMEDIATE CHECK - Token in URL:", !!token);
        if (token) {
            console.log("🎯 IMMEDIATE CHECK - Token value:", token.substring(0, 20) + "...");
        }
    }

    // Check if already authenticated IMMEDIATELY to prevent flash
    const [isRedirecting, setIsRedirecting] = useState(() => {
        if (typeof window !== "undefined") {
            const hasToken = !!localStorage.getItem("accessToken");
            if (hasToken) {
                console.log("🔄 Already authenticated, preparing redirect...");
            }
            return hasToken;
        }
        return false;
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sme.namatechnologlies.com";

    // Track redirect state to prevent loops
    const hasRedirected = React.useRef(false);
    const isChecking = React.useRef(false);

    // PRIORITY 1: Handle tokens from direct backend login (backend-initiated OAuth flow)
    // This MUST run FIRST before any other auth checks
    useEffect(() => {
        console.log("🔄 OAuth Token Effect Running (PRIORITY)...");
        console.log("🔄 typeof window:", typeof window);
        console.log("🔄 window.location.href:", typeof window !== "undefined" ? window.location.href : "N/A");

        if (typeof window === "undefined") {
            console.log("⚠️ Window is undefined, skipping...");
            return;
        }

        // Check for token in URL IMMEDIATELY
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        console.log("❓ URL has token:", !!token);
        console.log("❓ Token value:", token ? token.substring(0, 20) + "..." : "null");

        if (token) {
            console.log("✅ Token found in URL, processing IMMEDIATELY...");
            console.log("🔑 Full Token:", token);

            try {
                // Save to localStorage IMMEDIATELY
                localStorage.setItem("accessToken", token);
                console.log("✅ Token saved to localStorage");

                localStorage.setItem("tokenType", urlParams.get('tokenType') || 'Bearer');
                console.log("✅ TokenType saved to localStorage");

                const userId = urlParams.get('userId');
                if (userId) {
                    console.log("👤 User ID:", userId);
                    localStorage.setItem("backendUserId", userId);
                    console.log("✅ UserId saved to localStorage");
                }

                // Verify storage
                console.log("🔍 Verifying localStorage:");
                console.log("  - accessToken:", localStorage.getItem("accessToken") ? "✅ Saved" : "❌ Not saved");
                console.log("  - tokenType:", localStorage.getItem("tokenType") ? "✅ Saved" : "❌ Not saved");
                console.log("  - backendUserId:", localStorage.getItem("backendUserId") ? "✅ Saved" : "❌ Not saved");

                // Set flag to prevent other effects from interfering
                hasRedirected.current = true;
                setIsRedirecting(true);

                console.log("🚀 Redirecting to /home...");
                // Use window.location for reliable redirect with fresh page load
                window.location.href = "/home";
                return; // Exit early
            } catch (error) {
                console.error("❌ Error processing token:", error);
            }
        } else {
            console.log("⚠️ No token found in URL");
        }
    }, []); // Empty dependency array - run once on mount

    // Check if already logged in (has accessToken) - redirect to home immediately
    useEffect(() => {
        // Skip if we just processed a token from URL
        if (hasRedirected.current) return;
        if (isChecking.current) return;
        isChecking.current = true;

        // Check immediately - no delay needed
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken && !hasRedirected.current) {
            console.log("✅ Token already exists, redirecting to /home...");
            hasRedirected.current = true;
            setIsRedirecting(true);
            router.replace("/home");
        }
    }, [router]);

    // Redirect if already logged in and sync data to localStorage (NextAuth)
    useEffect(() => {
        // Skip if we just processed a token from URL
        if (hasRedirected.current) return;

        const checkAuthAndRedirect = async () => {
            if (status === "authenticated" && session) {
                console.log("🔐 Session authenticated, saving tokens to localStorage...");

                // Store backend token in localStorage for API calls (PRIORITY)
                if (session.accessToken) {
                    localStorage.setItem("accessToken", session.accessToken);
                    localStorage.setItem("tokenType", session.tokenType || "Bearer");
                    console.log("✅ Backend token saved to localStorage");
                }

                // Store user information in localStorage
                if (session.user) {
                    if (session.user.id) localStorage.setItem("userId", session.user.id);
                    if (session.user.email) localStorage.setItem("userEmail", session.user.email);
                    if (session.user.name) localStorage.setItem("userName", session.user.name);
                    if (session.user.image) localStorage.setItem("userImage", session.user.image);
                }

                // Store backend user ID if available
                if (session.backendUserId) {
                    localStorage.setItem("backendUserId", session.backendUserId);
                }

                // Store provider-specific OAuth access_token if available (fallback)
                if (session.googleAccessToken) {
                    localStorage.setItem("googleAccessToken", session.googleAccessToken);
                }
                if (session.facebookAccessToken) {
                    localStorage.setItem("facebookAccessToken", session.facebookAccessToken);
                }

                // Redirect if we have backend accessToken (preferred) or provider token (fallback)
                const hasToken = session.accessToken || session.googleAccessToken || session.facebookAccessToken;
                if (hasToken && !hasRedirected.current) {
                    hasRedirected.current = true;
                    console.log("🚀 Redirecting to /home...");
                    // Small delay to ensure localStorage is saved
                    setTimeout(() => {
                        router.replace("/home");
                    }, 200);
                }
            }
        };

        checkAuthAndRedirect();
    }, [session, status, router]);

    // Additional effect to sync token when it becomes available (handles delayed token loading from NextAuth)
    useEffect(() => {
        // Skip if we just processed a token from URL
        if (hasRedirected.current) return;

        if (status === "authenticated" && session?.accessToken) {
            localStorage.setItem("accessToken", session.accessToken);
            localStorage.setItem("tokenType", session.tokenType || "Bearer");
        }
    }, [session?.accessToken, session?.tokenType, status]);

    // Handle error from URL params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const errorParam = params.get('error');
        if (errorParam) {
            switch (errorParam) {
                case 'OAuthSignin':
                case 'OAuthCallback':
                case 'OAuthCreateAccount':
                case 'EmailCreateAccount':
                case 'Callback':
                    setError('OAuth authentication failed. Please try again.');
                    break;
                case 'OAuthAccountNotLinked':
                    setError('An account with this email already exists. Please sign in with your original method.');
                    break;
                case 'EmailSignin':
                    setError('Check your email for the sign in link.');
                    break;
                case 'CredentialsSignin':
                    setError('Invalid credentials. Please check your email and password.');
                    break;
                case 'SessionRequired':
                    setError('Please sign in to access this page.');
                    break;
                default:
                    setError('An error occurred. Please try again.');
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);

            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("accessToken", data.access_token);
                localStorage.setItem("tokenType", data.token_type);
                if (!hasRedirected.current) {
                    hasRedirected.current = true;
                    try {
                        const agents = await api.agents.list();
                        if (!agents || agents.length === 0) {
                            router.replace("/ai-agent-settings");
                        } else {
                            router.replace("/home");
                        }
                    } catch (error) {
                        console.error("Error fetching agents list:", error);
                        router.replace("/home");
                    }
                }
            } else {
                const errorMsg = typeof data.detail === 'string'
                    ? data.detail
                    : JSON.stringify(data.detail) || "Login failed. Please check your credentials.";
                setError(errorMsg);
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            // Use backend-initiated OAuth flow (same as Facebook)
            console.log("🚀 Initiating Google OAuth via backend...");
            const redirectUri = `${window.location.origin}/login`;
            await api.auth.loginProvider('google', redirectUri);
        } catch (err) {
            console.error("❌ Google login error:", err);
            setError("Something went wrong. Please try again later.");
            setLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        setError("");
        setLoading(true);
        try {
            console.log("🚀 Initiating Facebook login via backend...");
            console.log(`📍 Redirecting to: ${API_URL}/auth/login/facebook`);

            // Redirect to backend OAuth endpoint
            // Backend will handle the OAuth flow and redirect back to frontend with token
            window.location.href = `${API_URL}/auth/login/facebook`;
        } catch (err) {
            console.error("Facebook login error:", err);
            setError("Something went wrong. Please try again later.");
            setLoading(false);
        }
    };

    // Show loading state if already authenticated and redirecting
    if (isRedirecting) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin !rounded-xl h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-zinc-600">Redirecting to home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Bar */}

            {/* Two Column Layout */}
            <div className="flex-1 flex">
                {/* Left Column - Welcome Section (Gray Background) */}
                <div className="w-1/2 bg-zinc-50 flex items-center justify-center p-12 relative">
                    <div className="text-xl font-bold text-zinc-900 absolute top-[20px] left-[20px]">SmartReply</div>
                    <div className="max-w-md">
                        <div className="w-32 h-32 bg-black rounded-3xl flex items-center justify-center mb-8">
                            <svg
                                className="w-20 h-20 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-zinc-900 mb-2">
                            Welcome back to SmartReply!
                        </h1>
                        <p className="text-zinc-600">Sign In to SmartReply.</p>
                    </div>
                </div>

                {/* Right Column - Form Section (White Background) */}
                <div className="w-1/2 bg-white flex items-center justify-center p-12 relative">
                    <Link
                        href="/register"
                        className="px-6 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 !rounded-xl hover:bg-indigo-50 hover:shadow-sm !no-underline hover:!no-underline absolute top-[20px] right-[20px]"
                    >
                        GET STARTED FREE
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md space-y-4"
                    >
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 !rounded-xl shadow-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleGoogleLogin}
                            className="w-full mb-2 flex items-center justify-center !rounded-xl gap-3 py-3 px-4 bg-white border border-zinc-200 text-zinc-900 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all font-medium"
                            disabled={loading}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Sign In With Google
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleFacebookLogin}
                            className="w-full flex items-center justify-center !rounded-xl gap-3 py-3 px-4 bg-white border border-zinc-200 text-zinc-900 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all font-medium"
                            disabled={loading}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Sign In With Facebook
                        </motion.button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-zinc-500">or</span>
                            </div>
                        </div>

                        {/* Email/Password Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-zinc-700 mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="m.ovais@mindfind.com"
                                    className="w-full px-4 py-2.5 border border-zinc-200 !rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-zinc-700 mb-1"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••"
                                    className="w-full px-4 py-2.5 border border-zinc-200 !rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-indigo-600 border-zinc-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-zinc-700">
                                        Remember me
                                    </span>
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-indigo-600 hover:text-indigo-700"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <motion.button
                                whileHover={{ scale: loading ? 1 : 1.01 }}
                                whileTap={{ scale: loading ? 1 : 0.99 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-indigo-600 text-white !rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "LOGGING IN..." : "LOGIN"}
                            </motion.button>
                        </form>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-zinc-600 mt-6">
                            New to SmartReply?{" "}
                            <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Sign up
                            </Link>
                        </p>

                        {/* Footer Links */}
                        <div className="flex justify-center gap-6 mt-8 text-sm">
                            <Link
                                href="https://www.smartreply.io/policy-pages/terms-of-service"
                                className="text-indigo-600 hover:text-indigo-700"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="https://www.smartreply.io/policy-pages/privacy-policy"
                                className="text-indigo-600 hover:text-indigo-700"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>


        </div>
    );
}

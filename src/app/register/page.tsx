"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        company_name: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sme.namatechnologlies.com";

    // Track redirect state to prevent loops
    const hasRedirected = React.useRef(false);
    const isChecking = React.useRef(false);

    // Check if already logged in (has accessToken) - redirect to home
    // Only check once on mount to prevent loops
    useEffect(() => {
        if (isChecking.current) return;
        isChecking.current = true;
        
        // Wait a bit to ensure we're not in a redirect loop
        const timeoutId = setTimeout(() => {
            // Check if we're still on register page (not already redirected)
            if (window.location.pathname !== "/register" || hasRedirected.current) {
                return; // Already redirected, don't do anything
            }
            
            const accessToken = localStorage.getItem("accessToken");
            const googleAccessToken = localStorage.getItem("googleAccessToken");
            // User is authenticated if they have either token
            const isAuthenticated = accessToken || googleAccessToken;
            
            if (isAuthenticated && !hasRedirected.current) {
                hasRedirected.current = true;
                // Only redirect if we have a token and we're actually on the register page
                router.replace("/home");
            }
        }, 500);
        
        return () => clearTimeout(timeoutId);
    }, [router]);

    // Redirect if already logged in (only when authenticated, not during loading)
    useEffect(() => {
        // Prevent redirect if already redirected
        if (hasRedirected.current) return;
        
        // Only redirect if we have a confirmed authenticated session
        // Don't redirect during loading state
        if (status === "authenticated" && session) {
            // Store backend token in localStorage for API calls
            if (session.accessToken) {
                localStorage.setItem("accessToken", session.accessToken);
                localStorage.setItem("tokenType", session.tokenType || "Bearer");
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
            
            if (!hasRedirected.current) {
                hasRedirected.current = true;
                router.replace("/home");
            }
        }
        // If status is "unauthenticated" or "loading", do nothing - user can stay on register page
    }, [session, status, router]);
    
    // Additional effect to sync token when it becomes available (handles delayed token loading)
    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            localStorage.setItem("accessToken", session.accessToken);
            localStorage.setItem("tokenType", session.tokenType || "Bearer");
        }
    }, [session?.accessToken, session?.tokenType, status]);

    // Handle error from URL params
    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            switch (errorParam) {
                case 'OAuthSignin':
                case 'OAuthCallback':
                case 'OAuthCreateAccount':
                case 'EmailCreateAccount':
                case 'Callback':
                    setError('Google authentication failed. Please try again.');
                    break;
                case 'OAuthAccountNotLinked':
                    setError('An account with this email already exists. Please sign in instead.');
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
    }, [searchParams]);

    const handleGoogleSignup = async () => {
        setError("");
        setLoading(true);
        
        try {
            // Use redirect: false to handle the redirect manually
            const result = await signIn("google", {
                callbackUrl: "/home",
                redirect: false,
            });

            if (result?.error) {
                setError("Google authentication failed. Please try again.");
                setLoading(false);
            } else if (result?.ok) {
                // If successful, the session will be updated and useEffect will handle redirect
                // Don't set loading to false here as the redirect will happen
            } else {
                // If URL is returned, redirect to it (this handles the OAuth flow)
                if (result?.url) {
                    window.location.href = result.url;
                }
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("accessToken", data.access_token);
                localStorage.setItem("tokenType", data.token_type);
                if (!hasRedirected.current) {
                hasRedirected.current = true;
                router.replace("/home");
            }
            } else {
                const errorMsg = typeof data.detail === 'string'
                    ? data.detail
                    : JSON.stringify(data.detail) || "Registration failed. Please try again.";
                setError(errorMsg);
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-8 py-4 fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-zinc-100">
                <div className="text-xl font-bold text-zinc-900">SmartReply</div>
                <div className="flex items-center gap-6">
                    {showEmailForm ? (
                        <button
                            onClick={() => setShowEmailForm(false)}
                            className="text-indigo-600 hover:text-indigo-900 no-underline text-sm font-medium"
                        >
                            Back
                        </button>
                    ) : (
                        <Link
                            href="https://smartreply.io"
                            className="text-indigo-600 hover:text-indigo-900 no-underline text-sm font-medium"
                        >
                            Back
                        </Link>
                    )}
                    <Link
                        href="/login"
                        className="px-6 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 no-underline transition-colors"
                    >
                        SIGN IN
                    </Link>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="flex-1 flex pt-16">
                {/* Left Column - Welcome Section */}
                <div className="w-1/2 bg-white flex items-center justify-center p-12">
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
                        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
                            {showEmailForm ? "Create your account" : "What channel would you like to sign in with?"}
                        </h1>
                        <p className="text-zinc-600 text-sm">
                            {showEmailForm ? "Fill in your details to get started with SmartReply." : "Don't worry, you can connect other channels later."}
                        </p>
                    </div>
                </div>

                {/* Right Column - Form/Options Section */}
                <div className="w-1/2 bg-zinc-50 flex items-center justify-center p-24">
                    <div className="w-full max-w-md">
                        {error && (
                            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg">
                                {error}
                            </div>
                        )}

                        {!showEmailForm ? (
                            <div className="space-y-3">
                                {/* Google */}
                                <button
                                    onClick={handleGoogleSignup}
                                    className="flex items-center w-full py-4 px-6 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-zinc-900 mb-4"
                                >
                                    <img
                                        src="https://app.smartreply.io/assets/images/google-icon.png"
                                        className="w-8 h-8 mr-4"
                                        alt="Google Icon"
                                    />
                                    <div className="text-left flex-1">
                                        <h3 className="text-base font-semibold">Google</h3>
                                        <p className="text-xs text-zinc-600">
                                            Sign up with Google & select your channel after.
                                        </p>
                                    </div>
                                </button>

                                {/* Email */}
                                <button
                                    onClick={() => setShowEmailForm(true)}
                                    className="flex items-center w-full py-4 px-6 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-zinc-900"
                                >
                                    <img
                                        src="https://app.smartreply.io/assets/images/email-icon.svg"
                                        className="w-8 h-8 mr-4"
                                        alt="Email Icon"
                                    />
                                    <div className="text-left flex-1">
                                        <h3 className="text-base font-semibold">Email</h3>
                                        <p className="text-xs text-zinc-600">Sign up with your email address.</p>
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleEmailSignup} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        required
                                        value={formData.company_name}
                                        onChange={handleInputChange}
                                        placeholder="Acme Inc."
                                        className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="m.ovais@mindfind.com"
                                        className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••••"
                                        className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                >
                                    {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                                </button>
                                <p className="text-center text-xs text-zinc-500 mt-4">
                                    By signing up, you agree to our{" "}
                                    <Link href="#" className="text-indigo-600 hover:underline">Terms</Link> and{" "}
                                    <Link href="#" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


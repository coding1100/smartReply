"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        domain: "",
        phone: "",
        company_name: "",
        password: "",
        confirm_password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
            const facebookAccessToken = localStorage.getItem("facebookAccessToken");
            // User is authenticated if they have any token
            const isAuthenticated = accessToken || googleAccessToken || facebookAccessToken;
            
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
            
            // Store provider-specific OAuth access_token if available
            if (session.googleAccessToken) {
                localStorage.setItem("googleAccessToken", session.googleAccessToken);
            }
            if (session.facebookAccessToken) {
                localStorage.setItem("facebookAccessToken", session.facebookAccessToken);
            }
            
            // Only redirect if we have any token and haven't redirected yet
            const isAuthenticated = session.accessToken || session.googleAccessToken || session.facebookAccessToken;
            if (isAuthenticated && !hasRedirected.current) {
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
                    setError('OAuth authentication failed. Please try again.');
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

    const handleFacebookSignup = async () => {
        setError("");
        setLoading(true);
        
        try {
            // Use redirect: false to handle the redirect manually
            const result = await signIn("facebook", {
                callbackUrl: "/home",
                redirect: false,
            });

            if (result?.error) {
                setError("Facebook authentication failed. Please try again.");
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
        
        // Clear validation error for this field when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Required fields validation
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!formData.first_name.trim()) {
            errors.first_name = "First Name is required";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirm_password) {
            errors.confirm_password = "Please confirm your password";
        } else if (formData.password !== formData.confirm_password) {
            errors.confirm_password = "Passwords do not match";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setValidationErrors({});
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Prepare data for API (exclude confirm_password)
            const { confirm_password, ...apiData } = formData;
            
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(apiData),
            });

            const data = await response.json();

            if (response.ok) {
                // Don't store tokens on registration - user needs to login
                // Redirect to login page after successful registration
                if (!hasRedirected.current) {
                    hasRedirected.current = true;
                    router.replace("/login");
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
            <div className="flex items-center justify-between px-8 py-4 fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm">
                <div className="text-xl font-bold text-zinc-900">SmartReply</div>
                <div className="flex items-center gap-6">
                    {showEmailForm ? (
                        <>
                            {/* Show user info in sticky bar when filling email form */}
                            {(formData.first_name || formData.email || formData.company_name) && (
                                <div className="flex items-center gap-3 text-sm">
                                    {formData.first_name && (
                                        <span className="font-semibold text-zinc-900">
                                            {formData.first_name}
                                            {formData.last_name && ` ${formData.last_name}`}
                                        </span>
                                    )}
                                    {formData.email && (
                                        <>
                                            {formData.first_name && <span className="text-zinc-300">|</span>}
                                            <span className="text-zinc-600">
                                                {formData.email}
                                            </span>
                                        </>
                                    )}
                                    {formData.company_name && (
                                        <>
                                            {(formData.first_name || formData.email) && <span className="text-zinc-300">|</span>}
                                            <span className="text-zinc-600">
                                                {formData.company_name}
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}
                            <button
                                onClick={() => setShowEmailForm(false)}
                                className="text-indigo-600 hover:text-indigo-900 no-underline text-sm font-medium"
                            >
                                Back
                            </button>
                        </>
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
                        className="px-6 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 hover:shadow-sm no-underline transition-all"
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
                <div className="w-1/2 bg-zinc-50 flex items-center justify-center p-24 overflow-y-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md py-8"
                    >
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-4 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl shadow-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {!showEmailForm ? (
                            <div className="space-y-3">
                                {/* Google */}
                                <motion.button
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={handleGoogleSignup}
                                    className="flex items-center w-full py-4 px-6 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md hover:border-zinc-300 transition-all !no-underline !text-zinc-900 mb-4"
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
                                </motion.button>

                                {/* Facebook */}
                                <motion.button
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={handleFacebookSignup}
                                    className="flex items-center w-full py-4 px-6 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md hover:border-zinc-300 transition-all !no-underline !text-zinc-900 mb-4"
                                >
                                    <svg className="w-8 h-8 mr-4" viewBox="0 0 24 24" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    <div className="text-left flex-1">
                                        <h3 className="text-base font-semibold">Facebook</h3>
                                        <p className="text-xs text-zinc-600">
                                            Sign up with Facebook & select your channel after.
                                        </p>
                                    </div>
                                </motion.button>

                                {/* Email */}
                                <motion.button
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setShowEmailForm(true)}
                                    className="flex items-center w-full py-4 px-6 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md hover:border-zinc-300 transition-all !no-underline !text-zinc-900"
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
                                </motion.button>
                            </div>
                        ) : (
                            <form onSubmit={handleEmailSignup} className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                                        Enter your email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="m.ovais@mindfind.com"
                                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all ${
                                            validationErrors.email ? "border-red-300" : "border-zinc-200"
                                        }`}
                                    />
                                    {validationErrors.email && (
                                        <p className="mt-1 text-xs text-red-500">{validationErrors.email}</p>
                                    )}
                                </div>

                                {/* First Name and Last Name in a row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            required
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            placeholder="John"
                                            className={`w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all ${
                                                validationErrors.first_name ? "border-red-300" : "border-zinc-200"
                                            }`}
                                        />
                                        {validationErrors.first_name && (
                                            <p className="mt-1 text-xs text-red-500">{validationErrors.first_name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            placeholder="Doe"
                                            className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Domain */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Domain</label>
                                    <input
                                        type="text"
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleInputChange}
                                        placeholder="example.com"
                                        className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+1 234 567 8900"
                                        className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
                                    />
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleInputChange}
                                        placeholder="Acme Inc."
                                        className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••••"
                                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all ${
                                            validationErrors.password ? "border-red-300" : "border-zinc-200"
                                        }`}
                                    />
                                    {validationErrors.password && (
                                        <p className="mt-1 text-xs text-red-500">{validationErrors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        required
                                        value={formData.confirm_password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••••"
                                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all ${
                                            validationErrors.confirm_password ? "border-red-300" : "border-zinc-200"
                                        }`}
                                    />
                                    {validationErrors.confirm_password && (
                                        <p className="mt-1 text-xs text-red-500">{validationErrors.confirm_password}</p>
                                    )}
                                </div>

                                <motion.button
                                    whileHover={{ scale: loading ? 1 : 1.01 }}
                                    whileTap={{ scale: loading ? 1 : 0.99 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                >
                                    {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                                </motion.button>
                                <p className="text-center text-xs text-zinc-500 mt-4">
                                    By signing up, you agree to our{" "}
                                    <Link href="#" className="text-indigo-600 hover:underline">Terms</Link> and{" "}
                                    <Link href="#" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}


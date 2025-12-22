"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login attempt:", { email, password, rememberMe });
    };

    const handleFacebookLogin = () => {
        console.log("Facebook login clicked");
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
    };

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
                        className="px-6 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 !no-underline hover:!no-underline transition-colors absolute top-[20px] right-[20px]"
                    >
                        GET STARTED FREE
                    </Link>
                    <div className="w-full max-w-md space-y-4">
                        {/* Social Login Buttons */}
                        <button
                            onClick={handleFacebookLogin}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Continue With Facebook
                        </button>

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-zinc-300 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
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
                        </button>

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
                                    className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                                    className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-zinc-700">
                                        Remember me
                                    </span>
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                LOGIN
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-zinc-600 mt-6">
                            New to SmartReply?{" "}
                            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up
                            </Link>
                        </p>

                        {/* Footer Links */}
                        <div className="flex justify-center gap-6 mt-8 text-sm">
                            <Link
                                href="https://www.smartreply.io/policy-pages/terms-of-service"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="https://www.smartreply.io/policy-pages/privacy-policy"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            </button>
        </div>
    );
}

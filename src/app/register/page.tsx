"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        company_name: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sme.namatechnologlies.com";

    const handleGoogleSignup = () => {
        window.location.href = `${API_URL}/auth/login/google`;
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
                router.push("/smartreply/home");
            } else {
                setError(data.detail || "Registration failed. Please try again.");
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


"use client";

import React from "react";
import Link from "next/link";

export default function RegisterPage() {
    const handleGoogleSignup = () => {
        console.log("Google signup clicked");
    };

    const handleTwitterSignup = () => {
        console.log("Twitter signup clicked");
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-8 py-4 fixed top-0 left-0 right-0  z-10">
                <div className="text-xl font-bold text-zinc-900">SmartReply</div>
                <div className="flex items-center gap-6">
                    <Link
                        href="https://smartreply.io"
                        className="text-blue-600 hover:text-blue-900 no-underline text-sm"
                    >
                        Back
                    </Link>
                    <Link
                        href="/login"
                        className="px-6 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 no-underline transition-colors"
                    >
                        SIGN IN
                    </Link>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="flex-1 flex">
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
                            What channel would you like to sign in with?
                        </h1>
                        <p className="text-zinc-600 text-sm">
                            Don't worry, you can connect other channels later.
                        </p>
                    </div>
                </div>

                {/* Right Column - Channel Options */}
                <div className="w-1/2 bg-zinc-50 flex items-center justify-center p-24">
                    <div className="w-full max-w-md space-y-3">
                        {/* Google */}
                        <button
                            onClick={handleGoogleSignup}
                            className="flex items-center w-full py-3 px-5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-[#000] !mb-[12px] !rounded-[12px]"
                        >
                            <img
                                src="https://app.smartreply.io/assets/images/google-icon.png"
                                className="w-8 h-8 mr-4"
                                alt="Google Icon"
                            />
                            <div className="text-left flex-1">
                                <h3 className="text-base font-semibold text-zinc-900">Google</h3>
                                <p className="text-xs text-zinc-600">
                                    Sign up with Google & select your channel after.
                                </p>
                            </div>
                        </button>

                        {/* Instagram */}
                        <Link
                            href="/register/connect"
                            className="flex items-center w-full py-3 px-5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-[#000] no-underline text-zinc-900"
                        >
                            <img
                                src="https://app.smartreply.io/assets/images/instagram-icon.svg"
                                className="w-8 h-8 mr-4"
                                alt="Instagram Icon"
                            />
                            <div className="text-left flex-1">
                                <h3 className="text-base font-semibold text-zinc-900">
                                    Instagram
                                </h3>
                                <p className="text-xs text-zinc-600">
                                    Supercharge your social media marketing with Instagram Automation.
                                </p>
                            </div>
                        </Link>

                        {/* Facebook Messenger */}
                        <Link
                            href="/register/connect"
                            className="flex items-center w-full py-3 px-5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-[#000] no-underline text-zinc-900"
                        >
                            <img
                                src="https://app.smartreply.io/assets/images/messenger-icon.svg"
                                className="w-8 h-8 mr-4"
                                alt="Facebook Messenger Icon"
                            />
                            <div className="text-left flex-1">
                                <h3 className="text-base font-semibold text-zinc-900">
                                    Facebook Messenger
                                </h3>
                                <p className="text-xs text-zinc-600">
                                    Create Facebook Messenger automation to keep customers happy.
                                </p>
                            </div>
                        </Link>

                        {/* WhatsApp */}
                        <Link
                            href="/register/connect"
                            className="flex items-center w-full py-3 px-5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-[#000] no-underline text-zinc-900"
                        >
                            <img
                                src="https://app.smartreply.io/assets/images/whatsapp-icon.svg"
                                className="w-8 h-8 mr-4"
                                alt="WhatsApp Icon"
                            />
                            <div className="text-left flex-1">
                                <h3 className="text-base font-semibold text-zinc-900">
                                    WhatsApp
                                </h3>
                                <p className="text-xs text-zinc-600">
                                    Choose the most popular mobile messaging app in the world and reach 2 billion users.
                                </p>
                            </div>
                        </Link>

                        {/* Shopify */}
                        <Link
                            href="/register/connect/shopify"
                            className="flex items-center w-full py-3 px-5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-[#000] no-underline text-zinc-900"
                        >
                            <img
                                src="https://app.smartreply.io/assets/images/shopify.svg"
                                className="w-8 h-8 mr-4"
                                alt="Shopify Icon"
                            />
                            <div className="text-left flex-1">
                                <h3 className="text-base font-semibold text-zinc-900">Shopify</h3>
                                <p className="text-xs text-zinc-600">
                                    Sign up with the most popular ecommerce platform.
                                </p>
                            </div>
                        </Link>

                        {/* X/Twitter */}
                        <button
                            onClick={handleTwitterSignup}
                            className="flex items-center w-full py-3 px-5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-[#000] !rounded-[12px] !mb-[12px]"
                        >
                            <img
                                src="https://app.smartreply.io/assets/images/x-icon.svg"
                                className="w-8 h-8 mr-4"
                                alt="Twitter Icon"
                            />
                            <div className="text-left flex-1">
                                <h3 className="text-base font-semibold text-zinc-900">
                                    X/Twitter
                                </h3>
                                <p className="text-xs text-zinc-600">Sign up with X.</p>
                            </div>
                        </button>

                        {/* Email */}
                        <Link
                            href="/register/connect/email"
                            className="flex items-center w-full py-3 px-5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all !no-underline !text-[#000] no-underline text-zinc-900"
                        >
                            <img
                                src="https://app.smartreply.io/assets/images/email-icon.svg"
                                className="w-8 h-8 mr-4"
                                alt="Email Icon"
                            />
                            <div className="text-left flex-1">
                                <h3 className="text-base font-semibold text-zinc-900">Email</h3>
                                <p className="text-xs text-zinc-600">Sign up with Email</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

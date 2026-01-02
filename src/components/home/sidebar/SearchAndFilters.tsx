import React, { useState, useRef, useEffect } from "react";

// Dropdown Data
const FILTER_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Actions", value: "all_actions" },
    { label: "Open Actions", value: "open_actions" },
    { label: "All Quality", value: "all_quality" },
    { label: "Quality 3 & Up", value: "quality_3" },
    { label: "Quality 4 & Up", value: "quality_4" },
    { label: "Quality 5", value: "quality_5" },
    { label: "Follow Up", value: "follow_up" },
    { label: "Long Thread", value: "long_thread" },
    { label: "Auto Reply Off", value: "auto_reply_off" },
    { label: "Link Clicks", value: "link_clicks" },
    { label: "Unsubscribed/Unqualified", value: "unsubscribed" },
];

const PLATFORM_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Social Media", value: "social_media" },
    { label: "Facebook", value: "page" },
    { label: "Instagram", value: "instagram" },
    { label: "WhatsApp", value: "whatsapp" },
    { label: "TikTok", value: "tiktok" },
    { label: "TikTok Shop", value: "tiktokshop" },
    { label: "Gmail", value: "gmail" },
    { label: "Website Chatbot", value: "website" },
];

const SENTIMENT_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Positive", value: "positive" },
    { label: "Neutral", value: "neutral" },
    { label: "Negative", value: "negative" },
];

export function SearchAndFilters() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleAction = (action: string, value?: string) => {
        console.log(`Action: ${action}, Value: ${value}`);
        setActiveDropdown(null); // Close after selection
    };

    return (
        <div ref={wrapperRef}>
            {/* Search Input */}
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        className="h-4 w-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full rounded-md border-0 bg-zinc-100 py-2 pl-9 pr-4 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none"
                    placeholder="Search here..."
                />
            </div>

            {/* Filters Row */}
            <div className="mt-3 flex items-center justify-between text-xs text-zinc-600 relative">
                <div className="flex gap-4">

                    {/* Filters Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown("filters")}
                            className="group flex items-center gap-1 hover:text-indigo-600 !text-[14px]"
                        >
                            <i className="bi bi-funnel text-zinc-400 group-hover:text-indigo-500"></i>
                            <span className="font-medium">Filters:</span>
                            <i className="bi bi-chevron-down text-[10px] text-zinc-400 group-hover:text-indigo-500"></i>
                        </button>
                        {activeDropdown === "filters" && (
                            <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                {FILTER_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleAction("filterChats", opt.value)}
                                        className="block w-full px-4 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-100"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Platform Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown("platform")}
                            className="group flex items-center gap-1 hover:text-indigo-600 !text-[14px]"
                        >
                            <i className="bi bi-layers text-zinc-400 group-hover:text-indigo-500"></i>
                            <span className="font-medium">Platform:</span>
                            <i className="bi bi-chevron-down text-[10px] text-zinc-400 group-hover:text-indigo-500"></i>
                        </button>
                        {activeDropdown === "platform" && (
                            <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                {PLATFORM_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleAction("filterPlatform", opt.value)}
                                        className="block w-full px-4 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-100"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sentiment Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown("sentiment")}
                            className="group flex items-center gap-1 hover:text-indigo-600 !text-[14px]"
                        >
                            <i className="bi bi-emoji-smile text-zinc-400 group-hover:text-indigo-500"></i>
                            <span className="font-medium">Sentiment:</span>
                            <i className="bi bi-chevron-down text-[10px] text-zinc-400 group-hover:text-indigo-500"></i>
                        </button>
                        {activeDropdown === "sentiment" && (
                            <div className="absolute left-0 top-full z-10 mt-1 w-32 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                {SENTIMENT_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleAction("filterSentiment", opt.value)}
                                        className="block w-full px-4 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-100"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Settings Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown("settings")}
                        className="text-zinc-400 hover:text-zinc-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </button>
                    {activeDropdown === "settings" && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            <a
                                href="https://app.smartreply.io/smartreply/settings"
                                target="_blank"
                                className="flex w-full items-center px-4 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                <span>Settings</span>
                            </a>

                            <button
                                onClick={() => handleAction("toggleAgentStatus")}
                                className="flex w-full items-center px-4 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="16" cy="12" r="3"></circle></svg>
                                <span>Turn off</span>
                            </button>

                            <a
                                href="https://facebook.com/profile.php?id=645232738675563"
                                target="_blank"
                                className="flex w-full items-center px-4 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                <span>Go to FB Page</span>
                            </a>

                            <button
                                onClick={() => handleAction("openExportModal")}
                                className="flex w-full items-center px-4 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                <span>Export to CSV</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

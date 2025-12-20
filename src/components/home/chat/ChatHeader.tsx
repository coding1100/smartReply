import React from "react";
import { BootstrapSwitch } from "@/components/common/BootstrapSwitch";

interface ChatHeaderProps {
    customerName: string;
    adId?: string;
    customerAvatar: string;
    isOnline: boolean;
    autoReply: boolean;
    onAutoReplyChange: (checked: boolean) => void;
}

export function ChatHeader({
    customerName,
    adId,
    customerAvatar,
    isOnline,
    autoReply,
    onAutoReplyChange,
}: ChatHeaderProps) {
    return (
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-6 py-3">
            <div className="flex items-center gap-4">
                {/* Mobile Back Button (Hidden on lg) */}
                <button className="text-zinc-500 hover:text-zinc-700 lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="9 14 4 9 9 4"></polyline>
                        <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
                    </svg>
                </button>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={customerAvatar}
                            className="h-10 w-10 rounded-full object-cover"
                            alt="avatar"
                        />
                        {isOnline && (
                            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"></div>
                        )}
                    </div>
                    <div>
                        <div className="font-semibold text-zinc-900">{customerName}</div>
                        <div className="text-xs text-zinc-500">Ad ID: {adId}</div>
                    </div>
                </div>

                <div className="ml-4 flex items-center gap-2 rounded-full  px-3 py-1">
                    <BootstrapSwitch
                        checked={autoReply}
                        onChange={onAutoReplyChange}
                        id="header_auto_reply"
                    />
                    <label
                        htmlFor="header_auto_reply"
                        className="cursor-pointer text-xs font-medium text-blue-700"
                    >
                        Auto Reply
                    </label>
                </div>
            </div>

            <button className="text-zinc-400 hover:text-zinc-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
            </button>
        </div>
    );
}

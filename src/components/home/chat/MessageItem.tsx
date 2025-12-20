import React, { useState } from "react";

export interface Message {
    id: string | number;
    sender: "me" | "friend";
    name: string;
    avatarUrl: string;
    text: string;
    time: string;
    isAi?: boolean;
    isPrivateReply?: boolean;
    commentUrl?: string;
}

interface MessageItemProps {
    message: Message;
    isCommentMode?: boolean;
}

export function MessageItem({ message, isCommentMode = false }: MessageItemProps) {
    const isMe = message.sender === "me";
    const [showMenu, setShowMenu] = useState(false);

    // If in comment mode, styling is slightly different. 
    // Per image, it looks like a flat structure, left aligned bubbles, with actions below/beside.

    if (isCommentMode) {
        return (
            <div className="flex w-full mb-4 justify-start">
                <div className="flex w-full gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <img
                            src={message.avatarUrl}
                            className="h-10 w-10 rounded-full border border-zinc-200 object-cover"
                            alt="avatar"
                        />
                    </div>

                    <div className="flex flex-col items-start w-full">
                        {/* Name */}
                        <span className="!text-sm !font-semibold text-zinc-900 mb-1">{message.name}</span>

                        {/* Bubble Row */}
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50/50 rounded-xl px-4 py-2 text-sm text-zinc-800 shadow-sm border border-blue-100">
                                <div dangerouslySetInnerHTML={{ __html: message.text }} />
                            </div>

                            {/* Actions: Heart, Menu */}
                            <button className="text-zinc-400 hover:text-red-500">
                                <i className="far fa-heart"></i>
                            </button>

                            <div className="relative">
                                <button onClick={() => setShowMenu(!showMenu)} className="text-zinc-400 hover:text-zinc-600">
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                                {showMenu && (
                                    <div className="absolute left-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-zinc-100 z-10 py-1">
                                        <button className="block w-full text-left px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50">Open Training</button>
                                        <button className="block w-full text-left px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50">Reprocess</button>
                                        <button className="block w-full text-left px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50">Go to Profile</button>
                                        <button className="block w-full text-left px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50">Delete</button>
                                        <button className="block w-full text-left px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50">Hide Comment</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Row: Time, Reply link */}
                        <div className="flex items-center gap-3 mt-1 ml-1 text-xs text-zinc-400">
                            <span>{message.time}</span>
                            <button className="font-medium text-blue-600 hover:underline">Send Reply</button>
                        </div>
                        <div className="ml-1 mt-0.5 text-xs">
                            <button className="text-blue-500 hover:underline">Show Replies (1)</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Standard Chat View (Existing)
    return (
        <div className={`flex w-full mb-[20px] ${isMe ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>

                {/* Avatar */}
                <div className="flex-shrink-0">
                    <img
                        src={message.avatarUrl}
                        className="h-8 w-8 rounded-full border border-zinc-200 object-cover"
                        alt="avatar"
                    />
                </div>

                {/* Bubble Content */}
                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    {/* Name Row */}
                    <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-zinc-900">{message.name}</span>
                        {message.isAi && (
                            <span className="rounded bg-blue-100 px-1 py-0.5 text-[10px] font-bold text-blue-600">AI</span>
                        )}
                        <span className="text-[10px] text-zinc-400">{message.time}</span>
                    </div>

                    {/* Private Reply Note */}
                    {message.isPrivateReply && (
                        <div className="mb-2 text-xs text-zinc-500">
                            This was sent as a private message to a comment.
                            {message.commentUrl && (
                                <a href={message.commentUrl} target="_blank" rel="noreferrer" className="ml-1 font-medium text-blue-600 hover:underline">View comment</a>
                            )}
                        </div>
                    )}

                    {/* Bubble */}
                    <div
                        className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${isMe
                            ? "rounded-tr-sm bg-blue-600 text-white"
                            : "rounded-tl-sm bg-zinc-100 text-zinc-800"
                            }`}
                    >
                        <div dangerouslySetInnerHTML={{ __html: message.text }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

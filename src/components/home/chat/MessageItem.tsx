import React from "react";

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

export function MessageItem({ message }: { message: Message }) {
    const isMe = message.sender === "me";

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

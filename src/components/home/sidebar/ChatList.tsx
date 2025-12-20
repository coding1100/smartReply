import React from "react";

export interface ChatPreview {
    id: string;
    name: string;
    message: string;
    time: string;
    avatarUrl: string;
    platformIcon: string;
    isActive?: boolean;
}

interface ChatListProps {
    chats: ChatPreview[];
    activeId: string;
    onSelectChat: (id: string) => void;
}

export function ChatList({ chats, activeId, onSelectChat }: ChatListProps) {
    return (
        <div className="py-2">
            <div className="px-4 pb-2 text-xs font-semibold text-zinc-500">
                Recent chats
            </div>
            <ul className="space-y-1">
                {chats.map((chat) => {
                    const isActive = chat.id === activeId;
                    return (
                        <li key={chat.id}>
                            <button
                                onClick={() => onSelectChat(chat.id)}
                                className={`flex w-full items-center justify-between border-l-4 px-4 py-3 transition-colors hover:bg-zinc-50 ${isActive
                                        ? "border-blue-600 bg-blue-50/50"
                                        : "border-transparent"
                                    }`}
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="relative shrink-0">
                                        <img
                                            src={chat.platformIcon}
                                            alt="Platform"
                                            className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-white"
                                        />
                                        {/* Using avatarUrl if available, or placeholder/icon if that's what was intended. 
                         Snippet used platformIcon as main image in some places, but let's assume standard avatar. 
                         Actually snippet used platformIcon for the main image? 
                         "img src={chat.platformIcon}" 
                         Let's stick to that but standard is avatar. 
                         Update: use avatarUrl for user face, platformIcon for small badge if possible.
                         But the mock data has identical URLs. 
                         I'll use avatarUrl for the main image.
                     */}
                                        <img
                                            src={chat.avatarUrl}
                                            alt={chat.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 text-left">
                                        <div className="flex items-center gap-2">
                                            <span className={`truncate text-sm font-semibold ${isActive ? "text-blue-900" : "text-zinc-900"}`}>
                                                {chat.name}
                                            </span>
                                        </div>
                                        <div className="truncate text-xs text-zinc-500">
                                            {chat.message}
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 text-right">
                                    <div className="text-[10px] text-zinc-400">{chat.time}</div>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

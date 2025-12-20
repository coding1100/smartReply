import React from "react";

interface ChatLayoutProps {
    sidebar: React.ReactNode;
    chat: React.ReactNode;
    rightSidebar: React.ReactNode;
}

export function ChatLayout({ sidebar, chat, rightSidebar }: ChatLayoutProps) {
    return (
        <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-white">
            {/* 3-Pane Layout */}
            {sidebar}
            {chat}
            {rightSidebar}
        </div>
    );
}

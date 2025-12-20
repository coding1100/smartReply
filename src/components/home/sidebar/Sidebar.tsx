import React, { useState } from "react";
import { SidebarTabs, SidebarTab } from "./SidebarTabs";
import { SearchAndFilters } from "./SearchAndFilters";
import { ChatList, ChatPreview } from "./ChatList";

interface SidebarProps {
    activeTab: SidebarTab;
    onTabChange: (tab: SidebarTab) => void;
    chats: ChatPreview[];
    activeChatId: string;
    onSelectChat: (id: string) => void;
}

// Mock Data for Comments
const MOCK_COMMENTS: ChatPreview[] = [
    {
        id: "comment_1",
        name: "Awais Jutt",
        message: "thats beautifull",
        time: "4 days ago",
        avatarUrl: "https://app.smartreply.io/assets/images/traffic_sources/facebook.png", // Using the platform icon as avatar per snippet
        platformIcon: "https://app.smartreply.io/assets/images/traffic_sources/facebook.png",
        isActive: false,
    },
];

export function Sidebar({
    activeTab,
    onTabChange,
    chats,
    activeChatId,
    onSelectChat,
}: SidebarProps) {
    // In a real app, you might lift this state up or fetch it. 
    // For now, we use local mock data for the comments tab.
    const [activeCommentId, setActiveCommentId] = useState<string>("");

    const handleSelectComment = (id: string) => {
        setActiveCommentId(id);
        // You might also want to trigger an onSelectChat or similar prop if the parent needs to know
        console.log("Selected comment:", id);
    };

    return (
        <div className="flex w-[500px] flex-none flex-col border-r border-zinc-200 bg-white">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="border-b border-zinc-100 p-4 pb-2">
                    <SidebarTabs activeTab={activeTab} onTabChange={onTabChange} />
                    <div className="mt-4">
                        <SearchAndFilters />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === "chats" && (
                        <ChatList
                            chats={chats}
                            activeId={activeChatId}
                            onSelectChat={onSelectChat}
                        />
                    )}

                    {activeTab === "comments" && (
                        <ChatList
                            chats={MOCK_COMMENTS}
                            activeId={activeCommentId}
                            onSelectChat={handleSelectComment}
                        />
                    )}

                    {activeTab === "subscribers" && (
                        <div className="p-4 text-center text-sm text-zinc-500">
                            No recent subscribers
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

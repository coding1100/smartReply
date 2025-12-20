"use client";

import React, { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";

// --- MOCK DATA ---
const MOCK_CONVERSATIONS = [
    {
        id: "t_2122612654922893",
        platform: "facebook",
        sender: "Awais Jutt",
        avatar: "https://app.smartreply.io/assets/images/placeholder.jpg", // Placeholder
        lastMessage: "Awesome, Warm Contemporary it is! Here are 3 curated directions I’ll p...",
        timestamp: "4 days ago",
    },
    {
        id: "t_insta_12345",
        platform: "instagram",
        sender: "John Doe",
        avatar: "https://app.smartreply.io/assets/images/placeholder.jpg",
        lastMessage: "Can you send the pricing?",
        timestamp: "5 hour ago",
    },
    // Add more to test scroll if needed
];

const MOCK_MESSAGES = [
    {
        id: "m_1",
        sender: "Awais Jutt",
        text: "Hi",
        timestamp: "Tue, Jun 3, 2025 7:39 AM",
        avatar: "https://app.smartreply.io/assets/images/placeholder.jpg",
    },
    {
        id: "m_2",
        sender: "Awais Jutt",
        text: "I am interested in this property.",
        timestamp: "Tue, Jun 3, 2025 7:40 AM",
        avatar: "https://app.smartreply.io/assets/images/placeholder.jpg",
    },
];

export default function MessageSelectorPage() {
    const [platform, setPlatform] = useState<"facebook" | "instagram">("facebook");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

    // Filter conversations by platform
    const filteredConversations = MOCK_CONVERSATIONS.filter(c => c.platform === platform);

    const handleOpenModal = (conversationId: string) => {
        setSelectedConversationId(conversationId);
        setIsModalOpen(true);
        // In a real app, you'd fetch messages for this ID here
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedConversationId(null);
    };

    const toggleMessageSelection = (msgId: string) => {
        setSelectedMessages(prev =>
            prev.includes(msgId)
                ? prev.filter(id => id !== msgId)
                : [...prev, msgId]
        );
    };

    return (
        <AdminLayout>
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-6 flex flex-col">
                    <h1 className="text-2xl font-bold text-zinc-900">Message Selector</h1>
                    <p className="text-zinc-500">Select Messages to Train your Agent</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column: User List & Tabs */}
                    <div className="lg:w-2/3">
                        {/* Tabs */}
                        <div className="mb-6 flex gap-3">
                            <button
                                onClick={() => setPlatform("facebook")}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${platform === "facebook"
                                        ? "bg-[#5A6BF2] text-white shadow-sm"
                                        : "bg-white border border-blue-200 text-[#5A6BF2] hover:bg-blue-50"
                                    }`}
                            >
                                Facebook
                            </button>
                            <button
                                onClick={() => setPlatform("instagram")}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${platform === "instagram"
                                        ? "bg-[#5A6BF2] text-white shadow-sm"
                                        : "bg-white border border-blue-200 text-[#5A6BF2] hover:bg-blue-50"
                                    }`}
                            >
                                Instagram
                            </button>
                        </div>

                        {/* User List */}
                        <div className="space-y-4">
                            {filteredConversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex-1 min-w-0 pr-6">
                                        <div className="text-xs text-zinc-400 mb-1.5">
                                            {conv.platform === "facebook" ? "Facebook" : "Instagram"}
                                        </div>
                                        <h5 className="text-lg font-bold text-zinc-900 truncate mb-1">
                                            {conv.sender}
                                        </h5>
                                        <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                                            {conv.lastMessage}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleOpenModal(conv.id)}
                                        className="shrink-0 rounded-full border border-[#5A6BF2] bg-white px-6 py-2 text-sm font-medium text-[#5A6BF2] hover:bg-blue-50 transition-colors"
                                    >
                                        Open
                                    </button>
                                </div>
                            ))}

                            {/* Load More Mock */}
                            <button className="rounded-full bg-[#5A6BF2] px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm mt-4">
                                Load More
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Selected Conversations Mock */}
                    <div className="lg:w-1/3">
                        <div className="mb-1">
                            <h4 className="text-lg font-bold text-zinc-900">Selected Conversations</h4>
                            <p className="text-sm text-zinc-500 font-medium">Selected Messages and Replies</p>
                        </div>

                        <div className="space-y-4 mt-4">
                            {/* Placeholder for selected item in sidebar */}
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-400 flex items-center justify-center text-white">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h6 className="text-sm font-bold text-zinc-900 truncate">Awais Jutt</h6>
                                    <div className="text-xs text-zinc-400 truncate">Page Conversation ID: t_2122...</div>
                                </div>
                            </div>

                            {/* Message Item Mock in Sidebar */}
                            <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-sm flex items-start gap-3">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-400 flex items-center justify-center text-white">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-sm font-bold text-zinc-900">Awais Jutt</span>
                                        <span className="text-xs text-zinc-400">✓</span>
                                    </div>
                                    <div className="text-xs text-zinc-400 mb-2">Tue, Jun 3, 2025 7:39 AM</div>
                                    <p className="text-sm text-zinc-900">Hi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MESSAGE SELECTOR MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={handleCloseModal} />

                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-5xl transform rounded-xl bg-white shadow-2xl transition-all flex flex-col max-h-[90vh]">

                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-900">Messages</h3>
                                    <p className="text-sm text-zinc-500">Click on messages to select them to train your agent.</p>
                                </div>
                                <button onClick={handleCloseModal} className="text-zinc-400 hover:text-zinc-600">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-hidden p-6">
                                <div className="flex h-full gap-6">

                                    {/* Left: Message List */}
                                    <div className="flex-1 overflow-y-auto pr-2">
                                        {MOCK_MESSAGES.map(msg => {
                                            const isSelected = selectedMessages.includes(msg.id);
                                            return (
                                                <div
                                                    key={msg.id}
                                                    onClick={() => toggleMessageSelection(msg.id)}
                                                    className={`mb-3 cursor-pointer rounded-lg border p-4 transition-all ${isSelected
                                                            ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                                                            : "border-zinc-200 bg-white hover:border-blue-300"
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex gap-3">
                                                            <img src={msg.avatar} alt={msg.sender} className="h-10 w-10 rounded-full" />
                                                            <div>
                                                                <h5 className="font-semibold text-zinc-900">{msg.sender}</h5>
                                                                <span className="text-xs text-zinc-500">{msg.timestamp}</span>
                                                            </div>
                                                        </div>
                                                        {isSelected && (
                                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="mt-2 text-zinc-800">{msg.text}</p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Right: Selected Summary (Mock) */}
                                    <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 p-4 overflow-y-auto">
                                        <h5 className="font-semibold text-zinc-900 mb-3">Selected Messages and Replies</h5>
                                        {selectedMessages.length === 0 ? (
                                            <p className="text-zinc-500 text-sm">No messages selected.</p>
                                        ) : (
                                            <div className="space-y-3">
                                                {selectedMessages.map(id => {
                                                    const msg = MOCK_MESSAGES.find(m => m.id === id);
                                                    if (!msg) return null;
                                                    return (
                                                        <div key={id} className="bg-white p-3 rounded border border-zinc-200 shadow-sm text-sm">
                                                            <span className="font-medium text-blue-600">{msg.sender}:</span> {msg.text}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="border-t border-zinc-100 px-6 py-4 flex justify-end">
                                <button
                                    onClick={handleCloseModal}
                                    className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Save and close
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

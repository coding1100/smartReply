import React from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatFooter } from "./ChatFooter";
import { Message } from "./MessageItem";

interface ChatWindowProps {
    messages: Message[];
    customerName: string;
    adId?: string;
    customerAvatar: string;
    isOnline: boolean;
    autoReply: boolean;
    onAutoReplyChange: (checked: boolean) => void;
    composerValue: string;
    onComposerChange: (value: string) => void;
    onSend: () => void;
    onManualAction?: () => void;
}

export function ChatWindow({
    messages,
    customerName,
    adId,
    customerAvatar,
    isOnline,
    autoReply,
    onAutoReplyChange,
    composerValue,
    onComposerChange,
    onSend,
    onManualAction,
}: ChatWindowProps) {
    return (
        <div className="flex flex-1 flex-col min-w-0 bg-white">
            {/* Loading Overlay (Hidden) */}
            <div className="hidden absolute inset-0 items-center justify-center bg-white/50 z-50">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            </div>

            <div className="flex flex-col h-full overflow-hidden relative">
                <ChatHeader
                    customerName={customerName}
                    adId={adId}
                    customerAvatar={customerAvatar}
                    isOnline={isOnline}
                    autoReply={autoReply}
                    onAutoReplyChange={onAutoReplyChange}
                />
                <MessageList messages={messages} />
                <ChatFooter
                    value={composerValue}
                    onChange={onComposerChange}
                    onSend={onSend}
                    onManualAction={onManualAction}
                />
            </div>
        </div>
    );
}

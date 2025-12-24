import React from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatFooter } from "./ChatFooter";
import { Message } from "./MessageItem";

import { ManualActionModal } from "./ManualActionModal";

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
    isCommentMode?: boolean;
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
    isCommentMode = false,
}: ChatWindowProps) {
    const [isManualActionModalOpen, setIsManualActionModalOpen] = React.useState(false);

    const handleSaveManualAction = () => {
        // Here you would handle saving the manual action data
        // For now, we'll just close the modal and call the optional prop functionality
        console.log("Manual action saved");
        if (onManualAction) {
            onManualAction();
        }
        setIsManualActionModalOpen(false);
    };

    return (
        <div className="flex flex-1 flex-col min-w-0 bg-white h-full overflow-hidden">
            {/* Loading Overlay (Hidden) */}
            <div className="hidden absolute inset-0 items-center justify-center bg-white/50 z-50">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
            </div>

            <div className="flex flex-col h-full overflow-hidden relative">
                <ChatHeader
                    customerName={customerName}
                    adId={adId}
                    customerAvatar={customerAvatar}
                    isOnline={isOnline}
                    autoReply={autoReply}
                    onAutoReplyChange={onAutoReplyChange}
                    isCommentMode={isCommentMode}
                />
                <MessageList messages={messages} isCommentMode={isCommentMode} />
                <ChatFooter
                    value={composerValue}
                    onChange={onComposerChange}
                    onSend={onSend}
                    onManualAction={() => setIsManualActionModalOpen(true)}
                />
            </div>

            <ManualActionModal
                isOpen={isManualActionModalOpen}
                onClose={() => setIsManualActionModalOpen(false)}
                onSave={handleSaveManualAction}
            />
        </div>
    );
}

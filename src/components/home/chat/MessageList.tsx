import React from "react";
import { Message, MessageItem } from "./MessageItem";

interface MessageListProps {
    messages: Message[];
    isCommentMode?: boolean;
}

export function MessageList({ messages, isCommentMode }: MessageListProps) {
    // Auto-scroll removed per request
    // const messagesEndRef = React.useRef<HTMLDivElement>(null);

    // React.useEffect(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);

    return (
        <div
            className="chat-body ps--active-y p-[10px]"
            style={{
                flexGrow: "1",
                overflowY: "auto",
            }}
        >
            <ul
                className="messages"
                style={{ maxWidth: "100%" }}
                id="chatMessagesContainer"
            >
                {/* Date Headers could be dynamic, but hardcoding for now based on snippet or injecting as special message types */}
                <div
                    className="date-header"
                    style={{
                        textAlign: "center",
                        color: "#6c757d",
                        margin: "10px 0",
                    }}
                >
                    4 days 3 hours ago
                </div>

                {messages.map((msg) => (
                    <MessageItem key={msg.id} message={msg} />
                ))}
                {/* <div ref={messagesEndRef} /> */}
            </ul>
        </div>
    );
}

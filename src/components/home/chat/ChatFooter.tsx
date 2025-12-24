import React from "react";

interface ChatFooterProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    onManualAction?: () => void;
}

export function ChatFooter({
    value,
    onChange,
    onSend,
    onManualAction,
}: ChatFooterProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 bg-white p-4">
            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center !rounded-full border border-zinc-200 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600"
                title="Add manual action"
                onClick={onManualAction}
            >
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
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
            </button>

            <div className="flex-grow">
                <textarea
                    rows={1}
                    className="block w-full resize-none rounded-full border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500"
                    placeholder="Type a message"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center !rounded-full bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                onClick={onSend}
            >
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
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
    );
}

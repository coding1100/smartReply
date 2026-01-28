"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChatLayout } from "./layout/ChatLayout";
import { Sidebar } from "./sidebar/Sidebar";
import { ChatWindow } from "./chat/ChatWindow";
import { RightSidebar } from "./right-sidebar/RightSidebar";
import { Message } from "./chat/MessageItem";
import { ChatPreview } from "./sidebar/ChatList";
import { Customer } from "./right-sidebar/CustomerProfile";

import { api, ConversationSummary, MessageSummary } from "../../services/api";

type HomeTab = "chats" | "comments" | "subscribers";

interface ExtendedChatPreview extends ChatPreview {
  platform: "facebook" | "instagram";
}


export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Verify authentication on mount
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("⚠️ No access token found, redirecting to login...");
      router.replace("/login");
    }
  }, [router]);

  const [tab, setTab] = React.useState<HomeTab>("chats");
  const [activeChatId, setActiveChatId] = React.useState<string | null>(null);
  const [composerText, setComposerText] = React.useState("");
  const [autoReply, setAutoReply] = React.useState(true);

  // API Data State
  const [chats, setChats] = React.useState<ExtendedChatPreview[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Load Chats or Comments when tab changes
  React.useEffect(() => {
    loadList(tab);
  }, [tab]);

  // Load Messages when activeChatId changes
  React.useEffect(() => {
    if (activeChatId) {
      loadMessages(activeChatId, tab);
    } else {
      setMessages([]);
      setCustomer(null);
    }
  }, [activeChatId, tab]);

  const loadList = async (currentTab: HomeTab) => {
    setLoading(true);
    try {
      if (currentTab === "chats") {
        const data = await api.messenger.getConversations();
        const mapped: ExtendedChatPreview[] = data.map((c: any) => ({
          id: c.id,
          name: c.participants?.[0]?.name || "Unknown",
          message: c.snippet,
          time: new Date(c.updated_time).toLocaleDateString(),
          avatarUrl: "https://app.smartreply.io/assets/images/placeholder.jpg",
          platformIcon: "https://app.smartreply.io/assets/images/traffic_sources/facebook.png",
          platform: "facebook",
          isActive: false,
        }));
        setChats(mapped);
        if (mapped.length > 0 && !activeChatId) {
          setActiveChatId(mapped[0].id);
        }
      } else if (currentTab === "comments") {
        // Re-using comments/getAll endpoint from API
        const data = await api.comments.getAll();
        const mapped: ExtendedChatPreview[] = data.map((c: any) => ({
          id: c.id,
          name: c.from?.name || "User",
          message: c.message,
          time: new Date(c.created_time).toLocaleDateString(),
          avatarUrl: "https://app.smartreply.io/assets/images/placeholder.jpg",
          platformIcon: "https://app.smartreply.io/assets/images/traffic_sources/facebook.png",
          platform: "facebook",
          isActive: false,
        }));
        setChats(mapped);
        if (mapped.length > 0 && !activeChatId) {
          setActiveChatId(mapped[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load list", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (id: string, currentTab: HomeTab) => {
    try {
      if (currentTab === "chats") {
        const data = await api.messenger.getMessages(id);
        const mappedMsgs: Message[] = data.map((m: any) => ({
          id: m.id,
          sender: m.from ? "friend" : "me", // Simple heuristic, actual API should tell us
          name: m.from?.name || "Me",
          avatarUrl: "https://app.smartreply.io/assets/images/placeholder.jpg",
          text: m.message,
          time: new Date(m.created_time).toLocaleTimeString(),
          isAi: false, // Default
        }));
        setMessages(mappedMsgs);
        // Verify customer logic
        const chat = chats.find(c => c.id === id);
        if (chat) {
          setCustomer({
            id: chat.id,
            name: chat.name,
            avatarUrl: chat.avatarUrl,
            tags: ["Facebook"],
          });
        }
      } else if (currentTab === "comments") {
        // For comments, we might not have a full thread view in the same way, 
        // but let's assume we can fetch replies
        // NOTE: Implementation depends on API capabilities for comment threads
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  const handleSend = async () => {
    if (!composerText.trim() || !activeChatId) return;
    try {
      if (tab === "chats") {
        await api.messenger.sendMessage(activeChatId, composerText);
        // Optimistic update
        const newMsg: Message = {
          id: Date.now(),
          sender: "me",
          name: "Me",
          avatarUrl: "https://app.smartreply.io/assets/images/placeholder.jpg",
          text: composerText,
          time: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, newMsg]);
      }
      setComposerText("");
    } catch (err) {
      console.error("Failed to send", err);
      alert("Failed to send message");
    }
  };

  // Enhance chats with isActive state for Sidebar
  const displayedChats = chats.map(c => ({
    ...c,
    isActive: c.id === activeChatId
  }));

  return (
    <ChatLayout
      sidebar={
        <Sidebar
          activeTab={tab}
          onTabChange={setTab}
          chats={displayedChats}
          activeChatId={activeChatId || ""}
          onSelectChat={setActiveChatId}
        />
      }
      chat={
        <ChatWindow
          messages={messages}
          customerName={customer ? customer.name : "Select a chat"}
          customerAvatar={customer ? customer.avatarUrl : ""}
          adId={""}
          isOnline={true}
          autoReply={autoReply}
          onAutoReplyChange={setAutoReply}
          composerValue={composerText}
          onComposerChange={setComposerText}
          onSend={handleSend}
          onManualAction={() => console.log("Manual action")}
          isCommentMode={tab === "comments"}
        />
      }
      rightSidebar={<RightSidebar customer={customer} />}
    />
  );
}

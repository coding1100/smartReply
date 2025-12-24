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

// --- MOCK DATA FOR CHATS TAB ---
const MOCK_CHATS: ChatPreview[] = [
  {
    id: "t_2122612654922893",
    name: "Awais Jutt",
    message: "i like the 2nd option",
    time: "4 days ago",
    avatarUrl:
      "https://app.smartreply.io/assets/images/traffic_sources/facebook.png",
    platformIcon:
      "https://app.smartreply.io/assets/images/traffic_sources/facebook.png",
  },
];

const MOCK_CHAT_MESSAGES: Message[] = [
  {
    id: 1526687,
    sender: "me",
    name: "Wise man",
    avatarUrl:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/502586578_2121943574989801_801439392086419003_n.jpg?stp=c341.0.1365.1365a_cp0_dst-jpg_s50x50_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f907e8&_nc_eui2=AeGB6r9xqokwK7wrrTPZGgqlYfzXYouZ6bBh_Ndii5npsHdgWSOTEzsLrEA6hl0HVG0IQSGu-i1A0Hq8ujz1Tqfm&_nc_ohc=NMC5lFO6xAcQ7kNvwFA4zyi&_nc_oc=AdnvbUpSN0r2Ol4ajPkLTn2_iz3eRRY67mCCzFAKD5hHaDLdnJBymzaT7DUWKEuRTmZ4fYTwEEfXrfj5xyVHWLCg&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&edm=AJdBtusEAAAA&_nc_gid=wZbj5r2NmUa9F8o3OGQhaQ&_nc_tpa=Q5bMBQFyO_cypCGYhj-U7wjcXvVU9Q_xt4rF1yaawVrxYUDHMCAAJHUd8KGV0Y5E1DD81AoLy6tMDFYD&oh=00_AfngmgqG-Cq7PMRPa4ieGCU-NwhBjqQas_UnlIuw-1o4XA&oe=694C7BCC",
    text: "Hi Awais! Thanks for the love, want behind-the-scenes shots or design details of this Modern Residential Home? Message us and we’ll send them right away.",
    time: "02:05 AM",
    isAi: true,
    isPrivateReply: true,
    commentUrl: "https://www.facebook.com/645232738675563_122146508888890127",
  },
  {
    id: 1526698,
    sender: "friend",
    name: "Awais Jutt",
    avatarUrl:
      "https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa3ONGwp69DFukVj6z9n7HeND1QSoSBL2tO7vekAGEsiNInViWVFNXNvti9mQO_yNQW6jFMz77H8&psid=24362880443305426&width=1024&ext=1768823313&hash=AT84k2fd7nnUT-OF9S1Z_Q1_",
    text: "i like the 2nd option but can you provide something more better options",
    time: "02:10 AM",
  },
  {
    id: 1526700,
    sender: "me",
    name: "Wise man",
    avatarUrl:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/502586578_2121943574989801_801439392086419003_n.jpg?stp=c341.0.1365.1365a_cp0_dst-jpg_s50x50_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f907e8&_nc_eui2=AeGB6r9xqokwK7wrrTPZGgqlYfzXYouZ6bBh_Ndii5npsHdgWSOTEzsLrEA6hl0HVG0IQSGu-i1A0Hq8ujz1Tqfm&_nc_ohc=NMC5lFO6xAcQ7kNvwFA4zyi&_nc_oc=AdnvbUpSN0r2Ol4ajPkLTn2_iz3eRRY67mCCzFAKD5hHaDLdnJBymzaT7DUWKEuRTmZ4fYTwEEfXrfj5xyVHWLCg&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&edm=AJdBtusEAAAA&_nc_gid=wZbj5r2NmUa9F8o3OGQhaQ&_nc_tpa=Q5bMBQFyO_cypCGYhj-U7wjcXvVU9Q_xt4rF1yaawVrxYUDHMCAAJHUd8KGV0Y5E1DD81AoLy6tMDFYD&oh=00_AfngmgqG-Cq7PMRPa4ieGCU-NwhBjqQas_UnlIuw-1o4XA&oe=694C7BCC",
    text: "Love it, here are 3 upgraded directions you might like:<br>1) Sleek Minimal Modern, crisp lines, glass, monochrome elegance.<br>2) Warm Contemporary, wood accents, soft lighting, cozy livability.<br>3) Luxury Eco-Friendly, reclaimed materials, green roof, smart systems.<br>Pick a vibe and I’ll pull the best matches and quotes for you, Olivia",
    time: "02:11 AM",
    isAi: true,
  },
  {
    id: 1526702,
    sender: "friend",
    name: "Awais Jutt",
    avatarUrl:
      "https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa3ONGwp69DFukVj6z9n7HeND1QSoSBL2tO7vekAGEsiNInViWVFNXNvti9mQO_yNQW6jFMz77H8&psid=24362880443305426&width=1024&ext=1768823313&hash=AT84k2fd7nnUT-OF9S1Z_Q1_",
    text: "i like the 2nd option",
    time: "02:12 AM",
  },
  {
    id: 1526704,
    sender: "me",
    name: "Wise man",
    avatarUrl:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/502586578_2121943574989801_801439392086419003_n.jpg?stp=c341.0.1365.1365a_cp0_dst-jpg_s50x50_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f907e8&_nc_eui2=AeGB6r9xqokwK7wrrTPZGgqlYfzXYouZ6bBh_Ndii5npsHdgWSOTEzsLrEA6hl0HVG0IQSGu-i1A0Hq8ujz1Tqfm&_nc_ohc=NMC5lFO6xAcQ7kNvwFA4zyi&_nc_oc=AdnvbUpSN0r2Ol4ajPkLTn2_iz3eRRY67mCCzFAKD5hHaDLdnJBymzaT7DUWKEuRTmZ4fYTwEEfXrfj5xyVHWLCg&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&edm=AJdBtusEAAAA&_nc_gid=wZbj5r2NmUa9F8o3OGQhaQ&_nc_tpa=Q5bMBQFyO_cypCGYhj-U7wjcXvVU9Q_xt4rF1yaawVrxYUDHMCAAJHUd8KGV0Y5E1DD81AoLy6tMDFYD&oh=00_AfngmgqG-Cq7PMRPa4ieGCU-NwhBjqQas_UnlIuw-1o4XA&oe=694C7BCC",
    text: "Awesome, Warm Contemporary it is!<br>Here are 3 curated directions I’ll pull matches and quotes for:<br>1) Cozy Wood Haven, oak accents, warm neutrals, layered textiles.<br>2) Soft-Light Open Plan, breezy layout, soft pendant and floor lighting.<br>3) Rustic-Modern Blend, reclaimed wood, matte black fixtures, plush seating.<br>I’ll go fetch the best product matches and price estimates now, Olivia",
    time: "02:13 AM",
    isAi: true,
  },
];

const MOCK_CHAT_CUSTOMER: Customer = {
  id: "24362880443305426",
  name: "Awais Jutt",
  avatarUrl:
    "https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa3ONGwp69DFukVj6z9n7HeND1QSoSBL2tO7vekAGEsiNInViWVFNXNvti9mQO_yNQW6jFMz77H8&psid=24362880443305426&width=1024&ext=1768823313&hash=AT84k2fd7nnUT-OF9S1Z_Q1_",
  tags: ["Warm Contemporary", "Cozy", "Wood Accents"],
};


// --- MOCK DATA FOR COMMENTS TAB ---
const HOUSE_AVATAR = "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/561824335_122146508780890127_269311364933202105_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGe61CsNROzMHuUovCHorhGgx2HUKFJ6keDHYdQoUnqR5BPbmD8AgGDZBJYR2RqVCxKTVwijAAkzEo4sY1UJA1V&_nc_ohc=MQEjHQclOHcQ7kNvwE6I5e4&_nc_oc=AdkGBcKVzzSYXabxwNZJt5q7ApTP0s5vjCGsz1SnK5mV3bhonqTxZBoYhgb0-z3W172FOJyhE4BBgOupNO0vKgpj&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&edm=AJfPMC4EAAAA&_nc_gid=GT_Vc4BG72jvFvfvnzUHxg&_nc_tpa=Q5bMBQFMCKr_GGUcRFK1s6KnpBEocXECwmyNRpd_vGfiECcesY5-5xa9mTjxnJdfTSmfjRW7b0AvyuPk&oh=00_Afn9kfAi8KFoD5zfSVHRVAaKUKRYDI-CtzsTtxrYuaDxjg&oe=694C9167";

const MOCK_COMMENT_MESSAGES: Message[] = [
  {
    id: 968599,
    sender: "friend",
    name: "Awais Jutt",
    avatarUrl:
      "https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa1mO2ROaaUp-ktD5ariwLzMY22btkLBPxxWhF-VZZYN8TJo3NIz9iDjNUCTKo1eW1adTp_urhwx&psid=24362880443305426&width=1024&ext=1768827193&hash=AT9O4AHTMn8pYwNm9QCSwuBf",
    text: "thats beautifull",
    time: "02:04 AM",
  },
  {
    id: 972760,
    sender: "friend",
    name: "Wise man",
    avatarUrl: "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/502586578_2121943574989801_801439392086419003_n.jpg?stp=c341.0.1365.1365a_cp0_dst-jpg_s50x50_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f907e8&_nc_eui2=AeGB6r9xqokwK7wrrTPZGgqlYfzXYouZ6bBh_Ndii5npsHdgWSOTEzsLrEA6hl0HVG0IQSGu-i1A0Hq8ujz1Tqfm&_nc_ohc=NMC5lFO6xAcQ7kNvwFA4zyi&_nc_oc=AdnvbUpSN0r2Ol4ajPkLTn2_iz3eRRY67mCCzFAKD5hHaDLdnJBymzaT7DUWKEuRTmZ4fYTwEEfXrfj5xyVHWLCg&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&edm=ANsyT80EAAAA&_nc_gid=WWyb-KiDhxWZ0Eb_2iWdEw&_nc_tpa=Q5bMBQHpaMJhI5Dk6EEVXw-q_2H0iDDRWTlZSxBt9G_QRD-PVqgpeKlDa4xfyWXw3LrxkxEO3sgPTZUP&oh=00_AflBx5q5GDmM7UfZ31oU2bHgu0n2hBbKcDc133MxCMU8uA&oe=694C7BCC",
    text: "that's awesome",
    time: "06:13 AM",
  }
];

const MOCK_COMMENT_CUSTOMER: Customer = {
  id: "645232738675563_122146508888890127",
  name: "House of My Dream",
  avatarUrl: HOUSE_AVATAR,
  tags: ["Page post"], // Using tags for "Page post" or similar
};


export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      // Remove the token from the URL for cleaner UI
      router.replace("/smartreply/home");
    }
  }, [searchParams, router]);

  const [tab, setTab] = React.useState<"chats" | "comments" | "subscribers">(
    "chats",
  );
  const [activeChatId, setActiveChatId] = React.useState("t_2122612654922893");
  const [composerText, setComposerText] = React.useState("");
  const [autoReply, setAutoReply] = React.useState(true);

  // Derive data based on Active Tab
  const chats = MOCK_CHATS.map((c) => ({
    ...c,
    isActive: c.id === activeChatId,
  }));

  // Logic to switch data sources
  let currentMessages = MOCK_CHAT_MESSAGES;
  let currentCustomer = MOCK_CHAT_CUSTOMER;
  let currentAdId = "";

  if (tab === "comments") {
    currentMessages = MOCK_COMMENT_MESSAGES;
    currentCustomer = MOCK_COMMENT_CUSTOMER;
    currentAdId = "645232738675563_122146508888890127"; // Using Ad ID field for Post ID per snippet
  }

  const handleSend = () => {
    if (!composerText.trim()) return;
    // Mock send
    console.log("Sending:", composerText);
    setComposerText("");
  };

  return (
    <ChatLayout
      sidebar={
        <Sidebar
          activeTab={tab}
          onTabChange={setTab}
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
        />
      }
      chat={
        <ChatWindow
          messages={currentMessages}
          customerName={currentCustomer.name}
          customerAvatar={currentCustomer.avatarUrl}
          adId={currentAdId}
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
      rightSidebar={<RightSidebar customer={currentCustomer} />}
    />
  );
}

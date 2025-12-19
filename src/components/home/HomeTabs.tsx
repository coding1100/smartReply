"use client";

import { Chip, Input, Tab, Tabs } from "@heroui/react";

export function HomeTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (key: string) => void;
}) {
  return (
    <div className="space-y-3">
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(k) => onTabChange(String(k))}
        variant="underlined"
        classNames={{
          tabList: "gap-3",
          cursor: "bg-indigo-600",
        }}
      >
        <Tab key="chats" title="Chats" />
        <Tab key="comments" title="Comments" />
        <Tab key="subscribers" title="Subscribers" />
      </Tabs>

      <Input
        placeholder="Search here..."
        size="sm"
        classNames={{
          inputWrapper: "rounded-2xl bg-white shadow-sm",
        }}
      />

      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
        <span className="font-medium">Filters:</span>
        <Chip size="sm" variant="flat" className="rounded-xl">
          Platform
        </Chip>
        <Chip size="sm" variant="flat" className="rounded-xl">
          Sentiment
        </Chip>
      </div>
    </div>
  );
}



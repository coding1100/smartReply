"use client";

import * as React from "react";
import { Button, Radio, RadioGroup, Tab, Tabs } from "@heroui/react";

type TabKey = "messages" | "comments" | "mentions";
type Sentiment = "all" | "positive" | "neutral" | "negative";

export function ContentLibraryPage() {
  const [tab, setTab] = React.useState<TabKey>("messages");
  const [sentiment, setSentiment] = React.useState<Sentiment>("all");
  const selectedCount = 0;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 px-1 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-bold text-zinc-900">Content Library</div>
          <div className="text-sm text-zinc-500">
            Images, videos & story mentions pulled from your chats and comments.
          </div>
        </div>

        <Button color="primary" isDisabled={!selectedCount}>
          Export ({selectedCount})
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex justify-center">
        <Tabs
          selectedKey={tab}
          onSelectionChange={(k) => setTab(String(k) as TabKey)}
          radius="full"
          variant="solid"
          classNames={{
            tabList: "gap-6 bg-transparent",
            tab: "px-6",
            cursor: "bg-indigo-600",
          }}
        >
          <Tab key="messages" title="Messages" />
          <Tab key="comments" title="Comments" />
          <Tab key="mentions" title="Mentions" />
        </Tabs>
      </div>

      {/* Sentiment Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold text-zinc-900">Sentiment Filter:</span>
        <RadioGroup
          orientation="horizontal"
          value={sentiment}
          onValueChange={(v) => setSentiment(v as Sentiment)}
          classNames={{
            wrapper: "gap-3 items-center",
          }}
        >
          <Radio value="all" size="sm">
            All
          </Radio>
          <Radio value="positive" size="sm">
            Positive
          </Radio>
          <Radio value="neutral" size="sm">
            Neutral
          </Radio>
          <Radio value="negative" size="sm">
            Negative
          </Radio>
        </RadioGroup>
      </div>

      {/* Content area */}
      <div className="flex flex-wrap">
        <div className="w-full py-16 text-center text-sm text-zinc-600">
          No content available.
          <div className="mt-2 text-xs text-zinc-400">
            Tab: {tab} • Sentiment: {sentiment}
          </div>
        </div>
      </div>
    </div>
  );
}



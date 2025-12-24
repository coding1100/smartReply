"use client";

import * as React from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { PresetDateRangePicker } from "@/components/dashboard/PresetDateRangePicker";

function Sparkline({ variant }: { variant?: "flat" | "bump" }) {
  // Lightweight SVG placeholder to mimic the tiny line charts from the screenshot.
  // variant="flat" produces a straight line; "bump" produces a small rise/fall.
  const points =
    variant === "flat"
      ? "0,28 18,28 36,28 54,28 72,28 90,28 108,28 126,28 144,28"
      : "0,28 20,28 40,28 60,28 80,18 100,10 120,20 144,28";

  return (
    <svg viewBox="0 0 144 34" className="h-9 w-full">
      <defs>
        <linearGradient id="sr-spark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#10b981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#sr-spark)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

type MetricTileProps = {
  title: string;
  delta?: string;
  value?: string;
  nodata?: boolean;
  spark?: "flat" | "bump";
  icon?: React.ReactNode;
};

function MetricTile({ title, delta, value, nodata, spark = "flat", icon }: MetricTileProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-3 py-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {icon ? (
              <span className="inline-flex h-5 w-5 items-center justify-center">{icon}</span>
            ) : null}
            <div className="truncate text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
              {title}
            </div>
          </div>
          <div className="mt-1 text-[18px] font-semibold leading-none text-zinc-900">
            {nodata ? "—" : value ?? "0"}
          </div>
        </div>

        <div className="shrink-0 text-[10px] font-semibold text-emerald-700">{delta ?? "100% ↑"}</div>
      </div>

      <div className="mt-2">
        {nodata ? (
          <div className="flex h-9 items-center justify-center text-[10px] text-zinc-400">
            No Data
          </div>
        ) : (
          <Sparkline variant={spark} />
        )}
      </div>
    </div>
  );
}

function IconFb() {
  return (
    <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
      f
    </div>
  );
}

function IconIg() {
  return (
    <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-600 text-[11px] font-bold text-white">
      ig
    </div>
  );
}

function IconTt() {
  return (
    <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white">
      t
    </div>
  );
}

export function AnalyticsPage() {
  const [randomResults, setRandomResults] = React.useState(false);
  const [timeframe, setTimeframe] = React.useState<"Day" | "Week" | "Month">("Day");
  const [range, setRange] = React.useState({ start: "2025-12-11", end: "2025-12-18" });

  const tiles = React.useMemo<MetricTileProps[]>(
    () => [
      { title: "Total Comments", value: "3", delta: "100% ↑", spark: "bump" },
      { title: "Hidden Comment %", value: "0.00%", delta: "0% ↓", spark: "flat" },
      { title: "Moderation Volume", value: "4", delta: "100% ↑", spark: "bump" },

      { title: "Moderation Hours Saved", value: "0", delta: "100% ↑", spark: "bump" },
      { title: "Payroll $ Saved", value: "$3", delta: "100% ↑", spark: "bump" },
      { title: "Total Sentiment", value: "1.00", delta: "100% ↑", spark: "flat" },

      { title: "Visible Sentiment", value: "1.00", delta: "100% ↑", spark: "flat" },
      { title: "Comments Liked", value: "0", delta: "0% ↓", spark: "flat" },
      { title: "Facebook User Comments", value: "2", delta: "100% ↑", spark: "bump" },

      { title: "Instagram User Comments", nodata: true, delta: "—", icon: <IconIg /> },
      { title: "TikTok User Comments", nodata: true, delta: "—", icon: <IconTt /> },
      { title: "Liked Comments (%)", value: "0.00%", delta: "0% ↓", spark: "flat" },

      { title: "Conversations", value: "1", delta: "100% ↑", spark: "bump" },
      { title: "User Messages", value: "2", delta: "100% ↑", spark: "bump" },
      { title: "Private Replies", value: "1", delta: "100% ↑", spark: "bump" },

      { title: "Open-Feed Moderation Volume", value: "3", delta: "100% ↑", spark: "bump" },
      { title: "Moderations per Saved", value: "0", delta: "100% ↑", spark: "bump" },
      { title: "Off-Hours Payroll $ Saved", value: "$2", delta: "100% ↑", spark: "bump" },

      { title: "Instagram Likers", nodata: true, delta: "—", icon: <IconIg /> },
      { title: "Facebook Likers", value: "2", delta: "100% ↑", spark: "bump", icon: <IconFb /> },
      { title: "TikTok Likers", nodata: true, delta: "—", icon: <IconTt /> },

      { title: "Website Chatbot Users", nodata: true, delta: "—" },
      { title: "Messages Opened", value: "2", delta: "100% ↑", spark: "bump" },
      { title: "Messages Sent", value: "5", delta: "100% ↑", spark: "bump" },

      { title: "Replies", value: "2", delta: "100% ↑", spark: "bump" },
      { title: "Messaging Customers", value: "2", delta: "100% ↑", spark: "bump" },
      { title: "Messages Delivered", value: "5", delta: "100% ↑", spark: "bump" },

      { title: "Conversation Clicks", value: "0", delta: "0% ↓", spark: "flat" },
      { title: "Quality Conversations", value: "1", delta: "100% ↑", spark: "bump" },
      { title: "Average Quality Score", value: "5.00", delta: "100% ↑", spark: "bump" },

      { title: "Campaigns Sent", value: "0", delta: "0% ↓", spark: "flat" },
      { title: "Leads Generated", value: "0", delta: "0% ↓", spark: "flat" },
      { title: "Click-Through Rate", value: "0%", delta: "0% ↓", spark: "flat" },

      // Ads / commerce-like section (mostly No Data in screenshot)
      { title: "Total Customers", nodata: true, delta: "—" },
      { title: "Website Orders", nodata: true, delta: "—" },
      { title: "Purchases", nodata: true, delta: "—" },

      { title: "ROAS", nodata: true, delta: "—" },
      { title: "Ad Spend", nodata: true, delta: "—" },
      { title: "CPM", nodata: true, delta: "—" },

      { title: "Clicks", nodata: true, delta: "—" },
      { title: "Impressions", nodata: true, delta: "—" },
      { title: "CTR", nodata: true, delta: "—" },

      { title: "CPC", nodata: true, delta: "—" },
      { title: "Total Revenue", nodata: true, delta: "—" },
      { title: "Clicks (Outbound)", nodata: true, delta: "—" },

      { title: "Impressions (FB)", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Reported ROAS", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Outbound CTR", nodata: true, delta: "—", icon: <IconFb /> },

      { title: "Outbound CPC", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "CPM (FB)", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Conversion Rate", nodata: true, delta: "—", icon: <IconFb /> },

      { title: "ThruPlay Rate", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Messaging Conversations Started", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Messaging Conversations Replies", nodata: true, delta: "—", icon: <IconFb /> },

      { title: "Cost per Messaging Conversation Started", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Cost per Messaging Reply", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Frequency", nodata: true, delta: "—", icon: <IconFb /> },

      { title: "View Contents", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Cost per View Content", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Post Reactions", nodata: true, delta: "—", icon: <IconFb /> },

      { title: "3 Second Video Views", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Reported Purchases", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Reported COGS per Purchase", nodata: true, delta: "—", icon: <IconFb /> },

      { title: "Reported Revenue", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Reported Leads", nodata: true, delta: "—", icon: <IconFb /> },
      { title: "Reported Lead Value", nodata: true, delta: "—", icon: <IconFb /> },

      { title: "Reported Cost per Lead", nodata: true, delta: "—", icon: <IconFb /> },
    ],
    [],
  );

  return (
    <div className="px-2 py-3 md:px-4 md:py-4">
      {/* Header row (matches screenshot: title left, date + buttons right) */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="!text-sm !font-semibold text-zinc-900">Analytics</div>

        <div className="flex flex-wrap items-center gap-2">
          <PresetDateRangePicker value={range} onApply={setRange} />
          <Button size="sm" variant="bordered" radius="full" className="bg-white px-4">
            Edit
          </Button>
          <Button size="sm" color="primary" radius="full" className="bg-indigo-600 px-4">
            Add
          </Button>
        </div>
      </div>

      {/* Sub-controls row (random + timeframe buttons) */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <Checkbox isSelected={randomResults} onValueChange={setRandomResults} size="sm">
          <span className="text-xs text-zinc-700">Random Result</span>
        </Checkbox>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            radius="full"
            variant={timeframe === "Day" ? "solid" : "bordered"}
            color={timeframe === "Day" ? "primary" : "default"}
            className={timeframe === "Day" ? "bg-indigo-600" : "bg-white"}
            onPress={() => setTimeframe("Day")}
          >
            Day
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={timeframe === "Week" ? "solid" : "bordered"}
            color={timeframe === "Week" ? "primary" : "default"}
            className={timeframe === "Week" ? "bg-indigo-600" : "bg-white"}
            onPress={() => setTimeframe("Week")}
          >
            Week
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={timeframe === "Month" ? "solid" : "bordered"}
            color={timeframe === "Month" ? "primary" : "default"}
            className={timeframe === "Month" ? "bg-indigo-600" : "bg-white"}
            onPress={() => setTimeframe("Month")}
          >
            Month
          </Button>
        </div>
      </div>

      {/* Tiles grid (screenshot is 3 columns on desktop) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <MetricTile
            key={t.title}
            {...t}
            // make "Random Result" behave like screenshot demo
            value={randomResults && !t.nodata ? "—" : t.value}
          />
        ))}
      </div>

      {/* Source Analysis panel (large, bottom) */}
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-3 py-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-700">
            Source Analysis
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="bordered" radius="full" className="bg-white">
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Source analysis filter">
              <DropdownItem key="all">All</DropdownItem>
              <DropdownItem key="facebook">Facebook</DropdownItem>
              <DropdownItem key="instagram">Instagram</DropdownItem>
              <DropdownItem key="tiktok">TikTok</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="flex h-[220px] items-center justify-center px-3 py-6 text-xs text-zinc-400">
          No Data
        </div>
      </div>
    </div>
  );
}



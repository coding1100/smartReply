"use client";

import { Button, Input } from "@heroui/react";
import { PanelCard } from "./PanelCard";

export function ActionsTableCard() {
  return (
    <PanelCard title="ACTIONS" className="col-span-12 lg:col-span-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input size="sm" placeholder="Search orders or custom" className="max-w-sm" />
        <div className="flex items-center gap-1">
          <Button size="sm" variant="bordered">
            All Assignees
          </Button>
          <Button size="sm" variant="bordered">
            Newest first
          </Button>
          <Button size="sm" color="primary" variant="bordered">
            All (0)
          </Button>
          <Button size="sm" variant="bordered">
            AI Agent Breakdown
          </Button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-6">
        {[
          ["Escalate", 0],
          ["Refund Order", 0],
          ["Update Shipping", 0],
          ["Replace Product", 0],
          ["Influencer Order", 0],
          ["Modify Subscription", 0],
        ].map(([label, value]) => (
          <div key={label as string} className="!rounded-xl bg-zinc-50 border border-zinc-100 px-3 py-2.5 hover:bg-zinc-100 transition-colors">
            <div className="text-xs text-zinc-500 font-medium">{label}</div>
            <div className="text-lg font-bold text-zinc-900">{value as number}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 overflow-hidden !rounded-xl bg-white border border-zinc-100">
        <div className="grid grid-cols-9 gap-2 border-b border-zinc-100 bg-zinc-50 px-3 py-2.5 text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
          {[
            "ACTION",
            "CUSTOMER",
            "STATUS",
            "REASON",
            "SOURCE",
            "PLATFORM",
            "ASSIGNEE",
            "ORDER #",
            "CREATED AT",
          ].map((h) => (
            <div key={h} className="truncate">
              {h}
            </div>
          ))}
        </div>
        <div className="px-3 py-10 text-center text-sm text-zinc-400 font-medium">
          No actions found.
        </div>
      </div>
    </PanelCard>
  );
}



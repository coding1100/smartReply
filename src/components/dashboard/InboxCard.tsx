"use client";

import { PanelCard } from "./PanelCard";

export function InboxCard() {
  return (
    <PanelCard title="INBOX" className="col-span-12 lg:col-span-4">
      <div className="text-xs text-zinc-500 font-medium">Recent chats</div>
      <div className="mt-3 rounded-xl bg-zinc-50 border border-zinc-100 p-4 hover:bg-zinc-100 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-bold text-indigo-600">Awais Jutt</div>
            <div className="truncate text-xs text-zinc-600 mt-1">
              i like the 2nd option
            </div>
          </div>
          <div className="shrink-0 text-xs text-zinc-400 font-medium">1 day ago</div>
        </div>
      </div>
    </PanelCard>
  );
}



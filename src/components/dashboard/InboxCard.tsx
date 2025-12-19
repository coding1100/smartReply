"use client";

import { PanelCard } from "./PanelCard";

export function InboxCard() {
  return (
    <PanelCard title="INBOX" className="col-span-12 lg:col-span-4">
      <div className="text-xs text-zinc-500">Recent chats</div>
      <div className="mt-3 rounded-2xl bg-white p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-indigo-700">Awais Jutt</div>
            <div className="truncate text-xs text-zinc-500">
              i like the 2nd option
            </div>
          </div>
          <div className="shrink-0 text-xs text-zinc-400">1 day ago</div>
        </div>
      </div>
    </PanelCard>
  );
}



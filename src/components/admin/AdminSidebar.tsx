"use client";

import Link from "next/link";
import { SidebarNav } from "./SidebarNav";

export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-[260px] shrink-0 border-r border-zinc-200 bg-white md:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-1 px-4 py-4">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/25" />
          <div>
            <Link href="/dashboard" className="text-sm font-semibold text-zinc-900">
              SmartReply
            </Link>
            <div className="text-xs text-zinc-500">AI Agent</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
      </div>
    </aside>
  );
}



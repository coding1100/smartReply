"use client";

import Link from "next/link";
import { SidebarNav } from "./SidebarNav";

export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-[260px] shrink-0 border-r border-zinc-200 bg-white md:block shadow-sm">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-100">
          <div className="h-10 w-10 !rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-100">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <Link href="/dashboard" className="!text-sm !font-bold text-zinc-900 hover:text-indigo-600 transition-colors">
              SmartReply
            </Link>
            <div className="text-xs text-zinc-500 font-medium">AI Agent</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <SidebarNav />
        </div>
      </div>
    </aside>
  );
}



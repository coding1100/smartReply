"use client";

import * as React from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh bg-zinc-50">
      <div className="mx-auto flex h-full w-full items-stretch">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />
          <main className="min-w-0 flex-1 overflow-y-auto p-6">{children}</main>
          <footer className="border-t border-zinc-200 bg-white px-6 py-3 text-right text-xs text-zinc-500">
            Copyright © 2021 SmartReply. All rights reserved
          </footer>
        </div>
      </div>
    </div>
  );
}



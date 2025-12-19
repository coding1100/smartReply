"use client";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="text-sm font-semibold text-zinc-900">Admin</div>
        <div className="h-8 w-8 rounded-full bg-zinc-200" aria-label="User avatar" />
      </div>
    </header>
  );
}



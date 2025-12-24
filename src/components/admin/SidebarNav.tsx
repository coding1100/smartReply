"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@heroui/react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-transform text-zinc-400", open && "rotate-180")}
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({
  title,
  items,
  defaultOpen = true,
  icon,
  pathname,
}: {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  pathname: string;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="mt-4 mr-[5px] ml-[5px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 text-left !font-semibold text-[15px] tracking-wide text-zinc-500"
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <Chevron open={open} />
      </button>

      {open ? (
        <div className="mt-2 space-y-1 px-2">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-disabled={item.disabled}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors !text-[15px] !font-semibold !no-underline !text-zinc-700  mt-[10px]",
                  "hover:bg-zinc-100",
                  item.disabled && "opacity-60",
                  active ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-700",
                )}
              >
                <span className={cn("text-zinc-500", active && "text-zinc-900")}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function SidebarNav() {
  const pathname = usePathname();

  const main: NavItem[] = [
    {
      label: "Dashboard", href: "/dashboard", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-box link-icon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      )
    },
    {
      label: "Home", href: "/home", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-activity link-icon"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
      )
    },
    {
      label: "Content Library",
      href: "/content-library",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-book-open link-icon"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      )
    },
    {
      label: "Analytics", href: "/analytics", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bar-chart-2 link-icon"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>

      )
    },
  ];
  const actions: NavItem[] = [
    {
      label: "All Actions", href: "/actions", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
          <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ), disabled: true
    },
    {
      label: "User Logs", href: "/user-logs", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
          <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ), disabled: true
    },
  ];

  const customers: NavItem[] = [
    {
      label: "Customer Profiles", href: "/customers", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 21v-2a3.5 3.5 0 0 0-2.5-3.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16.5 3.65a4 4 0 0 1 0 7.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ), disabled: true
    },
    {
      label: "Block List", href: "/block-list", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 21v-2a3.5 3.5 0 0 0-2.5-3.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16.5 3.65a4 4 0 0 1 0 7.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ), disabled: true
    },
    {
      label: "Audiences", href: "/audiences", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 21v-2a3.5 3.5 0 0 0-2.5-3.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16.5 3.65a4 4 0 0 1 0 7.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ), disabled: true
    },
  ];

  const settings: NavItem[] = [
    {
      label: "Settings", href: "/settings", icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" />
          <path d="M19.4 15a7.9 7.9 0 0 0 .06-1 7.9 7.9 0 0 0-.06-1l2.1-1.64a.5.5 0 0 0 .12-.63l-2-3.46a.5.5 0 0 0-.6-.22l-2.48 1a8 8 0 0 0-1.73-1l-.38-2.65A.5.5 0 0 0 13.94 3h-3.9a.5.5 0 0 0-.49.42l-.38 2.65a8 8 0 0 0-1.73 1l-2.48-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.63L4.6 13a7.9 7.9 0 0 0-.06 1 7.9 7.9 0 0 0 .06 1l-2.1 1.64a.5.5 0 0 0-.12.63l2 3.46a.5.5 0 0 0 .6.22l2.48-1a8 8 0 0 0 1.73 1l.38 2.65a.5.5 0 0 0 .49.42h3.9a.5.5 0 0 0 .49-.42l.38-2.65a8 8 0 0 0 1.73-1l2.48 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.63L19.4 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ), disabled: true
    },
    {
      label: "AI Agent Settings",
      href: "/ai-agent-settings",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" />
          <path d="M19.4 15a7.9 7.9 0 0 0 .06-1 7.9 7.9 0 0 0-.06-1l2.1-1.64a.5.5 0 0 0 .12-.63l-2-3.46a.5.5 0 0 0-.6-.22l-2.48 1a8 8 0 0 0-1.73-1l-.38-2.65A.5.5 0 0 0 13.94 3h-3.9a.5.5 0 0 0-.49.42l-.38 2.65a8 8 0 0 0-1.73 1l-2.48-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.63L4.6 13a7.9 7.9 0 0 0-.06 1 7.9 7.9 0 0 0 .06 1l-2.1 1.64a.5.5 0 0 0-.12.63l2 3.46a.5.5 0 0 0 .6.22l2.48-1a8 8 0 0 0 1.73 1l.38 2.65a.5.5 0 0 0 .49.42h3.9a.5.5 0 0 0 .49-.42l.38-2.65a8 8 0 0 0 1.73-1l2.48 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.63L19.4 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      disabled: false,
    },
  ];

  return (
    <nav className="pb-6">
      {main.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-disabled={item.disabled}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors !font-semibold !text-[15px] !no-underline !text-zinc-700 mr-[5px] ml-[5px] mt-3",
              "hover:bg-zinc-100",
              item.disabled && "opacity-60",
              active ? "bg-zinc-100 font-medium text-zinc-500" : "text-zinc-700",
            )}
          >
            <span className={cn("text-zinc-500", active && "text-zinc-900")}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
      <Section title="Actions" items={actions} defaultOpen={false} pathname={pathname} icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check-circle link-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      } />
      <Section title="Customers" items={customers} defaultOpen={false} pathname={pathname} icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 21v-2a3.5 3.5 0 0 0-2.5-3.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16.5 3.65a4 4 0 0 1 0 7.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      } />
      <Section title="Settings" items={settings} defaultOpen={false} pathname={pathname} icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-settings link-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      } />
    </nav>
  );
}



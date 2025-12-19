"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@heroui/react";
import {
  IconActions,
  IconAnalytics,
  IconDashboard,
  IconHome,
  IconLibrary,
  IconSettings,
  IconUsers,
} from "./icons";

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
}: {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 text-left text-[11px] font-semibold tracking-wide text-zinc-500"
      >
        <span>{title}</span>
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
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors",
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
  const main: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: <IconDashboard /> },
    { label: "Home", href: "/home", icon: <IconHome /> },
    {
      label: "Content Library",
      href: "/content-library",
      icon: <IconLibrary />,
    },
    { label: "Analytics", href: "/analytics", icon: <IconAnalytics /> },
  ];

  const actions: NavItem[] = [
    { label: "All Actions", href: "/actions", icon: <IconActions />, disabled: true },
    { label: "User Logs", href: "/user-logs", icon: <IconActions />, disabled: true },
  ];

  const customers: NavItem[] = [
    { label: "Customer Profiles", href: "/customers", icon: <IconUsers />, disabled: true },
    { label: "Block List", href: "/block-list", icon: <IconUsers />, disabled: true },
    { label: "Audiences", href: "/audiences", icon: <IconUsers />, disabled: true },
  ];

  const settings: NavItem[] = [
    { label: "Settings", href: "/settings", icon: <IconSettings />, disabled: true },
    {
      label: "AI Agent Settings",
      href: "/ai-agent-settings",
      icon: <IconSettings />,
      disabled: false,
    },
  ];

  return (
    <nav className="pb-6">
      <Section title="MAIN" items={main} defaultOpen />
      <Section title="ACTIONS" items={actions} defaultOpen={false} />
      <Section title="CUSTOMERS" items={customers} defaultOpen={false} />
      <Section title="SETTINGS" items={settings} defaultOpen={false} />
    </nav>
  );
}



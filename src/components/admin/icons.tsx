"use client";

import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

function IconBase({
  title,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconDashboard(props: IconProps) {
  return (
    <IconBase title="Dashboard" {...props}>
      <path
        d="M4 13.5c0-4.142 3.358-7.5 7.5-7.5S19 9.358 19 13.5V20H4v-6.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.5v-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function IconHome(props: IconProps) {
  return (
    <IconBase title="Home" {...props}>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-7H10v7H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function IconLibrary(props: IconProps) {
  return (
    <IconBase title="Content Library" {...props}>
      <path
        d="M7 4h12v16H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7 6H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 8h8M9 12h8M9 16h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function IconAnalytics(props: IconProps) {
  return (
    <IconBase title="Analytics" {...props}>
      <path
        d="M5 19V9M12 19V5M19 19v-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function IconActions(props: IconProps) {
  return (
    <IconBase title="Actions" {...props}>
      <path
        d="M7 12h10M12 7v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <IconBase title="Customers" {...props}>
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M22 21v-2a3.5 3.5 0 0 0-2.5-3.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.65a4 4 0 0 1 0 7.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <IconBase title="Settings" {...props}>
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M19.4 15a7.9 7.9 0 0 0 .06-1 7.9 7.9 0 0 0-.06-1l2.1-1.64a.5.5 0 0 0 .12-.63l-2-3.46a.5.5 0 0 0-.6-.22l-2.48 1a8 8 0 0 0-1.73-1l-.38-2.65A.5.5 0 0 0 13.94 3h-3.9a.5.5 0 0 0-.49.42l-.38 2.65a8 8 0 0 0-1.73 1l-2.48-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.63L4.6 13a7.9 7.9 0 0 0-.06 1 7.9 7.9 0 0 0 .06 1l-2.1 1.64a.5.5 0 0 0-.12.63l2 3.46a.5.5 0 0 0 .6.22l2.48-1a8 8 0 0 0 1.73 1l.38 2.65a.5.5 0 0 0 .49.42h3.9a.5.5 0 0 0 .49-.42l.38-2.65a8 8 0 0 0 1.73-1l2.48 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.63L19.4 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}



"use client";

import * as React from "react";
import { Card, CardBody } from "@heroui/react";

export function PanelCard({
  title,
  right,
  children,
  className,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card shadow="sm" className={["rounded-xl bg-white shadow-sm border border-zinc-100 hover:shadow-md transition-all", className].filter(Boolean).join(" ")}>
      <CardBody className="gap-4 p-6">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold tracking-wider text-zinc-600 uppercase">
            {title}
          </div>
          {right ? <div>{right}</div> : null}
        </div>
        {children}
      </CardBody>
    </Card>
  );
}



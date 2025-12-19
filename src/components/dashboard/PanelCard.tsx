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
    <Card shadow="sm" className={["rounded-2xl bg-white shadow-sm", className].filter(Boolean).join(" ")}>
      <CardBody className="gap-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold tracking-wide text-zinc-800">
            {title}
          </div>
          {right ? <div>{right}</div> : null}
        </div>
        {children}
      </CardBody>
    </Card>
  );
}



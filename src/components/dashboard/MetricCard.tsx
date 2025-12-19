"use client";

import * as React from "react";
import { Card, CardBody } from "@heroui/react";

export function MetricCard({
  label,
  value,
  deltaLabel,
}: {
  label: string;
  value: React.ReactNode;
  deltaLabel: string;
}) {
  return (
    <Card shadow="sm" className="rounded-2xl bg-white shadow-sm">
      <CardBody className="gap-3">
        <div className="text-[11px] font-semibold tracking-wide text-zinc-500">
          {label.toUpperCase()}
        </div>
        <div className="text-2xl font-semibold text-zinc-900">{value}</div>
        <div className="text-xs font-medium text-emerald-600">{deltaLabel}</div>
        <div className="h-10 w-full rounded-2xl bg-gradient-to-r from-indigo-500/40 via-emerald-500/35 to-indigo-500/20" />
      </CardBody>
    </Card>
  );
}



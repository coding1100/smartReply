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
    <Card shadow="sm" className="!rounded-xl bg-white shadow-sm border border-zinc-100 hover:shadow-md hover:border-indigo-100 transition-all">
      <CardBody className="gap-3 p-6">
        <div className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
          {label}
        </div>
        <div className="text-2xl font-bold text-zinc-900">{value}</div>
        <div className="text-xs font-semibold text-emerald-600">{deltaLabel}</div>
        <div className="h-10 w-full !rounded-xl bg-gradient-to-r from-indigo-500/40 via-emerald-500/35 to-indigo-500/20" />
      </CardBody>
    </Card>
  );
}



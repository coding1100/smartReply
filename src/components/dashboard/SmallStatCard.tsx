"use client";

import { Card, CardBody } from "@heroui/react";

export function SmallStatCard({
  title,
  value,
  deltaLabel,
  chart,
}: {
  title: string;
  value: string;
  deltaLabel: string;
  chart?: "bars" | "miniBars";
}) {
  return (
    <Card shadow="sm" className="!rounded-xl bg-white shadow-sm border border-zinc-100 hover:shadow-md transition-all">
      <CardBody className="gap-2 p-5">
        <div className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
          {title}
        </div>
        <div className="text-2xl font-bold text-zinc-900">{value}</div>
        <div className="text-xs font-semibold text-emerald-600">{deltaLabel}</div>
        {chart ? (
          <div className="mt-1 h-10 w-full !rounded-xl bg-zinc-50 p-2 border border-zinc-100">
            <div className="flex h-full items-end gap-1">
              {(chart === "bars" ? [6, 12, 18, 10, 14] : [10, 16]).map((h, i) => (
                <div
                  key={i}
                  className="w-2 rounded-sm bg-emerald-500/70"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}



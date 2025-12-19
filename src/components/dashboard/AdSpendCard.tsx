"use client";

import { PanelCard } from "./PanelCard";

export function AdSpendCard() {
  return (
    <PanelCard title="AD SPEND" className="col-span-12 lg:col-span-8">
      <div className="text-xs text-zinc-500">
        Ad Spend refers to the total amount spent on advertising campaigns over a
        specific period.
      </div>
      <div className="mt-2 h-[220px] w-full rounded-2xl bg-white">
        <div className="flex h-full items-center justify-center text-sm text-zinc-400">
          No Data
        </div>
      </div>
    </PanelCard>
  );
}



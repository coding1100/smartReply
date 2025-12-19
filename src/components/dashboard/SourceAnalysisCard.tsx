"use client";

import { Button } from "@heroui/react";
import { PanelCard } from "./PanelCard";
import { LineChart } from "@/components/charts/LineChart";

export function SourceAnalysisCard() {
  return (
    <PanelCard
      title="SOURCE ANALYSIS"
      right={
        <div className="flex items-center gap-1">
          <Button size="sm" variant="bordered">
            Comments
          </Button>
        </div>
      }
      className="col-span-12 lg:col-span-8"
    >
      <div className="text-xs font-semibold text-zinc-700">user_comments</div>
      <div className="mt-2 h-[260px] w-full rounded-2xl bg-white">
        <div className="h-full w-full p-3">
          <LineChart data={[0, 0, 0, 0, 0, 1, 1, 1, 0]} height={240} />
        </div>
      </div>
    </PanelCard>
  );
}



"use client";

import * as React from "react";
import { Button } from "@heroui/react";
import { PresetDateRangePicker } from "./PresetDateRangePicker";

export function DashboardToolbar() {
  const [range, setRange] = React.useState({ start: "2025-12-11", end: "2025-12-18" });

  return (
    <div className="flex items-center gap-1">
      <PresetDateRangePicker value={range} onApply={setRange} />

      <div className="flex items-center gap-1">
        <Button size="sm" variant="bordered" className="rounded-2xl">
          Edit
        </Button>
        <Button size="sm" color="primary" className="rounded-2xl bg-indigo-600">
          + Add
        </Button>
      </div>
    </div>
  );
}



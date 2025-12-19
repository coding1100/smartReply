"use client";

import * as React from "react";
import {
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RangeCalendar,
} from "@heroui/react";
import {
  endOfMonth,
  endOfYear,
  endOfWeek,
  getLocalTimeZone,
  startOfYear,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

type IsoRange = { start: string; end: string };

function toIso(dateValue: unknown) {
  return String(dateValue);
}

function fromIso(iso: string) {
  const [y, m, d] = iso.split("-").map((x) => Number(x));
  // CalendarDate constructor (from @internationalized/date) is available via today().constructor
  return new ((today(getLocalTimeZone()) as any).constructor as any)(y, m, d);
}

export function PresetDateRangePicker({
  value,
  onApply,
}: {
  value: IsoRange;
  onApply: (next: IsoRange) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { locale } = useLocale();

  const [draftValue, setDraftValue] = React.useState(() => ({
    start: fromIso(value.start),
    end: fromIso(value.end),
  }));

  const [focusedValue, setFocusedValue] = React.useState(() => today(getLocalTimeZone()));

  React.useEffect(() => {
    setDraftValue({ start: fromIso(value.start), end: fromIso(value.end) });
  }, [value]);

  const now = today(getLocalTimeZone());
  const thisWeek = { start: startOfWeek(now, locale), end: endOfWeek(now, locale) };
  const thisMonth = { start: startOfMonth(now), end: endOfMonth(now) };
  const lastMonthStart = startOfMonth(now.subtract({ months: 1 }));
  const lastMonth = { start: lastMonthStart, end: endOfMonth(lastMonthStart) };

  const presets = [
    {
      key: "today",
      label: "Today",
      range: { start: now, end: now },
    },
    {
      key: "yesterday",
      label: "Yesterday",
      range: { start: now.subtract({ days: 1 }), end: now.subtract({ days: 1 }) },
    },
    {
      key: "last7",
      label: "Last 7 Days",
      range: { start: now.subtract({ days: 6 }), end: now },
    },
    {
      key: "last30",
      label: "Last 30 Days",
      range: { start: now.subtract({ days: 29 }), end: now },
    },
    { key: "thisMonth", label: "This Month", range: thisMonth },
    { key: "lastMonth", label: "Last Month", range: lastMonth },
    {
      key: "thisYear",
      label: "This Year",
      range: { start: startOfYear(now), end: endOfYear(now) },
    },
    { key: "custom", label: "Custom Range", range: null as any },
  ] as const;

  const triggerLabel = `${value.start} - ${value.end}`;
  const draftLabel = `${toIso((draftValue as any).start)} - ${toIso((draftValue as any).end)}`;

  const applyDraft = React.useCallback(() => {
    onApply({ start: toIso((draftValue as any).start), end: toIso((draftValue as any).end) });
    setIsOpen(false);
  }, [draftValue, onApply]);

  const cancelDraft = React.useCallback(() => {
    setDraftValue({ start: fromIso(value.start), end: fromIso(value.end) });
    setIsOpen(false);
  }, [value.end, value.start]);

  return (
    <Popover placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <button className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-indigo-400/60 bg-indigo-50 text-indigo-700">
            <span aria-hidden="true">📅</span>
          </span>
          <span className="whitespace-nowrap">{triggerLabel}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="max-w-[calc(100vw-16px)] overflow-visible p-0">
        <div className="w-[calc(100vw-16px)] overflow-hidden rounded-md border border-zinc-200 bg-white shadow-xl md:w-[860px] md:max-w-[860px]">
          <div className="flex min-h-[360px]">
            {/* Left presets */}
            <div className="w-[180px] shrink-0 border-r border-zinc-200 bg-white">
              <div className="py-2">
                {presets.map((p) => {
                  const isCustom = p.key === "custom";
                  return (
                    <button
                      key={p.key}
                      type="button"
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50",
                        isCustom ? "border-t border-zinc-200 mt-1" : "",
                      )}
                      onClick={() => {
                        if (!p.range) return;
                        setDraftValue(p.range as any);
                        setFocusedValue((p.range as any).end ?? now);
                      }}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calendar */}
            <div className="flex-1 p-3">
              <RangeCalendar
                visibleMonths={2 as any}
                classNames={{
                  base: "w-full",
                  content: "w-full",
                  headerWrapper: "px-2",
                  title: "text-sm font-semibold text-zinc-900",
                }}
                focusedValue={focusedValue as any}
                onFocusChange={setFocusedValue as any}
                nextButtonProps={{ variant: "light" as any }}
                prevButtonProps={{ variant: "light" as any }}
                value={draftValue as any}
                onChange={(v) => {
                  if (!v) return;
                  setDraftValue(v as any);
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 border-t border-zinc-200 px-3 py-2">
            <div className="text-sm text-zinc-700">{draftLabel}</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                onClick={cancelDraft}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                onClick={applyDraft}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}



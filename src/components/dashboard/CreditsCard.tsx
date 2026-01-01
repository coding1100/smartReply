"use client";

import { Button, Card, CardBody } from "@heroui/react";

export function CreditsCard() {
  return (
    <Card shadow="sm" className="col-span-12 rounded-xl bg-white shadow-sm border border-zinc-100 hover:shadow-md transition-all lg:col-span-4">
      <CardBody className="gap-5 p-6">
        <div className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
          CREDITS
        </div>

        <div className="flex items-center justify-center">
          <div className="relative h-40 w-40">
            <div className="absolute inset-0 rounded-full border-[10px] border-zinc-100" />
            <div
              className="absolute inset-0 rounded-full border-[10px] border-indigo-500"
              style={{ clipPath: "inset(0 0 85% 0)" }}
            />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div className="text-xs text-zinc-500">Credits Used</div>
              <div className="text-3xl font-semibold text-zinc-900">1%</div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-zinc-600">
          <span className="font-semibold text-zinc-900">TOTAL CREDITS</span>{" "}
          <span className="mx-2 text-zinc-300">•</span>
          <span className="font-semibold text-zinc-900">USED CREDITS</span>
        </div>
        <div className="flex items-center justify-center gap-10 text-sm">
          <div>
            <div className="text-xs text-zinc-500">Total</div>
            <div className="font-semibold text-zinc-900">300</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500">Used</div>
            <div className="font-semibold text-zinc-900">~4</div>
          </div>
        </div>

        <Button color="primary" className="w-full rounded-lg shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200">
          Upgrade plan
        </Button>
      </CardBody>
    </Card>
  );
}



"use client";

import { Avatar, Button, Card, CardBody, Chip, Input } from "@heroui/react";

export function PostDetails() {
  return (
    <Card shadow="sm" className="h-full rounded-2xl bg-white shadow-sm">
      <CardBody className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="md"
              src="https://i.pravatar.cc/100?img=12"
              name="Awais Jutt"
            />
            <div>
              <div className="text-sm font-semibold text-zinc-900">Awais Jutt</div>
              <div className="text-xs text-zinc-500">No email on file</div>
            </div>
          </div>
          <Button size="sm" variant="light">
            •••
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip size="sm" className="rounded-xl bg-indigo-100 text-indigo-700">
            Warm Contemporary
          </Chip>
          <Chip size="sm" className="rounded-xl bg-indigo-100 text-indigo-700">
            Cozy
          </Chip>
          <Chip size="sm" className="rounded-xl bg-indigo-100 text-indigo-700">
            Wood Accents
          </Chip>
        </div>

        <div className="rounded-2xl bg-zinc-50 p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-zinc-900">Notes</div>
            <Button size="sm" variant="light" className="text-indigo-600">
              Add note
            </Button>
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            Keep track of important customer interactions.
          </div>
          <div className="mt-3">
            <Input
              size="sm"
              placeholder="Write a note..."
              classNames={{
                inputWrapper: "rounded-2xl bg-white shadow-sm",
              }}
            />
          </div>
        </div>

        <div className="mt-auto text-xs text-zinc-400">
          Post / customer details panel
        </div>
      </CardBody>
    </Card>
  );
}



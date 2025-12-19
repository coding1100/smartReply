"use client";

import { Avatar, Card, CardBody, cn } from "@heroui/react";

export type ChatListItem = {
  id: string;
  name: string;
  message: string;
  time: string;
  platform: "facebook";
};

export function ChatList({
  items,
  activeId,
  onSelect,
}: {
  items: ChatListItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-4">
      <div className="mb-2 text-xs font-medium text-zinc-600">Recent chats</div>
      <div className="space-y-2">
        {items.map((c) => {
          const active = c.id === activeId;
          return (
            <Card
              key={c.id}
              shadow="sm"
              isPressable
              onPress={() => onSelect(c.id)}
              className={cn(
                "rounded-2xl bg-white shadow-sm",
                active && "ring-2 ring-indigo-500/30",
              )}
            >
              <CardBody className="flex flex-row items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Avatar size="sm" name="f" className="bg-indigo-600 text-white" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-indigo-700">
                      {c.name}
                    </div>
                    <div className="truncate text-xs text-zinc-500">{c.message}</div>
                  </div>
                </div>
                <div className="shrink-0 text-xs text-indigo-600">{c.time}</div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}



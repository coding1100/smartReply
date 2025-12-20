"use client";

import * as React from "react";
import { Avatar, Button, Card, CardBody, Input, Switch } from "@heroui/react";

type Msg = { id: string; who: "user" | "agent"; text: string; time?: string };

export function ChatThread({
  title,
  messages,
}: {
  title: string;
  messages: Msg[];
}) {
  const [text, setText] = React.useState("");

  return (
    <Card shadow="sm" className="h-full rounded-2xl bg-white shadow-sm">
      <CardBody className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-3">
            <Avatar size="sm" name="A" className="bg-zinc-900 text-white" />
            <div>
              <div className="!text-sm !font-semibold text-zinc-900">{title}</div>
              <div className="text-xs text-zinc-500">Ad ID:</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Switch size="sm" defaultSelected>
              Auto Reply
            </Switch>
            <Button size="sm" variant="light">
              •••
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-1 py-2">
          <div className="text-center text-xs text-zinc-400">2 days 1 hour ago</div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={m.who === "agent" ? "flex justify-end" : "flex justify-start"}
            >
              <div className="max-w-[75%]">
                <div
                  className={
                    m.who === "agent"
                      ? "rounded-2xl bg-emerald-50 p-3 text-sm text-zinc-800"
                      : "rounded-2xl bg-indigo-50 p-3 text-sm text-zinc-800"
                  }
                >
                  {m.text}
                </div>
                {m.time ? (
                  <div
                    className={
                      m.who === "agent"
                        ? "mt-1 text-right text-[11px] text-zinc-400"
                        : "mt-1 text-left text-[11px] text-zinc-400"
                    }
                  >
                    {m.time}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 border-t border-zinc-100 pt-3">
          <Button isIconOnly variant="bordered" className="rounded-2xl">
            ✓
          </Button>
          <Input
            value={text}
            onValueChange={setText}
            placeholder="Type a message"
            classNames={{
              inputWrapper: "rounded-2xl bg-white shadow-sm",
            }}
          />
          <Button
            isIconOnly
            color="primary"
            className="rounded-2xl bg-indigo-600"
            onPress={() => setText("")}
          >
            ➤
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}



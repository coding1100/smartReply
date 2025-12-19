"use client";

import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Switch,
  Tab,
  Tabs,
} from "@heroui/react";
import {
  IconMessageSquare,
  IconPhoneCall,
  IconChevronDown,
  IconFilter,
  IconLayers,
  IconSearch,
  IconSettings,
  IconSmile,
  IconUsers,
} from "./icons";

export function HomeClient() {
  const [tab, setTab] = React.useState<"chats" | "comments" | "subscribers">("chats");
  const [activeChatId, setActiveChatId] = React.useState("t_2122612654922893");
  const [activeCommentId, setActiveCommentId] = React.useState(
    "122146508888890127_885430057309494",
  );
  const [composerText, setComposerText] = React.useState("");

  const isChats = tab === "chats";
  const isComments = tab === "comments";

  return (
    <Card shadow="sm" className="rounded-2xl bg-white shadow-sm">
      <CardBody className="p-0">
        <div className="relative grid h-[calc(100dvh-64px-48px)] grid-cols-1 md:grid-cols-12">
          {/* Left: chat-aside */}
          <div className="border-b border-zinc-100 md:col-span-4 md:border-b-0 md:border-r md:border-zinc-100">
            <div className="flex h-full flex-col p-4">
              {/* aside-header */}
              <div className="space-y-3">
                <Tabs
                  selectedKey={tab}
                  onSelectionChange={(k) => setTab(String(k) as any)}
                  variant="underlined"
                  classNames={{ cursor: "bg-indigo-600" }}
                >
                  <Tab
                    key="chats"
                    title={
                      <span className="flex items-center gap-1">
                        <IconMessageSquare className="text-zinc-500" />
                        <span className="hidden sm:inline">Chats</span>
                      </span>
                    }
                  />
                  <Tab
                    key="comments"
                    title={
                      <span className="flex items-center gap-1">
                        <IconPhoneCall className="text-zinc-500" />
                        <span className="hidden sm:inline">Comments</span>
                      </span>
                    }
                  />
                  <Tab
                    key="subscribers"
                    title={
                      <span className="flex items-center gap-1">
                        <IconUsers className="text-zinc-500" />
                        <span className="hidden sm:inline">Subscribers</span>
                      </span>
                    }
                  />
                </Tabs>

                <Input
                  size="sm"
                  placeholder="Search here..."
                  startContent={<IconSearch className="text-zinc-400" />}
                  classNames={{
                    inputWrapper: "rounded-2xl bg-white shadow-sm",
                  }}
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Filters:</span>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button size="sm" variant="light" className="h-8 px-2">
                            <span className="inline-flex items-center gap-1 text-zinc-700">
                              <IconFilter className="text-zinc-500" />
                              All
                              <IconChevronDown className="text-zinc-400" />
                            </span>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Filters"
                          className="bg-white shadow-lg border border-zinc-100 rounded-2xl"
                        >
                          <DropdownItem key="all">All</DropdownItem>
                          <DropdownItem key="actions">Actions</DropdownItem>
                          <DropdownItem key="open_actions">Open Actions</DropdownItem>
                          <DropdownItem key="all_quality">All Quality</DropdownItem>
                          <DropdownItem key="quality_3">Quality 3 &amp; Up</DropdownItem>
                          <DropdownItem key="quality_4">Quality 4 &amp; Up</DropdownItem>
                          <DropdownItem key="quality_5">Quality 5</DropdownItem>
                          <DropdownItem key="follow_up">Follow Up</DropdownItem>
                          <DropdownItem key="long_thread">Long Thread</DropdownItem>
                          <DropdownItem key="auto_reply_off">Auto Reply Off</DropdownItem>
                          <DropdownItem key="link_clicks">Link Clicks</DropdownItem>
                          <DropdownItem key="unsubscribed">Unsubscribed/Unqualified</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="font-medium">Platform:</span>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button size="sm" variant="light" className="h-8 px-2">
                            <span className="inline-flex items-center gap-1 text-zinc-700">
                              <IconLayers className="text-zinc-500" />
                              All
                              <IconChevronDown className="text-zinc-400" />
                            </span>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Platform"
                          className="bg-white shadow-lg border border-zinc-100 rounded-2xl"
                        >
                          <DropdownItem key="all">All</DropdownItem>
                          <DropdownItem key="facebook">Facebook</DropdownItem>
                          <DropdownItem key="instagram">Instagram</DropdownItem>
                          <DropdownItem key="whatsapp">WhatsApp</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="font-medium">Sentiment:</span>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button size="sm" variant="light" className="h-8 px-2">
                            <span className="inline-flex items-center gap-1 text-zinc-700">
                              <IconSmile className="text-zinc-500" />
                              All
                              <IconChevronDown className="text-zinc-400" />
                            </span>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Sentiment"
                          className="bg-white shadow-lg border border-zinc-100 rounded-2xl"
                        >
                          <DropdownItem key="all">All</DropdownItem>
                          <DropdownItem key="positive">Positive</DropdownItem>
                          <DropdownItem key="neutral">Neutral</DropdownItem>
                          <DropdownItem key="negative">Negative</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <IconSettings className="text-zinc-500" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Settings menu"
                      className="bg-white shadow-lg border border-zinc-100 rounded-2xl"
                    >
                      <DropdownItem key="settings">Settings</DropdownItem>
                      <DropdownItem key="toggle">Turn off</DropdownItem>
                      <DropdownItem key="fb">Go to Facebook Page</DropdownItem>
                      <DropdownItem key="export">Export to CSV</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              {/* aside-body */}
              <div className="min-h-0 flex-1 overflow-y-auto pt-4">
                {tab === "chats" ? (
                  <div>
                    <div className="mb-2 text-xs text-zinc-500">Recent chats</div>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setActiveChatId("t_2122612654922893")}
                        className={[
                          "w-full rounded-2xl px-3 py-2 text-left transition",
                          activeChatId === "t_2122612654922893"
                            ? "bg-zinc-50 ring-2 ring-indigo-500/20"
                            : "hover:bg-zinc-50",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <Avatar
                              size="sm"
                              name="f"
                              className="bg-indigo-600 text-white"
                            />
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-zinc-900">
                                Awais Jutt
                              </div>
                              <div className="truncate text-xs text-zinc-500">
                                i like the 2nd option
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0 text-xs text-indigo-600">2 days ago</div>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : tab === "comments" ? (
                  <div>
                    <div className="mb-2 text-xs text-zinc-500">Recent comments</div>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveCommentId("122146508888890127_885430057309494")
                        }
                        className={[
                          "w-full rounded-2xl px-3 py-2 text-left transition",
                          activeCommentId === "122146508888890127_885430057309494"
                            ? "bg-zinc-50 ring-2 ring-indigo-500/20"
                            : "hover:bg-zinc-50",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <Avatar
                              size="sm"
                              name="f"
                              className="bg-indigo-600 text-white"
                            />
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-zinc-900">
                                Awais Jutt
                              </div>
                              <div className="truncate text-xs text-zinc-500">
                                thats beautifull
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0 text-xs text-indigo-600">2 days ago</div>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-2 text-xs text-zinc-500">Recent Subscribers</div>
                    <div className="text-sm text-zinc-400">No subscribers yet.</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle: chat-content */}
          <div className="md:col-span-5">
            <div className="flex h-full flex-col">
              {/* chat-header */}
              <div className="border-b border-zinc-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar
                        size="md"
                        src="https://i.pravatar.cc/100?img=12"
                        name="Awais Jutt"
                      />
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">
                        {isComments ? "Wise man" : "Awais Jutt"}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {isComments
                          ? "Post ID: 645232738675563_122146508888890127"
                          : "Ad ID:"}
                      </div>
                      {isChats ? (
                        <div className="mt-2">
                          <Switch size="sm" defaultSelected>
                            Auto Reply
                          </Switch>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button size="sm" variant="light">
                        •••
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Chat menu"
                      className="bg-white shadow-lg border border-zinc-100 rounded-2xl"
                    >
                      {isChats ? (
                        <DropdownItem key="edit">Edit conversation history</DropdownItem>
                      ) : (
                        <DropdownItem key="goto">Go to Post</DropdownItem>
                      )}
                      <DropdownItem key="clear">Clear agent thread history</DropdownItem>
                      <DropdownItem key="training">Open AI Training</DropdownItem>
                      <DropdownItem key="block">Block/Unblock User</DropdownItem>
                      <DropdownItem key="reprocess">Reprocess</DropdownItem>
                      <DropdownItem key="profile">Go to Profile</DropdownItem>
                      <DropdownItem key="link">Create Subscriber Link</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              {/* chat-body */}
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <div className="mb-4 text-center text-xs text-zinc-400">2 days 6 hours ago</div>

                <div className="space-y-4">
                  {isChats ? (
                    <>
                      {/* me */}
                      <div className="flex justify-end">
                        <div className="max-w-[75%]">
                          <div className="text-right text-xs font-semibold text-zinc-700">
                            Wise man{" "}
                            <span className="font-semibold text-indigo-600">AI</span>
                          </div>
                          <div className="mt-1 rounded-2xl bg-emerald-50 p-3 text-sm text-zinc-800">
                            Hi Awais! Thanks for the love, want behind-the-scenes shots or
                            design details of this Modern Residential Home? Message us and
                            we’ll send them right away.
                          </div>
                          <div className="mt-1 text-right text-[11px] text-zinc-400">
                            02:05 AM
                          </div>
                        </div>
                      </div>

                      {/* friend */}
                      <div className="flex justify-start gap-2">
                        <Avatar
                          size="sm"
                          src="https://i.pravatar.cc/100?img=12"
                          name="A"
                        />
                        <div className="max-w-[75%]">
                          <div className="text-xs font-semibold text-zinc-700">Awais Jutt</div>
                          <div className="mt-1 rounded-2xl bg-indigo-50 p-3 text-sm text-zinc-800">
                            yeah i really like this but can you provide something more
                            better options
                          </div>
                          <div className="mt-1 text-[11px] text-zinc-400">02:10 AM</div>
                        </div>
                      </div>
                    </>
                  ) : isComments ? (
                    <>
                      {/* friend comment message */}
                      <div className="flex justify-start gap-2">
                        <Avatar
                          size="sm"
                          src="https://i.pravatar.cc/100?img=12"
                          name="A"
                        />
                        <div className="max-w-[82%]">
                          <div className="text-xs font-semibold text-zinc-700">Awais Jutt</div>
                          <div className="mt-1 rounded-2xl bg-zinc-50 p-3 text-sm text-zinc-800">
                            thats beautifull
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-[11px] text-zinc-400">02:04 AM</div>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="light" className="text-indigo-600">
                                Send Reply
                              </Button>
                              <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                  <Button size="sm" variant="light">
                                    •••
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  aria-label="Comment menu"
                                  className="bg-white shadow-lg border border-zinc-100 rounded-2xl"
                                >
                                  <DropdownItem key="train">Open Training</DropdownItem>
                                  <DropdownItem key="reprocess">Reprocess</DropdownItem>
                                  <DropdownItem key="profile">Go to Profile</DropdownItem>
                                  <DropdownItem key="delete">Delete</DropdownItem>
                                  <DropdownItem key="hide">Hide Comment</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Button size="sm" variant="light" className="text-indigo-600">
                              Show Replies (1)
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-center text-xs text-zinc-400">Yesterday</div>
                      <div className="flex justify-start gap-2">
                        <Avatar
                          size="sm"
                          src="https://i.pravatar.cc/100?img=1"
                          name="W"
                        />
                        <div className="max-w-[82%]">
                          <div className="text-xs font-semibold text-zinc-700">Wise man</div>
                          <div className="mt-1 rounded-2xl bg-zinc-50 p-3 text-sm text-zinc-800">
                            that's awesome
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-[11px] text-zinc-400">06:13 AM</div>
                            <Button size="sm" variant="light" className="text-indigo-600">
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* chat-footer */}
              <div className="border-t border-zinc-100 bg-white p-3">
                <div className="flex items-center gap-1">
                  <Button isIconOnly variant="bordered" className="rounded-2xl">
                    ✓
                  </Button>
                  <Input
                    value={composerText}
                    onValueChange={setComposerText}
                    placeholder="Type a message"
                    classNames={{ inputWrapper: "rounded-2xl bg-white shadow-sm" }}
                  />
                  <Button
                    isIconOnly
                    color="primary"
                    className="rounded-2xl bg-indigo-600"
                    onPress={() => setComposerText("")}
                  >
                    ➤
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: chat-sidebar */}
          <div className="hidden border-l border-zinc-100 p-4 xl:col-span-3 xl:block">
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="lg"
                    src="https://i.pravatar.cc/100?img=12"
                    name="Awais Jutt"
                  />
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">
                      {isComments ? "House of My Dream" : "Awais Jutt"}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {isComments ? "Page post" : "No email on file"}
                    </div>
                  </div>
                </div>
              </div>

              {isChats ? (
                <div className="mt-3 flex flex-wrap gap-2">
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
              ) : null}

              <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">Notes</div>
                    <div className="text-xs text-zinc-500">
                      Keep track of important customer interactions.
                    </div>
                  </div>
                  <Button size="sm" variant="light" className="text-indigo-600">
                    Add note
                  </Button>
                </div>
              </div>

              {isComments ? (
                <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="aspect-video bg-zinc-100">
                    {/* post preview placeholder */}
                    <div className="h-full w-full bg-gradient-to-br from-zinc-100 to-zinc-200" />
                  </div>
                  <div className="p-3 text-xs text-zinc-500">Post media preview</div>
                </div>
              ) : null}

              <div className="mt-auto text-xs text-zinc-400">
                {isComments ? `Selected comment: ${activeCommentId}` : "Conversation sidebar"}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}



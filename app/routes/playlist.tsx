"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { useState } from "react";
import { appName } from "../../constants";
import type { Route } from "./+types/playlist";
import { PlaylistList } from "components/shared/Playlists";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Playlist" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

const mockPlaylists = [
  { name: "پلی لیست ۱", isPublished: true },
  { name: "پلی لیست ۲", isPublished: true },
  { name: "پلی لیست ۳", isPublished: false },
];

export default function Playlist() {
  const [tab, setTab] = useState("all");

  const tabs = [
    { value: "all", label: "همه" },
    { value: "published", label: "منتشر شده‌ها" },
    { value: "unpublished", label: "پیش‌نویس‌ها" },
  ];

  const filtered =
    tab === "all"
      ? mockPlaylists
      : tab === "published"
        ? mockPlaylists.filter((p) => p.isPublished)
        : mockPlaylists.filter((p) => !p.isPublished);

  return (
    <div className="flex flex-col gap-3">
      <Tabs defaultValue="all" onValueChange={setTab} dir="rtl">
        <TabsList className="flex bg-base-200 space-x-1.5">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="border-primary-300 data-[state=active]:bg-primary-800 data-[state=active]:border-primary-800 data-[state=active]:text-primary-foreground data-[state=active]:shadow-none px-4 text-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value}>
            <PlaylistList items={filtered} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

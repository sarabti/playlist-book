"use client";

import {
  TabsList,
  TabsTrigger,
  TabsContent,
  Tabs,
} from "../components/ui/Tabs";
import { useEffect, useState } from "react";
import { appName } from "../../constants";
import type { Route } from "./+types/playlist";
import { PlaylistList } from "~/components/shared/Playlists";
import { Button } from "~/components/ui/Button";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import UploadMediaModal from "~/components/shared/UploadMediaModal";
import { getAllFiles } from "~/lib/db";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Playlist" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

export default function Playlist() {
  const [tab, setTab] = useState("all");
  const [files, setFiles] = useState<any[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  const refreshFiles = () => {
    setReloadKey((k) => k + 1);
  };

  useEffect(() => {
    loadFiles();
  }, [reloadKey]);

  async function loadFiles() {
    const stored = await getAllFiles();
    setFiles(stored);
  }

  const tabs = [
    { value: "all", label: "همه" },
    { value: "published", label: "منتشر شده‌ها" },
    { value: "unpublished", label: "پیش‌نویس‌ها" },
  ];

  const filtered =
    tab === "all"
      ? files
      : tab === "published"
        ? files.filter((p) => p.isPublished)
        : files.filter((p) => !p.isPublished);

  return (
    <div className="flex flex-col gap-3">
      <Dialog onOpenChange={(open) => !open && refreshFiles()}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-primary-800 text-white rounded-xl px-5 py-2 w-max mr-auto">
            <Upload className="w-5 h-5" />
            آپلود جدید
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">آپلود فایل</DialogTitle>
          </DialogHeader>

          <UploadMediaModal />
        </DialogContent>
      </Dialog>
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

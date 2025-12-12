"use client";

import { TabsList, TabsTrigger, TabsContent, Tabs } from "~/components/ui/Tabs";
import { useEffect, useState, useTransition } from "react";
import { appName } from "../../constants";
import type { Route } from "./+types/playlist";
import { PlaylistList } from "~/components/shared/PlaylistList";
import { Button } from "~/components/ui/Button";
import { Upload, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import UploadMediaModal from "~/components/shared/UploadMediaModal";
import { useFilesStore } from "~/useFileStore";
import { toast } from "sonner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Playlist" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

export default function Playlist() {
  const [tab, setTab] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [fadeKey, setFadeKey] = useState(0);

  const {
    files,
    loadFiles,
    toggleFavorite,
    togglePublish,
    duplicate,
    delete: deleteFileAction,
  } = useFilesStore();
  const loading = useFilesStore((state) => state.loading);
  const mutating = useFilesStore((state) => state.mutating);

  useEffect(() => {
    loadFiles();
  }, []);

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

  const handleTabChange = (value: string) => {
    startTransition(() => {
      setFadeKey((k) => k + 1);
      setTab(value);
    });
  };

  const handleFav = (id: number) =>
    startTransition(async () => {
      const file = files.find((f) => f.id === id);
      const toastMsg = file?.isFavorite
        ? "فایل از نشان‌شده‌ها حذف شد"
        : "فایل به نشان‌شده‌ها اضافه شد";
      await toggleFavorite(id);
      toast.success(toastMsg);
    });

  const handlePublish = (id: number) =>
    startTransition(async () => {
      const file = files.find((f) => f.id === id);
      const toastMsg = file?.isPublished
        ? "فایل به پیش‌نویس منتقل شد"
        : "فایل منتشر شد";
      await togglePublish(id);
      toast.success(toastMsg);
    });

  const handleDuplicate = (id: number) =>
    startTransition(async () => {
      await duplicate(id);
      toast.success("فایل کپی شد");
    });

  const handleDelete = (id: number) =>
    startTransition(async () => {
      await deleteFileAction(id);
      toast.success("فایل حذف شد");
    });

  const showLoader = loading || mutating || isPending;

  return (
    <div className="flex flex-col gap-3 relative">
      <Dialog onOpenChange={(open) => !open && loadFiles()}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-primary-800 hover:bg-primary-900 text-white rounded-xl px-5 py-2 w-max mr-auto">
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

      <Tabs defaultValue="all" onValueChange={handleTabChange} dir="rtl">
        <TabsList className="flex bg-base-200 space-x-1.5">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="border-gray-300 hover:bg-gray-200 data-[state=active]:bg-primary-800 data-[state=active]:border-primary-800 data-[state=active]:text-primary-foreground data-[state=active]:shadow-none px-4 text-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value} className="relative">
            <div
              key={fadeKey}
              className="transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn"
            >
              {showLoader ? (
                <div className="flex flex-col items-center justify-center py-20 gap-2">
                  <Loader className="animate-spin w-8 h-8 text-primary-800" />
                  <span className="text-primary-800">در حال بارگزاری...</span>
                </div>
              ) : (
                <PlaylistList
                  items={filtered}
                  favAction={handleFav}
                  publishAction={handlePublish}
                  duplicateAction={handleDuplicate}
                  deleteAction={handleDelete}
                />
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

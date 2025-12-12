import { useState } from "react";
import { Card, CardDescription, CardTitle } from "~/components/ui/Card";
import {
  Archive,
  CloudUpload,
  Copy,
  FileMusic,
  Play,
  Star,
  Trash2,
  type LucideProps,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { AudioPlayer } from "./AudioPlayer";

type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

interface ListProps {
  items: {
    id: number;
    name: string;
    isPublished: boolean;
    isFavorite: boolean;
    data: ArrayBuffer;
  }[];
  favAction: (id: number) => void;
  publishAction: (id: number) => void;
  duplicateAction: (id: number) => void;
  deleteAction: (id: number) => void;
}

interface IconButton {
  icon: IconType;
  label: string;
  onClick: (id: number) => void;
}

export function PlaylistList({
  items,
  favAction,
  publishAction,
  duplicateAction,
  deleteAction,
}: ListProps) {
  const [openPlayerId, setOpenPlayerId] = useState<number | null>(null);

  const getIconButtons = (isPublished: boolean): IconButton[] => [
    {
      icon: Star,
      label: "نشان کردن",
      onClick: favAction,
    },
    {
      icon: isPublished ? Archive : CloudUpload,
      label: isPublished ? "انتقال به پیش‌نویس" : "انتشار",
      onClick: publishAction,
    },
    { icon: Copy, label: "کپی فایل", onClick: duplicateAction },
    {
      icon: Play,
      label: "پخش فایل",
      onClick: (id) => {
        setOpenPlayerId((prev) => (prev === id ? null : id));
      },
    },
    { icon: Trash2, label: "حذف فایل", onClick: deleteAction },
  ];

  const renderFill = (icon: IconType, isFavorite: boolean) => {
    return isFavorite && icon === Star ? "yellow" : "none";
  };

  if (items.length === 0) {
    return <p className="text-center text-gray-500 mt-24">فایلی یافت نشد</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      {items.map((file) => {
        const isOpen = openPlayerId === file.id;

        return (
          <div key={file.id} className="flex flex-col w-full">
            <Card className="w-full rounded-xl py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-none border-0">
              <div className="flex flex-row space-x-4">
                <div className="rounded-lg bg-gray-200">
                  <FileMusic className="m-2" strokeWidth={1} />
                </div>

                <div className="flex flex-col text-right">
                  <CardTitle className="text-sm font-semibold">
                    {file.name}
                  </CardTitle>

                  <CardDescription className="text-xs text-gray-500">
                    {file.isPublished ? "منتشر شده" : "منتشر نشده"}
                  </CardDescription>
                </div>
              </div>

              <TooltipProvider>
                <div className="self-end sm:self-center flex items-center gap-4 text-gray-700">
                  {getIconButtons(file.isPublished).map(
                    ({ icon: Icon, label, onClick }, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <button
                            className="rounded-xl transition-all cursor-pointer"
                            aria-label={label}
                            onClick={() => onClick(file.id)}
                          >
                            <Icon
                              className="w-5 h-5 hover:text-primary-900"
                              strokeWidth="1.5px"
                              fill={renderFill(Icon, file.isFavorite)}
                            />
                          </button>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>{label}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  )}
                </div>
              </TooltipProvider>
            </Card>

            <div
              className={`
                transition-all duration-300 overflow-hidden
                ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              {isOpen && (
                <AudioPlayer
                  data={file.data}
                  onClose={() => setOpenPlayerId(null)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

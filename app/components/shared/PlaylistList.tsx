import {
  Card,
  CardDescription,
  CardTitle,
} from "~/components/ui/Card";
import {
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

interface ListProps {
  items: { id: number; name: string; isPublished: boolean, isFavourite: boolean }[];
  favAction: (id: number) => void;
  duplicateAction: (id: number) => void;
  deleteAction: (id: number) => void;
}

interface IconButton {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  onClick: (id: number) => void;
}

export function PlaylistList({
  items,
  favAction,
  duplicateAction,
  deleteAction,
}: ListProps) {
  const IconButtons: IconButton[] = [
    { icon: Star, label: "نشان کردن", onClick: favAction },
    { icon: Copy, label: "کپی فایل", onClick: duplicateAction },
    { icon: Play, label: "پخش فایل", onClick: favAction },
    { icon: Trash2, label: "حذف فایل", onClick: deleteAction },
  ];

  if (items.length === 0) {
    return <p className="text-center text-gray-500 mt-24">چیزی یافت نشد</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      {items.map((file, idx) => (
        <Card
          key={idx}
          className="w-full rounded-xl py-3 px-4 flex flex-row items-center justify-between shadow-none border-0"
        >
          <div className="flex flex-row space-x-4">
            <div className="rounded-lg bg-gray-200">
              <FileMusic className="m-2" strokeWidth={1} />
            </div>
            <div className="flex flex-col text-right">
              <CardTitle className="text-sm font-semibold">{file.name}</CardTitle>
              <CardDescription className="text-xs text-gray-500">
                {file.isPublished ? "منتشر شده" : "بدون کانکت"}
              </CardDescription>
            </div>
          </div>

          <TooltipProvider>
            <div className="flex items-center gap-4 text-gray-700">
              {IconButtons.map(({ icon: Icon, label, onClick }, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <button
                      className="rounded-xl transition-all cursor-pointer"
                      aria-label={label}
                      onClick={() => onClick(file.id)}
                    >
                      <Icon className="w-5 h-5 hover:text-primary-900" strokeWidth="1.5px" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </Card>
      ))}
    </div>
  );
}

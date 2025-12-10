import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import { Copy, FileMusic, Play, Star, Trash2 } from "lucide-react";

interface ListProps {
  items: { name: string; isPublished: boolean }[];
}

export function PlaylistList({ items }: ListProps) {
  if (items.length === 0) {
    return <p className="text-center text-gray-500 mt-4">چیزی یافت نشد</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      {items.map((pl, idx) => (
        <Card
          key={idx}
          className="w-full rounded-xl py-3 px-4 flex flex-row items-center justify-between shadow-none border-0"
        >
          <div className="flex flex-row space-x-4">
            <div className="rounded-lg bg-gray-200">
              <FileMusic className="m-2" strokeWidth={1} />
            </div>
            <div className="flex flex-col text-right">
              <CardTitle className="text-sm font-semibold">{pl.name}</CardTitle>
              <CardDescription className="text-xs text-gray-500">
                {pl.isPublished ? "منتشر شده" : "بدون کانکت"}
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <Star className="w-5 h-5" strokeWidth={"1.5px"} />
            <Copy className="w-5 h-5" strokeWidth={"1.5px"} />
            <Play className="w-5 h-5" strokeWidth={"1.5px"} />
            <Trash2 className="w-5 h-5" strokeWidth={"1.5px"} />
          </div>
        </Card>
      ))}
    </div>
  );
}

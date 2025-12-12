"use client";

import { useCallback, useState } from "react";
import { Upload, FolderUp, AlertCircle, Loader2 } from "lucide-react";
import { Progress } from "~/components/ui/progress";
import { toast } from "sonner";

interface DragDropUploadProps {
  saveFile: (file: File) => void;
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({ saveFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = (files: FileList | null) => {
    if (!files) return null;

    for (const file of files) {
      if (!file.type.startsWith("audio/")) {
        return "فقط فایل‌های صوتی مجاز هستند.";
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        return "حجم فایل باید کمتر از ۱۰ مگابایت باشد.";
      }
    }

    return null;
  };

  const handleFiles = async (files: FileList | null) => {
    const validationError = validateFiles(files);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    if (!files) return;

    setLoading(true);
    for (const file of files) {
      await saveFile(file);
    }
    setLoading(false);

    toast.success("بارگذاری با موفقیت انجام شد");
  };

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    await handleFiles(e.dataTransfer.files);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl border-primary bg-primary/10">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
          <p className="text-lg font-medium">در حال بارگذاری فایل‌ها...</p>
          <Progress value={50} className="w-full mt-4" />
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition
            ${isDragging ? "border-primary bg-primary/10" : "border-gray-300"}
          `}
        >
          <Upload className="w-10 h-10 mx-auto mb-3 text-gray-600" />

          <p className="text-lg font-medium">فایل صوتی را اینجا رها کنید</p>
          <p className="text-sm text-gray-500 mt-2">
            یا از دکمه زیر آپلود کنید
          </p>

          <label
            htmlFor="file-upload"
            className="mt-4 inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            <FolderUp className="w-5 h-5" />
            انتخاب فایل
          </label>

          <input
            id="file-upload"
            type="file"
            accept="audio/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg text-sm">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;

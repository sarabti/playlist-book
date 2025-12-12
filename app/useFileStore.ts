"use client";

import { create } from "zustand";
import {
  getAllFiles,
  toggleFavorite as dbToggleFavorite,
  togglePublish as dbTogglePublish,
  duplicateFile as dbDuplicateFile,
  deleteFile as dbDeleteFile,
} from "~/lib/db";

export type FileItem = {
  id: number;
  name: string;
  isFavorite: boolean;
  isPublished: boolean;
};

export type FilesStore = {
  files: FileItem[];
  loading: boolean;
  mutating: boolean;

  loadFiles: () => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
  togglePublish: (id: number) => Promise<void>;
  duplicate: (id: number) => Promise<void>;
  delete: (id: number) => Promise<void>;
};

export const useFilesStore = create<FilesStore>((set, get) => ({
  files: [],
  loading: false,
  mutating: false,

  loadFiles: async () => {
    set({ loading: true });
    const stored: FileItem[] = await getAllFiles();
    set({ files: stored, loading: false });
  },

  toggleFavorite: async (id: number) => {
    set({ mutating: true });

    set({
      files: get().files.map((f) =>
        f.id === id ? { ...f, isFavorite: !f.isFavorite } : f
      ),
    });

    await dbToggleFavorite(id);
    await get().loadFiles();

    set({ mutating: false });
  },

  togglePublish: async (id: number) => {
    set({ mutating: true });

    set({
      files: get().files.map((f) =>
        f.id === id ? { ...f, isPublished: !f.isPublished } : f
      ),
    });

    await dbTogglePublish(id);
    await get().loadFiles();

    set({ mutating: false });
  },

  duplicate: async (id: number) => {
    set({ mutating: true });

    await dbDuplicateFile(id);
    await get().loadFiles();

    set({ mutating: false });
  },

  delete: async (id: number) => {
    set({ mutating: true });

    set({ files: get().files.filter((f) => f.id !== id) });

    await dbDeleteFile(id);
    await get().loadFiles();

    set({ mutating: false });
  },
}));

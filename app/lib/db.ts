import { openDB } from "idb";
import type { IDBPDatabase } from "idb";

let db: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (typeof window === "undefined") return null;

  if (!db) {
    db = openDB("file-storage-db", 1, {
      upgrade(database) {
        if (!database.objectStoreNames.contains("files")) {
          database.createObjectStore("files", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
  }

  return db;
}

export async function saveFile(file: File) {
  const database = getDB();
  if (!database) return;

  const db = await database;

  await db.add("files", {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
    isPublished: false,
    isFavorite: false,
    data: await file.arrayBuffer(),
  });
}

export async function getAllFiles() {
  const database = getDB();
  if (!database) return [];
  const db = await database;

  return await db.getAll("files");
}

export async function deleteFile(id: number) {
  const database = getDB();
  if (!database) return;
  const db = await database;

  await db.delete("files", id);
}

export async function duplicateFile(id: number) {
  const database = getDB();
  if (!database) return;
  const db = await database;

  const original = await db.get("files", id);
  if (!original) return;

  const { id: _, ...dataWithoutId } = original;

  await db.add("files", {
    ...dataWithoutId,
    lastModified: Date.now(),
    isPublished: false,
    isFavorite: false,
  });
}

export async function togglePublish(id: number) {
  const database = getDB();
  if (!database) return;
  const db = await database;

  const item = await db.get("files", id);
  if (!item) return;

  item.isPublished = !item.isPublished;
  await db.put("files", item);
}

export async function toggleFavorite(id: number) {
  const database = getDB();
  if (!database) return;
  const db = await database;

  const item = await db.get("files", id);
  if (!item) return;

  item.isFavorite = !item.isFavorite;
  await db.put("files", item);
}

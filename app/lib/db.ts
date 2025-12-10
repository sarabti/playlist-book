import { openDB } from "idb";
import type { IDBPDatabase } from "idb";

let db: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (typeof window === "undefined") return null; // SSR safe

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
  if (!database) return; // SSR environment

  const db = await database;

  await db.add("files", {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
    isPublished: false,
    data: await file.arrayBuffer(),
  });
}

export async function getAllFiles() {
  const database = getDB();
  if (!database) return [];
  const db = await database;

  return await db.getAll("files");
}
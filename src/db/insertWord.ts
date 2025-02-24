import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.DATABASE_URL!);

import { dictionary, InsertEntry } from "./schema";

export async function createEntry(entry: InsertEntry) {
  await db.insert(dictionary).values(entry);
}

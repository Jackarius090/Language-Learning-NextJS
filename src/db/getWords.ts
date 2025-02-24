import { dictionary } from "./schema";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

export async function getAllWords() {
  const result = await db
    .select({
      source_word: dictionary.source_word,
      translated_word: dictionary.translated_word,
    })
    .from(dictionary);

  return result;
}

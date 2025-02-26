"use server";
import { dictionary, InsertEntry } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

// Function to read data from dictionary
export default async function getData() {
  try {
    const data = await db.select().from(dictionary);
    return data;
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    throw error;
  }
}

// Function to add a new entry to the dictionary
export async function addDictionaryEntry(entry: InsertEntry) {
  if (entry.source_word === "")
    return "Entry not added because empty source_word";
  try {
    const result = await db
      .insert(dictionary)
      .values(entry)
      .onConflictDoNothing({ target: dictionary.source_word })
      .returning();

    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error adding dictionary entry:", error);
    return { success: false, error };
  }
}

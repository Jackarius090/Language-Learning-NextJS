import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const pool = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(pool);

export const dictionary = pgTable("dictionary", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  source_word: varchar({ length: 255 }).notNull().unique(),
  translated_word: varchar({ length: 255 }).notNull(),
  source_language: varchar({ length: 50 }).default("Danish").notNull(),
  target_language: varchar({ length: 50 }).default("English").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertEntry = typeof dictionary.$inferInsert;

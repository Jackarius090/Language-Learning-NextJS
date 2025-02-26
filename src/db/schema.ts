import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const dictionary = pgTable("dictionary", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  source_word: varchar({ length: 255 }).notNull().unique(),
  translated_word: varchar({ length: 255 }).notNull(),
  source_language: varchar({ length: 50 }).default("Danish").notNull(),
  target_language: varchar({ length: 50 }).default("English").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertEntry = typeof dictionary.$inferInsert;

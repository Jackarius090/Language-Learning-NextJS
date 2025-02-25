import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL!;
console.log(process.env);
const sql = neon(databaseUrl);
export const db = drizzle({ client: sql });

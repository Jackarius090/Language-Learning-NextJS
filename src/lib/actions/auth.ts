"use server";

import { signIn, signOut } from "@/auth";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};
export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const saltAndHashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const getUserFromDb = async (email: string, passwordHash: string) => {
  const user = await db
    .select({
      password: users.password,
      name: users.name,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1); // Ensures we only fetch one user

  if (!user.length) {
    return false; // No user found
  }

  return await bcrypt.compare(passwordHash, user[0].password);
};

"use server";

import { signIn, signOut } from "@/auth";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const saltAndHashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const getUserFromDb = async (email: string, passwordHash: string) => {
  const userResult = await db
    .select({
      id: users.id, // Make sure to include the id
      email: users.email,
      password: users.password,
      name: users.name,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!userResult.length) {
    return null; // Return null instead of false when no user is found
  }

  const user = userResult[0];

  if (!user.password) {
    return null; // Return null if no password is stored
  }

  // Now TypeScript knows user.password is not null
  if (await bcrypt.compare(passwordHash, user.password)) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  // Return null if password doesn't match
  return null;
};

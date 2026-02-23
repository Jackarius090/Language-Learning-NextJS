"use client";
import Link from "next/link";
import { Button } from "./ui/button";

export default function LoginButton() {
  return (
    <Button variant="outline" asChild>
      <Link href={"/api/auth/signin"}>Sign in</Link>
    </Button>
  );
}

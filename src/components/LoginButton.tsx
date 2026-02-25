"use client";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function LoginButton() {
  const pathname = usePathname();

  return (
    <Button
      variant="outline"
      onClick={() => signIn("google", { callbackUrl: pathname })}
    >
      Login
    </Button>
  );
}

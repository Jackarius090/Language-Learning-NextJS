"use client";

import { Button } from "./ui/button";
import { login } from "@/lib/actions/auth";

export default function GithubLogin() {
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          login("github");
        }}
      >
        sign in with Github
      </Button>
    </div>
  );
}

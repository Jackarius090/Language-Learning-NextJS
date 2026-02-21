"use client";

import { Button } from "./ui/button";
import { handleGithubSignin } from "@/app/actions/authActions";

export default function GithubLogin() {
  return (
    <form action={handleGithubSignin}>
      <Button variant="outline" type="submit">
        Sign in with GitHub
      </Button>
    </form>
  );
}

"use client";

import { Button } from "./ui/button";
import { handleGithubSignin } from "@/app/actions/authActions";

export default function GithubLogin() {
  return (
    <div>
      <Button variant="outline" onClick={handleGithubSignin}>
        sign in with Github
      </Button>
    </div>
  );
}

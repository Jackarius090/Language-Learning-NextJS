"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SignupFormSchema } from "@/lib/zodDefinitions";
import { useState } from "react";
import bcrypt from "bcryptjs";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    setError(null);

    try {
      // 1️⃣ Hash the password
      const hashedPassword = await bcrypt.hash(values.password, 10);

      // 2️⃣ Send a request to your API to create the user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: hashedPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create an account.");
      }

      // 3️⃣ Redirect to sign-in page after success
      window.location.href = "/auth/signin";
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="m-auto w-1/2 mt-20">
      <div className="flex gap-80">
        <h1 className="mb-5">Signup Form</h1>
        <Button variant="outline">
          <Link href="/">Go Back</Link>
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </Form>
    </div>
  );
}

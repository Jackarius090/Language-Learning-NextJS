import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function GPTgenerate(prompt: string) {
  try {
    const res = await fetch("/api/gptgenerate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch response");
    }

    const data = await res.json();
    const object = data.choices[0].message.content;
    return object || "No content found.";
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return "Error fetching response";
  }
}

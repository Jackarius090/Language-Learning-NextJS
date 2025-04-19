import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateDanishSentences(
  highlightedText: string,
  language: string
) {
  try {
    const res = await fetch("/api/gptgenerate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Return three example sentences using this word: ${highlightedText}. The sentences should be in this language (using ISO 639 language codes): ${language}. Each sentence should be immediatly followed by the english translation in parentheses. Format the response as a JSON object with a 'sentences' key, containing an array of strings.`,
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

export async function generateDanishText(readingLevel: string) {
  try {
    const res = await fetch("/api/getdanishtext", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Write an original short story in Danish for a Danish language learner. It should be at reading level ${readingLevel} using the Common European Framework of Reference`,
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

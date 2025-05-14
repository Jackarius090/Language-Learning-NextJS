"use server";

import { auth } from "@/auth";
import { decode } from "he";

export async function getWordExplanation(word: string, language: string) {
  if (word.length > 30 || language.length > 6) {
    console.log("error: inputs invalid to get explanation");
    return "error: inputs invalid to get explanation";
  }
  const session = await auth();
  if (!session || !session.user) {
    console.log("not authenticated, no session found");
    return;
  }
  return getExplanation(word, language);
}

async function getExplanation(word: string, language: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      cache: "no-cache",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a Danish language teacher that explains the meaning of words and how they are used",
          },
          {
            role: "user",
            content: `Please explain the possible different meanings of this word: ${word}. Include three example sentences that show the possible different meanings of the word with an english translation. The language of the word is (using ISO 639 language codes): ${language}.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = decode(data.choices[0].message.content);
    return reply || "No content found.";
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return "Error fetching response";
  }
}

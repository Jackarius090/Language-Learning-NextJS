"use server";
import { auth } from "@/auth";

export async function generateDanishText(readingLevel: string) {
  if (readingLevel.length != 2) {
    console.log("readingLevel length too long");
    return;
  }
  const session = await auth();

  if (!session || !session.user) {
    console.log("not authenticated, no session found");
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      cache: "no-store",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 1.1,
        messages: [
          {
            role: "system",
            content:
              "You are a creative storyteller who writes original short stories in Danish for people learning the language. Each story you will write in the style of a random famous Danish author. Each story will be set in a random location and have a random theme. Your stories will be around 200 words long and tailored to the CEFR level specified. Always use correct Danish grammar and spelling, and ensure the vocabulary and sentence structure match the learner's level.",
          },
          {
            role: "user",
            content: `Write an original short story in Danish for a Danish language learner. It should be at reading level ${readingLevel} using the Common European Framework of Reference`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const object = data.choices[0].message.content;
    console.log(object);
    return object || "No content found.";
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return "Error fetching response";
  }
}

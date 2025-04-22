"use server";

import { auth } from "@/auth";

export async function getExampleSentences(word: string, language: string) {
  if (word.length > 30 || language.length > 6) {
    console.log("error: inputs invalid to get example sentences");
    return "error: inputs invalid to get example sentences";
  }
  const session = await auth();
  if (!session || !session.user) {
    console.log("not authenticated, no session found");
    return;
  }
  return generateSentences(word, language);
}

async function generateSentences(word: string, language: string) {
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
              "You are a Danish language teacher that makes unique sentences that show the meaning of the word as well as how they are used grammically.",
          },
          {
            role: "user",
            content: `Return three example sentences using this word: ${word}. The sentences should be in this language (using ISO 639 language codes): ${language}. Each sentence should be immediatly followed by the english translation in parentheses. Format the response as a JSON object with a 'sentences' key, containing an array of strings.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const sentences = await JSON.parse(data.choices[0].message.content);
    return sentences || "No content found.";
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return "Error fetching response";
  }
}

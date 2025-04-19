import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini-2025-04-14",
        temperature: 1.1,
        messages: [
          {
            role: "system",
            content:
              "You are a creative storyteller who writes original short stories in Danish for people learning the language. Each story you will write in the style of a random famous Danish author. Each story will be set in a random location and have a random theme. Your stories will be around 200 words long and tailored to the CEFR level specified. Always use correct Danish grammar and spelling, and ensure the vocabulary and sentence structure match the learner's level.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

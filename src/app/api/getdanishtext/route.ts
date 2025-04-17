import { auth } from "@/auth";
import { NextResponse } from "next/server";
import getSession from "@/app/actions/getSession";

interface AuthenticatedRequest extends Request {
  auth?: any;
}

export const POST = auth(async function POST(
  req: AuthenticatedRequest
): Promise<Response> {
  const session = await getSession();
  console.log(session);
  if (!req.auth || !session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 1.2,
        top_p: 1.0,
        messages: [
          {
            role: "system",
            content:
              "You are a creative storyteller who always writes completely unique, imaginative short stories in Danish for language learners.",
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return new Response(JSON.stringify({ error: "Unknown error" }), {
      status: 500,
    });
  }
});

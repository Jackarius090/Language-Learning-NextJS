"use server";
import { auth } from "@/auth";
import { decode } from "he";

export async function translateText(text: string, language: string) {
  if (
    text.length > 200 ||
    language.length > 6 ||
    typeof text !== "string" ||
    typeof language !== "string"
  ) {
    console.log("error: inputs invalid to get translation");
    return "error: input too long";
  }
  const session = await auth();
  if (!session || !session.user) {
    console.log("not authenticated, no session found");
    return "not authenticated, no session found";
  }
  return getTranslation(text, language);
}

async function getTranslation(text: string, language: string) {
  "use cache";
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "http://localhost:3000",
      },
      body: JSON.stringify({
        q: text,
        target: "en",
        source: language,
      }),
    }
  );

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error("Translation error:", errorDetails);
    throw new Error("Failed to translate");
  }
  const data = await res.json();
  const translationData = data.data.translations[0].translatedText;
  const decodedTranslation = decode(translationData);

  return decodedTranslation;
}

"use server";

export async function translateText(text: string, language: string) {
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
  return data.data.translations[0].translatedText;
}

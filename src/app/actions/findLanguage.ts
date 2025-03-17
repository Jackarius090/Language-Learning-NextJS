"use server";

export async function findLanguage(text: string) {
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;

  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "http://localhost:3000",
      },
      body: JSON.stringify({
        q: text,
      }),
    }
  );

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error("Detect language error:", errorDetails);
    throw new Error("Failed to detect language");
  }
  const data = await res.json();
  return data.data.detections[0][0].language;
}

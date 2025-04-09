"use server";

export async function textToSpeech(text: string) {
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;

  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "http://localhost:3000",
      },
      body: JSON.stringify({
        input: {
          text: text,
        },
        voice: {
          languageCode: "da-DK",
          name: "da-DK-Standard-D",
          ssmlGender: "FEMALE",
        },
        audioConfig: {
          audioEncoding: "MP3",
        },
      }),
    }
  );

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error("Text-to-speech error:", errorDetails);
    throw new Error("Failed to synthesize speech");
  }

  const data = await res.json();
  return data.audioContent; // base64-encoded audio
}

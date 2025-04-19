"use server";

export const textToSpeech = async (text: string) => {
  "use cache";
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;

  if (!apiKey) {
    console.error(
      "Google Cloud API Key not configured in environment variables."
    );
    throw new Error("Server configuration error: API Key missing.");
  }

  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
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
  console.log("api request made");
  const data = await res.json();
  return data.audioContent; // base64-encoded audio
};

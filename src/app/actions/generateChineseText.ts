"use server";
import { auth } from "@/auth";

export async function generateChineseText(readingLevel: string) {
  if (readingLevel.length != 2) {
    console.log("readingLevel length too long");
    return;
  }
  const session = await auth();

  if (!session || !session.user) {
    console.log("not authenticated, no session found");
    return;
  }

  const locations = [
    "workplace",
    "beach",
    "on holiday",
    "at the store",
    "at home",
    "at school",
    "on the train",
    "in a café",
    "at the park",
    "at the gym",
    "at the library",
    "in the kitchen",
    "at the doctor's office",
    "at the airport",
    "at a birthday party",
    "at the supermarket",
    "in the forest",
    "in a small Danish village",
    "at a music festival",
    "at the zoo",
    "on a bike ride",
    "random",
  ];
  const themes = [
    "friendship",
    "losing something important",
    "making a new friend",
    "trying a new hobby",
    "a misunderstanding",
    "preparing a meal",
    "going shopping",
    "celebrating a holiday",
    "starting a new job",
    "going to the doctor",
    "taking care of a pet",
    "a family visit",
    "getting lost",
    "a surprising discovery",
    "a rainy day adventure",
    "helping a neighbor",
    "planning a party",
    "first day at school",
    "fixing something broken",
    "learning something new",
    "random",
  ];

  const storyLocation = locations[Math.floor(Math.random() * locations.length)];
  const theme = themes[Math.floor(Math.random() * themes.length)];
  console.log(theme);
  console.log(storyLocation);

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
            content: `You are a creative and experienced writer who writes engaging Chinese texts, tailored for people learning the language.
        
        Your task is to write an original text that:
        - Takes place in this setting: ${storyLocation}
        - Explores this theme: ${theme}
        - Is around 200 words long
        - Matches the reading level: ${readingLevel} (CEFR)
        - Always write in traditional chinese characters
        
        Use correct Chinese grammar and spelling. Make sure to include vocabulary and sentence structure hard enough for learners at the specified reading level. Include natural, everyday language and, if appropriate, short dialogue or common expressions.
        
        Repeat key vocabulary in meaningful ways to help reinforce learning.`,
          },
          {
            role: "user",
            content: `Please write a short Chinese text that follows the instructions above. Make sure to include vocabulary hard enough for a ${readingLevel} learner.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const object = data.choices[0].message.content;
    return object || "No content found.";
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
    return "Error fetching response";
  }
}

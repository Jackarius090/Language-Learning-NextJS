"use client";
import { useState, FormEvent } from "react";
import { Button } from "./ui/button";

export default function Home({
  highlightedText,
  language,
}: {
  highlightedText: string;
  language: string;
}) {
  const [response, setResponse] = useState<string>("");

  const prompt = `Return three example sentences using this word: ${highlightedText}. The sentences should be in this language (using ISO 639 language codes): ${language}. Each sentence should be immediated followed by the english translation in parentheses. Format the response as a JSON object with a 'sentences' key, containing an array of strings.`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/gptgenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      const object = JSON.parse(data.choices[0].message.content);
      setResponse(object.sentences || "No sentences found.");
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      setResponse("Error fetching response");
    }
  };

  return (
    <section className="py-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Button variant="outline">Get example sentences</Button>
      </form>
      <h1 className="mt-3">Example sentences:</h1>
      <div className="mt-4">1. {response[0]}</div>
      <div className="mt-4">2. {response[1]}</div>
      <div className="mt-4">3. {response[2]}</div>
    </section>
  );
}

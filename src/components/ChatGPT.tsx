"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { GPTgenerate } from "@/lib/utils";

export default function Home({
  highlightedText,
  language,
}: {
  highlightedText: string;
  language: string;
}) {
  const [response, setResponse] = useState<string>("");

  const handleClick = async () => {
    const prompt = `Return three example sentences using this word: ${highlightedText}. The sentences should be in this language (using ISO 639 language codes): ${language}. Each sentence should be immediated followed by the english translation in parentheses. Format the response as a JSON object with a 'sentences' key, containing an array of strings.`;
    const data = await GPTgenerate(prompt);
    const object = JSON.parse(data);
    setResponse(object.sentences || "No sentences found.");
  };

  return (
    <section className="py-4">
      <Button onClick={handleClick} variant="outline">
        Get example sentences
      </Button>
      <h1 className="mt-3">Example sentences:</h1>
      <div className="mt-4">1. {response[0]}</div>
      <div className="mt-4">2. {response[1]}</div>
      <div className="mt-4">3. {response[2]}</div>
    </section>
  );
}

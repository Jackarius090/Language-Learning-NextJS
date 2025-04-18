"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { generateDanishSentences } from "@/lib/utils";

export default function Home({
  highlightedText,
  language,
}: {
  highlightedText: string;
  language: string;
}) {
  const [response, setResponse] = useState<string>("");

  const handleClick = async () => {
    const data = await generateDanishSentences(highlightedText, language);
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

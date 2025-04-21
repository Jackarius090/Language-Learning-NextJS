"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { getExampleSentences } from "@/app/actions/getExampleSentences";

export default function ExampleSentences({
  highlightedText,
  language,
}: {
  highlightedText: string;
  language: string;
}) {
  const [sentences, setSentences] = useState<string>("");

  const handleClick = async () => {
    const data = await getExampleSentences(highlightedText, language);
    console.log(sentences);
    setSentences(data.sentences || "No sentences found.");
  };

  return (
    <section className="py-4">
      <Button onClick={handleClick} variant="outline">
        Get example sentences
      </Button>
      <h1 className="mt-3">Example sentences:</h1>
      <div className="mt-4">1. {sentences[0]}</div>
      <div className="mt-4">2. {sentences[1]}</div>
      <div className="mt-4">3. {sentences[2]}</div>
    </section>
  );
}

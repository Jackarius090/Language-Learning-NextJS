"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const Words = dynamic(() => import("./Words"));

export default function WordList({
  words,
}: {
  words: Promise<
    {
      id: number;
      source_word: string;
      translated_word: string;
      source_language: string;
      target_language: string;
      createdAt: Date;
    }[]
  >;
}) {
  const [loadWords, setloadWords] = useState(false);

  return (
    <section>
      {loadWords && <Words words={words} />}
      <button onClick={() => setloadWords(!loadWords)}>Toggle</button>
    </section>
  );
}

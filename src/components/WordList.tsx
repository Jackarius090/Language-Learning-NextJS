"use client";
import dynamic from "next/dynamic";
const Words = dynamic(() => import("./Words"));

export default function WordList({
  words,
  loadWords,
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
  loadWords: boolean;
}) {
  return (
    <section>
      {loadWords && <Words words={words} />}
      <button onClick={() => setloadWords(!loadWords)}>Toggle</button>
    </section>
  );
}

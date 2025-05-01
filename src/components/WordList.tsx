"use client";
import dynamic from "next/dynamic";
import { useLoadWordsStore } from "@/lib/loadWordsToggle";

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
  const loadWords = useLoadWordsStore((state) => state.loadWordsToggle);

  return <section>{loadWords && <Words words={words} />}</section>;
}

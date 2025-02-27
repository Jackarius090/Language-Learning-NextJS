"use client";

import { useState } from "react";
import { Input } from "./ui/input";

type Word = {
  id: number;
  source_word: string;
  translated_word: string;
  source_language: string;
  target_language: string;
  createdAt: Date;
};

export default function WordList({ words }: { words: Word[] }) {
  const [searchItem, setSearchItem] = useState("");
  const [filteredWords, setFilteredWords] = useState(words);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = words.filter(
      (word) =>
        word.source_word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translated_word.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWords(filteredItems);
  };

  return (
    <section>
      <h1 className="ml-4 mb-3 text-xl">Word List</h1>
      <div className="m-3">
        <Input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
        />
      </div>
      {filteredWords.map((word, i) => (
        <div className="border-2 p-3 mx-3" key={i}>
          <p>Danish: {word.source_word}</p>
          <p>English: {word.translated_word}</p>
        </div>
      ))}
    </section>
  );
}

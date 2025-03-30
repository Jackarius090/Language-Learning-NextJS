"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import Fuse from "fuse.js";

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

  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // ignoreDiacritics: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["source_word", "translated_word"],
  };

  const fuse = new Fuse(words, fuseOptions);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    if (e.target.value.trim() === "") {
      setFilteredWords(words);
    } else {
      const fuzzyFilteredWords = fuse
        .search(e.target.value)
        .map((result) => result.item);
      setFilteredWords(fuzzyFilteredWords);
    }
  };
  // Old search method
  //   const filteredItems = words.filter(
  //     (word) =>
  //       word.source_word.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       word.translated_word.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredWords(filteredItems);
  // };

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

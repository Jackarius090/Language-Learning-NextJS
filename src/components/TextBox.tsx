"use client";
import { Textarea } from "./ui/textarea";
import { useState, useRef } from "react";
import { translateText } from "@/app/actions/translate";
import { addDictionaryEntry } from "../db/dbActions";

export default function TextBox() {
  const [highlightedText, setHighlightedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function newEntry(sw: string, tw: string) {
    // Adding a new entry
    const newEntry = {
      source_word: sw,
      translated_word: tw,
      source_language: "Danish",
      target_language: "English",
    };

    const result = await addDictionaryEntry(newEntry);
    console.log(result);
  }

  const handleSelection = async () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selectedText = textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
      );
      setHighlightedText(selectedText);
      const translation = await translate(selectedText);
      setTranslatedText(translation);
      await newEntry(selectedText, translation);
    }
  };

  async function translate(text: string) {
    return await translateText(text);
  }

  return (
    <>
      <Textarea
        ref={textareaRef}
        placeholder="Add text here... Try adding a sample text from the menu above or copy in your own text"
        onMouseUp={handleSelection}
      />
      <div className="flex flex-col gap-3">
        <span className="text-nowrap">Selected Text: {highlightedText}</span>
        <span className="text-nowrap">Translated text: {translatedText}</span>
      </div>
    </>
  );
}

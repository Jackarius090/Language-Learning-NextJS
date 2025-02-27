"use client";
import { Textarea } from "./ui/textarea";
import { useState, useRef } from "react";
import { translateText } from "@/app/actions/translate";
import { addDictionaryEntry } from "../db/dbActions";
import { danishText } from "../../public/sample_texts/danishText";
import { Button } from "./ui/button";

export default function TextBox() {
  const [highlightedText, setHighlightedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [textAreaText, setTextAreaText] = useState("");
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
    <div className="w-full">
      <Button
        className="mb-3"
        onClick={() => {
          setTextAreaText(danishText);
        }}
        variant="outline"
      >
        Add Danish Text
      </Button>
      <div className="flex gap-8 px-15">
        <Textarea
          className="w-9/12 border-2"
          ref={textareaRef}
          placeholder="Add text here... Try adding a sample text from the menu above or copy in your own text"
          onMouseUp={handleSelection}
          rows={20}
          value={textAreaText}
          onChange={(e) => setTextAreaText(e.target.value)}
        />
        <div className="flex flex-col gap-3 w-3/12 border-2 rounded-md p-2">
          <span>Selected Text: {highlightedText}</span>
          <span>Translated text: {translatedText}</span>
        </div>
      </div>
    </div>
  );
}

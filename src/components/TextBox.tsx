"use client";
import { Textarea } from "./ui/textarea";
import { useState, useRef } from "react";
import { translateText } from "@/app/actions/translate";
import { findLanguage } from "@/app/actions/findLanguage";
import { addDictionaryEntry } from "../db/dbActions";
import { danishText } from "../../public/sample_texts/danishText";
import { Button } from "./ui/button";
import ChatGPT from "./ChatGPT";

export default function TextBox() {
  const [highlightedText, setHighlightedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [textAreaText, setTextAreaText] = useState("");
  const [language, setLanguage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function newEntry(sw: string, tw: string) {
    const newEntry = {
      source_word: sw,
      translated_word: tw,
      source_language: "Danish",
      target_language: "English",
    };
    await addDictionaryEntry(newEntry);
  }

  const handleSelection = async () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selectedText = textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
      );
      setHighlightedText(selectedText);
      const translation = await translateText(selectedText, language);
      setTranslatedText(translation);
      await newEntry(selectedText, translation);
    }
  };

  async function detectLanguage(text: string) {
    const words = text.split(" ");
    const firstTenWords = words.slice(0, 10);
    const firstTenWordsString = firstTenWords.join(" ");
    const language = await findLanguage(firstTenWordsString);
    console.log(language);
    setLanguage(language);
  }

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaText(e.target.value);
    detectLanguage(e.target.value);
  }

  function handleDanishText() {
    setTextAreaText(danishText);
    detectLanguage(danishText);
  }

  function handleClearText() {
    setTextAreaText("");
    setLanguage("");
  }

  return (
    <div className="w-full">
      <Button className="m-3" onClick={handleDanishText} variant="outline">
        Add Danish Text
      </Button>
      <Button className="m-3" onClick={handleClearText} variant="outline">
        Clear text area
      </Button>
      <div className="flex gap-8 px-15">
        <Textarea
          className="w-9/12 border-2"
          ref={textareaRef}
          placeholder="Add text here... Try adding a sample text from the menu above or copy in your own text"
          onMouseUp={handleSelection}
          rows={20}
          value={textAreaText}
          onChange={onChange}
        />
        <div className="flex flex-col gap-3 w-3/12 border-2 rounded-md p-2">
          <span>Selected Text: {highlightedText}</span>
          <span>Translated text: {translatedText}</span>
          <span>language: {language}</span>
          <div>
            <ChatGPT language={language} highlightedText={highlightedText} />
          </div>
        </div>
      </div>
    </div>
  );
}

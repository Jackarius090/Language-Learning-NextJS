"use client";
import { Textarea } from "./ui/textarea";
import { useState, useRef } from "react";
import { translateText } from "@/app/actions/translate";
import { findLanguage } from "@/app/actions/findLanguage";
import { addDictionaryEntry } from "../db/dbActions";
import { Button } from "./ui/button";
import ChatGPT from "./ChatGPT";
import LevelSelect from "./LevelSelect";
import { GPTgenerate } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import PlayVoice from "./PlayVoice";

export default function TextBox() {
  const [highlightedText, setHighlightedText] = useState("");
  const [readingLevel, setreadingLevel] = useState("B1");
  const [translatedText, setTranslatedText] = useState("");
  const [textAreaText, setTextAreaText] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setLanguage(language);
  }

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaText(e.target.value);
    detectLanguage(e.target.value);
  }

  async function handleDanishText() {
    setIsLoading(true);
    setTextAreaText("Loading...");
    const data = await GPTgenerate(
      `Write a new original short story in Danish for a Danish language learner. It should be around 200 words long and at reading level ${readingLevel} using the Common European Framework of Reference`
    );
    setTextAreaText(data);
    detectLanguage(data);
    setIsLoading(false);
  }

  function handleClearText() {
    setTextAreaText("");
    setLanguage("");
  }

  return (
    <div className="w-full">
      <LevelSelect
        setreadingLevel={setreadingLevel}
        readingLevel={readingLevel}
      />
      <Button className="m-3" onClick={handleDanishText} variant="outline">
        Generate Danish Text
        {isLoading && <LoaderCircle className="size-5 animate-spin" />}
      </Button>
      <Button className="m-3" onClick={handleClearText} variant="outline">
        Clear text area
      </Button>
      <PlayVoice text={highlightedText} />
      <div className="flex gap-8">
        <Textarea
          spellCheck="false"
          className="w-9/12 border-2"
          rows={2}
          ref={textareaRef}
          placeholder="Add text here... Try adding a sample text from the menu above or copy in your own text"
          onMouseUp={handleSelection}
          value={textAreaText}
          onChange={onChange}
        />
        <div className="flex flex-col gap-3 w-3/12 border-2 rounded-md p-2 mr-20">
          <span>selected text: {highlightedText}</span>
          <span>translated text: {translatedText}</span>
          <span>language: {language}</span>
          <div>
            <ChatGPT language={language} highlightedText={highlightedText} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Textarea } from "./ui/textarea";
import { useState, useRef } from "react";
import { translateText } from "@/app/actions/translate";
import { findLanguage } from "@/app/actions/findLanguage";
import { addDictionaryEntry } from "../db/dbActions";
import { Button } from "./ui/button";
import WordExplanation from "./WordExplanation";
import LevelSelect from "./LevelSelect";
import { generateDanishText } from "@/app/actions/generateDanishText";
import { LoaderCircle } from "lucide-react";
import PlayVoice from "./PlayVoice";
import { textToSpeech } from "@/app/actions/textToSpeech";
import { generateChineseText } from "@/app/actions/generateChineseText";
import { FormatTextBox } from "./FormatTextBox";
import { useTextStyleStore } from "@/lib/textStyleStore";

export default function TextBox() {
  const [highlightedText, setHighlightedText] = useState("");
  const [readingLevel, setreadingLevel] = useState("B1");
  const [translatedText, setTranslatedText] = useState("");
  const [textAreaText, setTextAreaText] = useState("");
  const [language, setLanguage] = useState("");
  const [danishLoading, setDanishLoading] = useState(false);
  const [chineseLoading, setChineseLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const textSize = useTextStyleStore((state) => state.fontSize);
  const textColor = useTextStyleStore((state) => state.textColor);
  const textFont = useTextStyleStore((state) => state.fontFamily);
  const textAlignment = useTextStyleStore((state) => state.textAlignment);
  const lineHeight = useTextStyleStore((state) => state.lineHeight);

  async function playVoice(text: string) {
    if (!text || text.trim() === "") {
      console.log("no text to play");
      return;
    }
    setIsPlaying(true);
    try {
      const audioBase64 = await textToSpeech(text);
      const audio = new Audio("data:audio/mp3;base64," + audioBase64);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);
    }
  }

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
      if (!selectedText || selectedText.trim() === "") {
        return;
      }
      setHighlightedText(selectedText);
      playVoice(selectedText);
      const translation = await translateText(selectedText, language);
      setTranslatedText(translation);
      const splitWords = selectedText.split(" ").length;
      console.log(splitWords);
      console.log(selectedText);
      if (splitWords === 1) {
        await newEntry(selectedText, translation);
      }
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
    setDanishLoading(true);
    setTextAreaText("Loading...");
    const data = await generateDanishText(readingLevel);
    setTextAreaText(data);
    detectLanguage(data);
    setDanishLoading(false);
  }

  async function handleChineseText() {
    setChineseLoading(true);
    setTextAreaText("Loading...");
    const data = await generateChineseText(readingLevel);
    setTextAreaText(data);
    detectLanguage(data);
    setChineseLoading(false);
  }

  function handleClearText() {
    setTextAreaText("");
    setLanguage("");
  }

  return (
    <div className="w-full ">
      <LevelSelect
        setreadingLevel={setreadingLevel}
        readingLevel={readingLevel}
      />

      <FormatTextBox />
      <Button className="m-3" onClick={handleDanishText} variant="outline">
        Generate Danish Text
        {danishLoading && <LoaderCircle className="size-5 animate-spin" />}
      </Button>
      <Button className="m-3" onClick={handleChineseText} variant="outline">
        Generate Chinese Text
        {chineseLoading && <LoaderCircle className="size-5 animate-spin" />}
      </Button>

      <Button className="m-3" onClick={handleClearText} variant="outline">
        Clear text area
      </Button>
      <PlayVoice
        isPlaying={isPlaying}
        playVoice={playVoice}
        highlightedText={highlightedText}
      />
      <div className="flex gap-8 h-full">
        <Textarea
          spellCheck="false"
          className="w-9/12 border-2"
          rows={13}
          ref={textareaRef}
          placeholder="Add text here... Try adding a sample text from the menu above or copy in your own text"
          onMouseUp={handleSelection}
          value={textAreaText}
          onChange={onChange}
          style={
            {
              textAlign: textAlignment,
              fontFamily: textFont,
              fontSize: `${textSize}px`,
              color: textColor,
              "--placeholder-color": textColor,
              lineHeight: lineHeight,
            } as React.CSSProperties
          }
        />
        <div className="flex flex-col gap-3 w-3/12 border-2 rounded-md p-2 mr-20">
          <span>selected text: {highlightedText}</span>
          <span>translated text: {translatedText}</span>
          <span>language: {language}</span>
          <div>
            <WordExplanation
              language={language}
              highlightedText={highlightedText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

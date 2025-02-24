"use client";
import { Textarea } from "./ui/textarea";
import { useState, useRef } from "react";
import { translateText } from "@/app/actions/translate";
import { createEntry } from "@/db/insertWord";

export default function TextBox() {
  const [highlightedText, setHighlightedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      await createEntry({
        source_word: selectedText,
        translated_word: translation,
      });
    }
  };

  async function translate(text: string) {
    return await translateText(text);
  }

  return (
    <>
      <p>Selected Text: {highlightedText}</p>
      <Textarea
        ref={textareaRef}
        placeholder="Add text here... Try adding a sample text from the menu above or copy in your own text"
        onMouseUp={handleSelection}
      />
      <p>{translatedText}</p>
    </>
  );
}

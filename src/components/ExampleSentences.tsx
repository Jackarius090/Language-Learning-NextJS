"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { getExampleSentences } from "@/app/actions/getExampleSentences";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ExplanationPopover";

export default function ExampleSentences({
  highlightedText,
  language,
}: {
  highlightedText: string;
  language: string;
}) {
  const [definition, setdefinition] = useState<string>("");

  const handleClick = async () => {
    const data = await getExampleSentences(highlightedText, language);
    console.log(data);
    setdefinition(data || "No sentences found.");
  };

  return (
    <section className="py-4">
      <h1 className="mt-3">Explanation:</h1>

      {/* <article className="mt-4">{definition}</article> */}
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button onClick={handleClick} variant="outline">
              Get word explanation
            </Button>
          </PopoverTrigger>
          <PopoverContent className="PopoverContent max-w-xs max-h-64 overflow-y-scroll scrollbar-visible">
            <pre className="whitespace-pre-wrap text-xs font-mono">
              {definition}
            </pre>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

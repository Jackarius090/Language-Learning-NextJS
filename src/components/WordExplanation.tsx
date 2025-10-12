"use client";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { getWordExplanation } from "@/app/actions/getWordExplanation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderCircle, RefreshCcw } from "lucide-react";

export default function WordExplanation({
  highlightedText,
  language,
}: {
  highlightedText: string;
  language: string;
}) {
  const [definition, setDefinition] = useState<string>("");
  const [explanationLoading, setExplanationLoading] = useState(false);

  const cacheRef = useRef<Map<string, string>>(new Map());

  const handleClick = async () => {
    const cacheKey = `${highlightedText.trim().toLowerCase()}`;

    if (cacheRef.current.has(cacheKey)) {
      console.log(cacheRef.current);

      setDefinition(cacheRef.current.get(cacheKey)!);
      return;
    }

    setExplanationLoading(true);
    try {
      const data = await getWordExplanation(highlightedText, language);
      const result = data || "No sentences found.";

      cacheRef.current.set(cacheKey, result);

      setDefinition(result);
    } finally {
      setExplanationLoading(false);
    }
  };

  return (
    <section className="py-4">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button onClick={handleClick} variant="outline">
              Get word explanation
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="PopoverContent max-h-[70vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll scrollbar-visible bg-zinc-900"
          >
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="icon"
                className="m-1"
                onClick={handleClick}
              >
                <RefreshCcw />
              </Button>
            </div>

            <pre className="whitespace-pre-wrap text-xs font-sans px-2">
              {explanationLoading ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                definition
              )}
            </pre>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

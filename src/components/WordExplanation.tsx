"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { getWordExplanation } from "@/app/actions/getWordExplanation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderCircle } from "lucide-react";

export default function WordExplanation({
  highlightedText,
  language,
}: {
  highlightedText: string;
  language: string;
}) {
  const [definition, setdefinition] = useState<string>("");
  const [explanationLoading, setExplanationLoading] = useState(false);

  const handleClick = async () => {
    setExplanationLoading(true);
    const data = await getWordExplanation(highlightedText, language);
    console.log(data);
    setdefinition(data || "No sentences found.");
    setExplanationLoading(false);
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
            className="PopoverContent max-h-80 overflow-y-scroll scrollbar-visible bg-zinc-900"
          >
            <pre className="whitespace-pre-wrap text-xs font-sans">
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

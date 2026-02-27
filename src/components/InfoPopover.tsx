"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const InfoPopover = () => {
  return (
    <Popover>
      <Button asChild variant="outline" size="icon" aria-label="About this app">
        <PopoverTrigger>
          <Info />
        </PopoverTrigger>
      </Button>
      <PopoverContent side="bottom" className="w-full flex flex-col gap-0.5 ">
        <h1>A tool to help learning languages</h1>
        <a
          className="p-2 mb-4 rounded-md hover:bg-zinc-800"
          href="https://github.com/Jackarius090/Language-Learning-NextJS"
        >
          https://github.com/Jackarius090/Language-Learning-NextJS
        </a>
        <div>Made using:</div>
        <ul className="list-disc pl-6 mb-2">
          <li>NextJS</li>
          <li>Shadcn</li>
          <li>Drizzle</li>
          <li>Zod</li>
          <li>Zustand</li>
          <li>OpenAI API</li>
          <li>Google translate API</li>
          <li>Google text to speech API</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

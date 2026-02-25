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
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="About this app">
          <Info />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="PopoverContent">
        This language learning app helps you translate and understand foreign
        text effortlessly. Simply paste in any text, highlight a word you don’t
        recognize, and instantly receive a translation on the right. You can
        also request example sentences to see the word in context. Every new
        word you translate is automatically added to your personal dictionary,
        which you can access anytime by toggling the dictionary view in the top
        left corner.
      </PopoverContent>
    </Popover>
  );
};

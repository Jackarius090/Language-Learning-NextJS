"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import WordList from "./WordList";

export function Dictionary({
  words,
}: {
  words: Promise<
    {
      id: number;
      source_word: string;
      translated_word: string;
      source_language: string;
      target_language: string;
      createdAt: Date;
    }[]
  >;
}) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />

        <Suspense fallback={<div>Loading...</div>}>
          <WordList words={words} />
        </Suspense>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

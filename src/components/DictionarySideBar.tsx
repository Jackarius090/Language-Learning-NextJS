import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import WordList from "./WordList";
import getData from "@/db/dbActions";

export async function DictionarySideBar() {
  const words = getData();

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

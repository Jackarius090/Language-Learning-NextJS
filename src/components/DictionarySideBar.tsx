import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import getData from "@/db/dbActions";
import { Suspense } from "react";
import WordList from "./WordList";

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

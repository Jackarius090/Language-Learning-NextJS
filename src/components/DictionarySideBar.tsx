import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import WordList from "./WordList";
import getData from "@/db/dbActions";

export async function DictionarySideBar() {
  const words = await getData();
  console.log("Words from DB:", words);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <WordList words={words} />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

import TextBox from "@/components/TextBox";
import { InfoPopover } from "@/components/InfoPopover";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DictionarySideBar } from "@/components/DictionarySideBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <DictionarySideBar />
        <SidebarTrigger />
        <section className="mx-auto size-full mt-10">
          <span className="flex gap-20 justify-center">
            <h1 className="inline text-4xl ">Language Learning</h1>
            <Button variant="outline">
              <Link href="/signup">Signup</Link>
            </Button>
            <InfoPopover />
          </span>

          <div className="flex gap-10 mt-32">
            <TextBox />
          </div>
        </section>
      </SidebarProvider>
    </>
  );
}

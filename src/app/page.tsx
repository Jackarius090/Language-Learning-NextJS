import TextBox from "@/components/TextBox";
import { InfoPopover } from "@/components/InfoPopover";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DictionarySideBar } from "@/components/DictionarySideBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginPopover } from "@/components/LoginPopover";
import getSession from "./actions/getSession";
import Image from "next/image";

export default async function Home() {
  const session = await getSession();
  console.log(session);
  const image = session?.user?.image;

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

            <LoginPopover />
            <InfoPopover />
            <Image
              src={image || "/default-image.png"}
              alt="User profile image"
              width={50}
              height={50}
            />
          </span>

          <div className="flex gap-10 mt-32">
            <TextBox />
          </div>
        </section>
      </SidebarProvider>
    </>
  );
}

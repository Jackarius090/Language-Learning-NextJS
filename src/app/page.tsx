import TextBox from "@/components/TextBox";
import { InfoPopover } from "@/components/InfoPopover";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DictionarySideBar } from "@/components/DictionarySideBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginPopover } from "@/components/LoginPopover";
import getSession from "./actions/getSession";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { logout } from "@/lib/actions/auth";

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
          <span className="flex justify-center items-center">
            <h1 className="inline text-center text-4xl w-1/2">
              Language Learning
            </h1>
            <div className="flex gap-8 justify-center items-center">
              {!session && (
                <div className="flex gap-8 justify-center items-center">
                  <Button variant="outline">
                    <Link href="/signup">Signup</Link>
                  </Button>
                  <LoginPopover />
                </div>
              )}
              {session && (
                <Button variant="outline" onClick={logout}>
                  logout
                </Button>
              )}
              <InfoPopover />
              {image && (
                <Image
                  className="rounded-md"
                  src={image || "/default-image.png"}
                  alt="User profile image"
                  width={40}
                  height={40}
                />
              )}
              <ModeToggle />
            </div>
          </span>

          <div className="flex gap-10 mt-32">
            <TextBox />
          </div>
        </section>
      </SidebarProvider>
    </>
  );
}

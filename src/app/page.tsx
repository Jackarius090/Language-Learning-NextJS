import TextBox from "@/components/TextBox";
import { InfoPopover } from "@/components/InfoPopover";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DictionarySideBar } from "@/components/DictionarySideBar";
import { Button } from "@/components/ui/button";
import { LoginPopover } from "@/components/LoginPopover";
import getSession from "./actions/getSession";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { handleSignOut } from "./actions/authActions";
import GPTSpending from "@/components/GPTSpending";

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
            <Image
              className="rounded-md"
              alt="logo"
              width={50}
              height={50}
              src="/logo.svg"
            ></Image>
            <h1 className="inline text-center text-4xl w-1/3 mr-16">
              Language Learning
            </h1>
            <div className="flex gap-8 justify-center items-center">
              {!session && (
                <div className="flex gap-8 justify-center items-center">
                  {/* <Button variant="outline">
                    <Link href="/signup">signup</Link>
                  </Button> */}
                  <LoginPopover />
                </div>
              )}
              {session && (
                <Button variant="outline" onClick={handleSignOut}>
                  logout
                </Button>
              )}
              <InfoPopover />
              {image && (
                <Image
                  className="rounded-md"
                  src={image || "/default-image.png"}
                  alt={session.user?.name ?? "profile pic"}
                  width={40}
                  height={40}
                />
              )}
              <ModeToggle />
              <GPTSpending />
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

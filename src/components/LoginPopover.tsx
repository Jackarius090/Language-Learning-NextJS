import { Popover, PopoverContent } from "@/components/ui/popover";
import { LoginPopoverTrigger } from "./LoginPopoverTrigger";
import Link from "next/link";

export const LoginPopover = () => {
  return (
    <Popover>
      <LoginPopoverTrigger>login </LoginPopoverTrigger>
      <PopoverContent side="bottom" className="PopoverContent">
        <div>
          <Link href={"/auth/signin"}>Sign in options</Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

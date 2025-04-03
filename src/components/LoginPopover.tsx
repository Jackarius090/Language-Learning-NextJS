import { Popover, PopoverContent } from "@/components/ui/popover";
import { LoginPopoverTrigger } from "./LoginPopoverTrigger";
import GithubLogin from "./GithubLogin";
import Link from "next/link";

export const LoginPopover = () => {
  return (
    <Popover>
      <LoginPopoverTrigger>login </LoginPopoverTrigger>
      <PopoverContent side="bottom" className="PopoverContent">
        <GithubLogin />
        <div>
          <Link href={"/auth/signin"}>Email signin</Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

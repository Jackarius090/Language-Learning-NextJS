import { Popover, PopoverContent } from "@/components/ui/popover";
import { LoginPopoverTrigger } from "./LoginPopoverTrigger";
import EmailLoginIn from "./EmailLogin";
import GithubLogin from "./GithubLogin";

export const LoginPopover = () => {
  return (
    <Popover>
      <LoginPopoverTrigger>login </LoginPopoverTrigger>
      <PopoverContent side="bottom" className="PopoverContent">
        <GithubLogin />
        <div>
          <EmailLoginIn />
        </div>
      </PopoverContent>
    </Popover>
  );
};

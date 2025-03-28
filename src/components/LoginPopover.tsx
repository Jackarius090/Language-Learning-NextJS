import { Popover, PopoverContent } from "@/components/ui/popover";
import { LoginPopoverTrigger } from "./LoginPopoverTrigger";
import { Button } from "./ui/button";
import { login } from "@/lib/actions/auth";

export const LoginPopover = () => {
  return (
    <Popover>
      <LoginPopoverTrigger>login </LoginPopoverTrigger>
      <PopoverContent side="bottom" className="PopoverContent">
        <div>
          <Button variant="outline" onClick={login}>
            Sign in with github
          </Button>
        </div>{" "}
      </PopoverContent>
    </Popover>
  );
};

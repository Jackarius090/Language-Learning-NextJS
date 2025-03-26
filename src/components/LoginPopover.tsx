import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { login } from "@/lib/actions/auth";

export const LoginPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>login </PopoverTrigger>
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

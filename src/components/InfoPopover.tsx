import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

export const InfoPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Info />
      </PopoverTrigger>
      <PopoverContent side="bottom" className="PopoverContent">
        Place content for the popover here.Place content for the popover
        here.Place content for the popover here.Place content for the popover
        here.Place content for the popover here.Place content for the popover
        here.
      </PopoverContent>
    </Popover>
  );
};

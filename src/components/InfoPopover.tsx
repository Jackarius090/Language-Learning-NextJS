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
        This is my language learning app. You can paste in any foreign text and
        then highlight a word you do not understand. A translation will then be
        given on the right. You can then ask for some example sentences using
        the word. Any new word that is translated is then added to the
        dictionary which can be toggled in the top right corner.
      </PopoverContent>
    </Popover>
  );
};

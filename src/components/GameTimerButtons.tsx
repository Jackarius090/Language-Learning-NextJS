import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function GameTimerButtons({
  setTimeAllowed,
  setTimeLeft,
}: {
  setTimeAllowed: React.Dispatch<React.SetStateAction<number>>;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handlePlusClick = () => {
    setTimeAllowed((prev) => {
      const newTime = prev + 1000;
      setTimeLeft(newTime);
      return newTime;
    });
  };

  const handleMinusClick = () => {
    setTimeAllowed((prev) => {
      const newTime = prev - 1000;
      setTimeLeft(newTime);
      return newTime;
    });
  };

  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button onClick={handlePlusClick} variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button onClick={handleMinusClick} variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  );
}

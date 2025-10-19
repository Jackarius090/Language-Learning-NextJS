import { useEffect } from "react";
import GameTimerButtons from "@/components/GameTimerButtons";

export default function NumberGameTimer({
  setTimeAllowed,
  timeLeft,
  setTimeLeft,
  isActive,
  setIsActive,
}: {
  setTimeAllowed: React.Dispatch<React.SetStateAction<number>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    let interval: null | NodeJS.Timeout = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 50);
      }, 50);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    if (interval) return () => clearInterval(interval);
  }, [isActive, timeLeft, setTimeLeft, setIsActive]);

  const formatTime = (milliseconds: number) => {
    const secs = Math.floor(milliseconds / 1000);
    const hundredths = Math.floor((milliseconds % 1000) / 10);
    return `${secs.toString().padStart(2, "0")}:${hundredths
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="countdown-container flex col gap-4 items-center">
      <div className="time-display text-4xl font-bold">
        {formatTime(timeLeft)}
      </div>
      <div>
        <GameTimerButtons
          setTimeAllowed={setTimeAllowed}
          setTimeLeft={setTimeLeft}
        />
      </div>
    </div>
  );
}

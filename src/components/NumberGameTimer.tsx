import { useEffect, useRef } from "react";
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
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;
    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + timeLeft;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, endTimeRef.current! - Date.now());

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setIsActive(false);
        endTimeRef.current = null;
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isActive, setTimeLeft, setIsActive, timeLeft]);

  // useEffect(() => {
  //   let interval: null | NodeJS.Timeout = null;

  //   if (isActive && timeLeft > 0) {
  //     interval = setInterval(() => {
  //       setTimeLeft((timeLeft) => timeLeft - 50);
  //     }, 50);
  //   } else if (timeLeft === 0) {
  //     setIsActive(false);
  //   }
  //   if (interval) return () => clearInterval(interval);
  // }, [isActive, timeLeft, setTimeLeft, setIsActive]);

  const formatTime = (milliseconds: number) => {
    const secs = Math.floor(milliseconds / 1000);
    const hundredths = Math.floor((milliseconds % 1000) / 10);
    return `${secs.toString().padStart(2, "0")}:${hundredths
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex col gap-4 items-center">
      <div className="tabular-nums text-4xl font-bold">
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

import { useEffect } from "react";

export default function NumberGameTimer({
  timeLeft,
  setTimeLeft,
  isActive,
  setIsActive,
}: {
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
        console.log();
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
    <div className="countdown-container">
      <div className="time-display text-4xl font-bold">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}

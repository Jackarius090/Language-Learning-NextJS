import { useState } from "react";
import { useEffect } from "react";

export default function NumberGameTimer() {
  const [timeLeft, setTimeLeft] = useState(5000);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startCountdown = () => setIsActive(true);
  const resetCountdown = () => {
    setTimeLeft(5000);
    setIsActive(false);
  };

  const formatTime = (milliseconds: number) => {
    const secs = Math.floor(milliseconds / 600);
    const millisecs = milliseconds % 60;
    return `${secs.toString().padStart(2, "0")}:${millisecs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="countdown-container">
      <div className="time-display text-4xl font-bold">
        {formatTime(timeLeft)}
      </div>
      <div className="controls">
        <button onClick={startCountdown} disabled={isActive}>
          Start
        </button>
        <button onClick={resetCountdown}>Reset</button>
      </div>
    </div>
  );
}

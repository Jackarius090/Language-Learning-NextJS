"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { useState, useEffect, useCallback } from "react";
import { textToSpeech } from "@/app/actions/textToSpeech";
import NumberGameTimer from "@/components/NumberGameTimer";

export default function NumberGame() {
  const [number, setNumber] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [numberString, setNumberString] = useState("");
  const [inARow, setInARow] = useState(0);
  const [bestSoFar, setBestSoFar] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10000);
  const [isActive, setIsActive] = useState(false);

  function numberGenerator() {
    const num = Math.floor(Math.random() * 100);
    return num;
  }

  async function playVoice(text: string) {
    try {
      const audioBase64 = await textToSpeech(text, "da");
      const audio = new Audio("data:audio/mp3;base64," + audioBase64);
      audio.play();
    } catch (error) {
      console.error("Playback failed:", error);
    }
  }

  const playGame = useCallback(() => {
    setIsActive(true);
    const num = numberGenerator();
    // const numberString = num.toString();
    const numberString = "45.";
    setNumberString(numberString);
    setNumber(num);
    playVoice(numberString);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(10000);
      console.log(timeLeft);
      playGame();
      return;
    }
  }, [timeLeft, playGame]);

  function checkAnswer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("guessedNumber") as string;
    const numberToCheck = Number(value);
    console.log("number:", number);
    console.log("numberToCheck:", numberToCheck);
    e.currentTarget.reset();
    if (numberToCheck == number) {
      setTimeLeft(10000);
      setCorrect(true);
      setInARow((prevInARow) => {
        const newInARow = prevInARow + 1;
        setBestSoFar((prevBest) => Math.max(prevBest, newInARow));
        return newInARow;
      });
      console.log("right!");
      playGame();
      return;
    }
    setCorrect(false);
    setInARow(0);
    console.log("false!");
  }

  function hearItAgain() {
    playVoice(numberString);
  }

  function stopGame() {
    setIsActive(false);
    setTimeLeft(10000);
  }

  return (
    <div className="min-h-screen size-96 mx-auto flex flex-col py-10 justify-center gap-10">
      <h1 className="text-center text-4xl text-nowrap">Number Game!</h1>
      <div className="flex gap-4 justify-center">
        <Button onClick={playGame} variant="outline" className="h-10">
          Play!
        </Button>
        <Button variant="outline" className="h-10">
          <Link href={"/"}>Return to main page</Link>
        </Button>
        <ModeToggle />
      </div>
      <div className="flex justify-center">
        <Button onClick={hearItAgain} variant="outline">
          Hear it Again
        </Button>
      </div>

      <div className="flex justify-center">
        <NumberGameTimer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </div>
      <div className="flex justify-center">
        <Button onClick={stopGame} variant="outline">
          Stop game
        </Button>
      </div>

      <section className="size-80 bg-slate-700 flex flex-col mx-auto rounded-md">
        <div>
          <form className="flex gap-4 m-3" onSubmit={checkAnswer}>
            <Input
              className="bg-black"
              name="guessedNumber"
              placeholder="type number here"
            ></Input>
            <Button variant={"outline"} type="submit">
              Check Answer
            </Button>
          </form>
        </div>
        <div className="place-self-center mt-10">
          {correct ? <div>Correct!</div> : <div>False!</div>}
        </div>
        <div className="place-self-center mt-10">
          Number of correct in a row: {inARow}
        </div>
        <div className="place-self-center mt-10">Best so far: {bestSoFar}</div>
      </section>
    </div>
  );
}

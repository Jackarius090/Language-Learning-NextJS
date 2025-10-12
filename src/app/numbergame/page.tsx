"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { useState, useEffect, useCallback } from "react";
import { textToSpeech } from "@/app/actions/textToSpeech";
import NumberGameTimer from "@/components/NumberGameTimer";
import { danishOrdinals } from "@/lib/ordinalNumbers";
import GameMode from "@/components/GameMode";

export default function NumberGame() {
  const [correct, setCorrect] = useState(false);
  const [numberString, setNumberString] = useState("");
  const [inARow, setInARow] = useState(0);
  const [bestSoFar, setBestSoFar] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10000);
  const [isActive, setIsActive] = useState(false);
  const [gameMode, setGameMode] = useState("Cardinals");

  async function playVoice(text: string) {
    try {
      const audioBase64 = await textToSpeech(text, "da");
      const audio = new Audio("data:audio/mp3;base64," + audioBase64);
      audio.play();
    } catch (error) {
      console.error("Playback failed:", error);
    }
  }

  const ordinalsGame = useCallback((numberString: string) => {
    numberString += ".";
    console.log(numberString);
    const ordinalNumberString = danishOrdinals.get(numberString) ?? "";
    playVoice(ordinalNumberString);
    setNumberString(numberString);
  }, []);

  const cardinalsGame = useCallback((numberString: string) => {
    playVoice(numberString);
    setNumberString(numberString);
  }, []);

  const mixedGame = useCallback(
    (numberString: string) => {
      const num = Math.floor(Math.random() * 100);
      if (num >= 50) {
        ordinalsGame(numberString);
      } else {
        cardinalsGame(numberString);
      }
    },
    [ordinalsGame, cardinalsGame]
  );

  const playGame = useCallback(() => {
    setIsActive(true);
    const num = Math.floor(Math.random() * 100);
    const numberString = num.toString();
    if (gameMode == "Ordinals") {
      ordinalsGame(numberString);
      return;
    } else if (gameMode == "Mixed") {
      mixedGame(numberString);
      return;
    } else {
      cardinalsGame(numberString);
    }
  }, [gameMode, mixedGame, ordinalsGame, cardinalsGame]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(10000);
      playGame();
      return;
    }
  }, [timeLeft, playGame]);

  function checkAnswer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const numberToCheck = formData.get("guessedNumber") as string;
    e.currentTarget.reset();
    if (numberToCheck == numberString) {
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
        <GameMode gameMode={gameMode} setGameMode={setGameMode} />
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

"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { useState } from "react";
import { textToSpeech } from "@/app/actions/textToSpeech";

export default function NumberGame() {
  const [number, setNumber] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [numberString, setNumberString] = useState("");
  const [inARow, setInARow] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  function numberGenerator() {
    const num = Math.floor(Math.random() * 100);
    return num;
  }

  async function playVoice(text: string) {
    if (!text || text.trim() === "") {
      console.log("no text to play");
      return;
    }
    try {
      const audioBase64 = await textToSpeech(text);
      const audio = new Audio("data:audio/mp3;base64," + audioBase64);
      audio.play();
    } catch (error) {
      console.error("Playback failed:", error);
    }
  }

  function playGame() {
    const num = numberGenerator();
    const numberString = num.toString();
    setNumberString(numberString);
    setNumber(num);
    playVoice(numberString);
  }

  function checkAnswer(e) {
    e.preventDefault();
    const numberToCheck = e.target[0].value;
    console.log("number:", number);
    console.log("numberToCheck:", numberToCheck);
    if (numberToCheck == number) {
      setCorrect(true);
      setInARow((prev) => prev + 1);
      console.log("right!");
      e.target[0].value = "";
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

  function timer() {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1000);
    }, 1000);
  }

  return (
    <div className="min-h-screen size-96 mx-auto flex flex-col justify-center gap-10">
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
      </section>
    </div>
  );
}

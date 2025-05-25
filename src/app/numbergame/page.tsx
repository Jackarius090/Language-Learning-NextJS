"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { useState } from "react";

export default function NumberGame() {
  const [number, setNumber] = useState(0);

  function numberGenerator() {
    const num = Math.floor(Math.random() * 100);
    setNumber(num);
  }
  return (
    <div className="min-h-screen size-96 mx-auto flex flex-col justify-center gap-10">
      <h1 className="text-center text-4xl text-nowrap">Number Game!</h1>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" className="h-10">
          <Link href={"/"}>Return to main page</Link>
        </Button>
        <ModeToggle />
      </div>

      <section className="size-80 bg-slate-700">
        <Button onClick={numberGenerator}>Get Number</Button>
        {number}
        <Input placeholder="type number here"></Input>
      </section>
    </div>
  );
}

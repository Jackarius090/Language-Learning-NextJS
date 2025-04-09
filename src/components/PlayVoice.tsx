"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { textToSpeech } from "@/app/actions/textToSpeech";

export default function PlayVoice({ text }: { text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  async function playVoice() {
    setIsPlaying(true);
    try {
      const audioBase64 = await textToSpeech(text);
      const audio = new Audio("data:audio/mp3;base64," + audioBase64);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);
    }
  }

  return (
    <div>
      <Button onClick={playVoice} disabled={isPlaying}>
        {isPlaying ? "Playing..." : "Play"}
      </Button>
    </div>
  );
}

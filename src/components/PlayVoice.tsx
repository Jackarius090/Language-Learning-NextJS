"use client";
import { Button } from "./ui/button";

export default function PlayVoice({
  playVoice,
  isPlaying,
  highlightedText,
}: {
  isPlaying: boolean;
  playVoice: (text: string) => Promise<void>;
  highlightedText: string;
}) {
  return (
    <Button
      className="m-3"
      onClick={() => {
        playVoice(highlightedText);
      }}
      disabled={isPlaying}
      variant={"outline"}
    >
      {isPlaying ? "Playing..." : "Play"}
    </Button>
  );
}

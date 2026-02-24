import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";

export default function GameMode({
  gameMode,
  setGameMode,
}: {
  gameMode: string;
  setGameMode: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Tabs value={gameMode} onValueChange={setGameMode}>
      <TabsList>
        <TabsTrigger value="Cardinals">Cardinals</TabsTrigger>
        <TabsTrigger value="Ordinals">Ordinals</TabsTrigger>
        <TabsTrigger value="Mixed">Mixed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

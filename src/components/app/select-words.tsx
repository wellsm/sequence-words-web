import { LetterText } from "lucide-react";
import type { Room } from "@/schemas/room";
import { Alert, AlertDescription } from "../ui/alert";
import { SelectWordsForm } from "./select-words-form";
import { WordsCard } from "./words-card";

type SelectWordsProps = {
  room: Room;
};

export function SelectWords({ room }: SelectWordsProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {room.me.words.length === 0 ? (
        <SelectWordsForm room={room} />
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-xl">Your words</h1>
          <WordsCard
            name={room.me.name}
            words={room.me.words.map((word) => ({
              ...word,
              revealed: word.value.length,
            }))}
          />
        </div>
      )}
      {/* Instructions */}
      <Alert variant="default">
        <LetterText />
        <AlertDescription>
          Choose {room.howManyWords} words that will be used in the sequence
          game
        </AlertDescription>
      </Alert>
    </div>
  );
}

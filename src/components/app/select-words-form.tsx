import { useState } from "react";
import { Modal } from "@/components/app/modal";
import { WordsCard } from "@/components/app/words-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelectWords } from "@/hooks/use-select-words";
import type { Room } from "@/schemas/room";

type SelectWordsFormProps = {
  room: Room;
};

export function SelectWordsForm({ room }: SelectWordsFormProps) {
  const [words, setWords] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { mutateAsync: selectWords, isPending } = useSelectWords();

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (words.length === room.howManyWords) {
      setIsValidating(true);
    }
  };

  async function handleConfirmWords() {
    await selectWords({ code: room.id, data: { words } });

    setIsValidating(false);
  }

  const isFormValid = words.every((word) => word.trim() !== "");

  return (
    <div className="flex flex-col gap-4">
      <Modal
        onOpenChange={setIsValidating}
        open={isValidating}
        title="Confirm your words"
      >
        <div className="flex flex-col gap-4">
          <WordsCard
            name={room.me.name}
            words={words.map((value, index) => ({
              id: index,
              index,
              value,
              revealed: 0,
            }))}
          />

          <Button
            className="w-full text-foreground"
            disabled={isPending}
            onClick={handleConfirmWords}
            size="lg"
            type="button"
          >
            Submit Words
          </Button>
        </div>
      </Modal>
      <h1 className="text-center font-bold text-xl">
        Choose Your Words, {room.me.name}
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {new Array(room.howManyWords).fill(null).map((_, index) => (
            <div className="space-y-2" key={`word-field-${index + 1}`}>
              <Input
                autoComplete="off"
                className="text-center uppercase"
                id={`word-${index}`}
                maxLength={20}
                onChange={(e) => handleWordChange(index, e.target.value)}
                placeholder={`Enter word ${index + 1}`}
                type="text"
                value={words[index]}
              />
            </div>
          ))}
        </div>

        <Button
          className="w-full text-foreground"
          disabled={!isFormValid}
          size="lg"
          type="submit"
        >
          Submit Words
        </Button>
      </form>
    </div>
  );
}

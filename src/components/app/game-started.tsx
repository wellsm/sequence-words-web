/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useGuessWord } from "@/hooks/use-guess-word";
import { usePassTurn } from "@/hooks/use-pass-turn";
import type { Room } from "@/schemas/room";
import { Badge } from "../ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Countdown } from "./countdown";
import { WordsCard } from "./words-card";

type GameStartedProps = {
  room: Room;
};

const formSchema = z.object({
  code: z.string(),
  word: z.string().uppercase(),
});

type FormValues = z.infer<typeof formSchema>;

export function GameStarted({ room }: GameStartedProps) {
  const [duration] = useState<number>(room.duration);
  const isMyTurn = room.turn === room.me.seat;
  const { mutateAsync: passTurn, isPending: isPassingTurn } = usePassTurn();
  const { mutateAsync: tryGuessWord, isPending: isGuessingWord } =
    useGuessWord();

  const form = useForm<FormValues>({
    defaultValues: {
      code: room.id,
      word: "",
    },
  });

  async function handleCountdownExpire() {
    if (isMyTurn) {
      try {
        await passTurn(room.id);
      } catch {
        // TODO: Handle error
      }
    }
  }

  async function handleSubmitGuess({ code, word }: FormValues) {
    await tryGuessWord({ code, word });

    form.reset();
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-center justify-center gap-4">
        <Badge
          className="rounded-full px-4 py-2 font-bold text-foreground text-xl"
          variant={isMyTurn ? "default" : "secondary"}
        >
          {isMyTurn ? "Your Turn" : "Opponent's Turn"}
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <WordsCard
          className="border-primary"
          indexOfWordToGuess={room.me.index}
          name={room.me.name}
          title="My Words"
          words={room.me.words}
        />
        <WordsCard
          className="border-red-500"
          indexOfWordToGuess={room.opponent.index}
          name={room.opponent.name}
          title="Opponent Words"
          words={room.opponent.words}
        />
      </div>

      <Countdown
        duration={duration}
        onExpire={handleCountdownExpire}
        startTime={new Date(room.updatedAt)}
        text={isMyTurn ? "Your turn" : "Opponent's turn"}
      />

      {isMyTurn && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitGuess)}>
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="uppercase"
                      placeholder="Type a word to guess"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}

      {/* Manual pass turn button for testing */}
      {isMyTurn && (
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
          disabled={isPassingTurn || isGuessingWord}
          onClick={() => passTurn(room.id)}
          type="button"
        >
          {isPassingTurn ? "Passing..." : "Pass Turn"}
        </button>
      )}
    </div>
  );
}

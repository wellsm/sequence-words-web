/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import { useNavigate } from "@tanstack/react-router";
import { Home, Trophy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Room } from "@/schemas/room";
import { Badge } from "../ui/badge";
import { WordsCard } from "./words-card";

type GameFinishedProps = {
  room: Room;
};

export function GameFinished({ room }: GameFinishedProps) {
  const didIWin = room.me.id === room.winner?.id;
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col space-y-4">
      {/* Winner Announcement */}
      <div className="flex w-full items-center justify-center gap-4">
        <Badge
          className={cn(
            "rounded-full px-6 py-3 font-bold text-2xl",
            didIWin
              ? "border-green-600 bg-green-600 text-white"
              : "border-red-600 bg-red-600 text-white"
          )}
        >
          <Trophy className="mr-2 h-10 w-10" />
          {didIWin ? "You Won!" : `${room.winner?.name} Wins!`}
        </Badge>
      </div>

      {/* Game Results */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* My Words */}
        <WordsCard
          className={cn("border-gray-300", didIWin && "border-green-600")}
          name={room.me.name}
          title="My Words"
          words={room.me.words}
        />

        {/* Opponent Words */}
        <WordsCard
          className={cn("border-green-600", didIWin && "border-gray-300")}
          name={room.opponent.name}
          title="Opponent Words"
          words={room.opponent.words}
        />
      </div>

      {/* Result Message */}
      <Alert
        className={cn(
          "border-2",
          didIWin
            ? "border-green-600 bg-green-50 dark:bg-green-950"
            : "border-red-600 bg-red-50 dark:bg-red-950"
        )}
      >
        <Trophy className="h-4 w-4" />
        <AlertDescription
          className={cn(
            "font-medium",
            didIWin
              ? "text-green-800 dark:text-green-200"
              : "text-red-800 dark:text-red-200"
          )}
        >
          {didIWin
            ? "Congratulations! You successfully guessed all the opponent's words!"
            : `${room.winner?.name} won by guessing all your words first. Better luck next time!`}
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button
          className="w-full sm:w-auto"
          onClick={() => navigate({ to: "/rooms", replace: true })}
          size="lg"
          variant="outline"
        >
          <Home className="mr-2 h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}

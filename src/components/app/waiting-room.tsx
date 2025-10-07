import { AlertCircle, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "@/components/app/copy-to-clipboard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getToken } from "@/lib/storage";
import {
  formatTime,
  MILLISECONDS_TO_SECONDS,
  TIMER_UPDATE_INTERVAL,
} from "@/lib/utils";
import type { Room } from "@/schemas/room";

type WaitingRoomProps = {
  room: Room;
};

export function WaitingRoom({ room }: WaitingRoomProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime] = useState(new Date(room.createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor(
        (now.getTime() - startTime.getTime()) / MILLISECONDS_TO_SECONDS
      );
      setTimeElapsed(elapsed);
    }, TIMER_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <h1 className="text-center font-bold text-xl">Welcome, {room.me.name}</h1>

      {/* Room Code Display */}
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
        <p className="font-bold font-mono text-3xl text-blue-600 tracking-wider">
          {room.id.toUpperCase()}
        </p>

        <CopyToClipboard text={room.id} />
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
        <Users className="h-5 w-5" />
        <p className="text-lg">Waiting for second player to join</p>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
        <Clock className="h-4 w-4" />
        <p>Room created: {formatTime(timeElapsed)} ago</p>
      </div>

      {/* Share Instructions */}
      <Alert variant="default">
        <AlertCircle />
        <AlertDescription>
          Share this room code with another player to start the game
        </AlertDescription>
      </Alert>
    </div>
  );
}

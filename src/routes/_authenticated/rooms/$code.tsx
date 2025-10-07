import { createFileRoute } from "@tanstack/react-router";
import { GameFinished } from "@/components/app/game-finished";
import { GameStarted } from "@/components/app/game-started";
import { Loading } from "@/components/app/loading";
import { SelectWords } from "@/components/app/select-words";
import { WaitingRoom } from "@/components/app/waiting-room";
import { useShowRoom } from "@/hooks/use-show-room";
import { RoomPushProvider } from "@/providers/room-push";

export const Route = createFileRoute("/_authenticated/rooms/$code")({
  component: RoomPage,
});

function RoomPage() {
  const { code } = Route.useParams();
  const { data: room, isLoading } = useShowRoom(code);

  if (isLoading || !room) {
    return <Loading />;
  }

  return (
    <RoomPushProvider room={room}>
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6 space-y-2 p-4">
        {room.state === "CREATED" && <WaitingRoom room={room} />}
        {room.state === "CHOOSING" && <SelectWords room={room} />}
        {room.state === "STARTED" && <GameStarted room={room} />}
        {room.state === "FINISHED" && <GameFinished room={room} />}
      </div>
    </RoomPushProvider>
  );
}

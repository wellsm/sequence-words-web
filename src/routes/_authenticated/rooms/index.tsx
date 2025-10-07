import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { CreateRoom } from "@/components/app/create-room";
import { JoinRoom } from "@/components/app/join-room";
import { Modal } from "@/components/app/modal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/rooms/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 p-4">
      <div className="text-center">
        <h1 className="font-bold text-3xl text-ce">Rooms</h1>
        <p className="text-muted-foreground">
          Create or join a room to start playing!
        </p>
      </div>
      <Modal
        title="Create Room"
        trigger={
          <Button className="w-full text-foreground" size="lg">
            Create Room
          </Button>
        }
      >
        <CreateRoom
          onSubmit={(code) =>
            navigate({ to: "/rooms/$code", params: { code } })
          }
        />
      </Modal>
      <Modal
        title="Join Room"
        trigger={
          <Button className="w-full text-foreground" size="lg">
            Join Room
          </Button>
        }
      >
        <JoinRoom
          onSubmit={(code) =>
            navigate({ to: "/rooms/$code", params: { code } })
          }
        />
      </Modal>
    </div>
  );
}

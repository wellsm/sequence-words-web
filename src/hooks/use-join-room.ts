import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { JoinRoom, Room } from "@/schemas/room";

export function useJoinRoom() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ code, name }: JoinRoom) =>
      await api<Room>(`/rooms/${code}/join`, "POST", { name }),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["room", data.id] });
    },
  });
}

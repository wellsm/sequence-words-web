import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CreateRoom, Room } from "@/schemas/room";

export function useCreateRoom() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoom) =>
      await api<Room>("/rooms", "POST", data),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["room", data.id] });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Room } from "@/schemas/room";

export function usePassTurn() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (code: string) =>
      await api<Room>(`/rooms/${code}/pass`, "POST", {}),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["room", data.id] });
    },
  });
}

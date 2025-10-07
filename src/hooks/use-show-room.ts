import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Room } from "@/schemas/room";

export function useShowRoom(code: string) {
  return useQuery({
    queryKey: ["room", code],
    queryFn: async () => await api<Room>(`/rooms/${code}`, "GET", undefined),
  });
}

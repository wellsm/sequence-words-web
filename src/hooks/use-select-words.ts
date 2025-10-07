import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Room } from "@/schemas/room";
import type { SelectWordsRequest } from "@/schemas/word";

type UseSelectWordsProps = {
  code: string;
  data: SelectWordsRequest;
};

export function useSelectWords() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ code, data }: UseSelectWordsProps) =>
      await api<Room>(`/rooms/${code}/words`, "POST", data),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["room", data.id] });
    },
  });
}

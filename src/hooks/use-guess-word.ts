import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

type TryWordPayload = {
  code: string;
  word: string;
};

type TryWordResponse = {
  isCorrect: boolean;
  isFinished: boolean;
};

export function useGuessWord() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ code, word }: TryWordPayload) =>
      await api<TryWordResponse>(`/rooms/${code}/words/guess`, "POST", {
        word,
      }),
    onSuccess: (_, { code }) => {
      client.invalidateQueries({ queryKey: ["room", code] });
    },
  });
}

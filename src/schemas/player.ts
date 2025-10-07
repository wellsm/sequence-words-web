import type { Word } from "@/schemas/word";

export type Player = {
  id: string;
  name: string;
  isOwner: boolean;
  seat: number;
  index: number;
  isReady: boolean;
  hash?: string;
  words: Word[];
};

import type { Player } from "@/schemas/player";

export type Room = {
  id: string;
  howManyWords: number;
  state: "CREATED" | "CHOOSING" | "STARTED" | "FINISHED";
  turn: number;
  duration: number;
  me: Player;
  winner?: Player;
  opponent: Player;
  createdAt: string;
  updatedAt: string;
};

export type CreateRoom = {
  name: string;
  howManyWords: number;
  duration: number;
};

export type JoinRoom = {
  name: string;
  code: string;
};

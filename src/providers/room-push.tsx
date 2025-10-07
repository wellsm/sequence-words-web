import { Client, type IMessage } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import SockJs from "sockjs-client";
import { env } from "@/config/env";
import type { Room } from "@/schemas/room";
import { getBearerToken } from "./auth";

type RoomPushContextValue = {
  isConnected: boolean;
};

const RoomPushContext = createContext<RoomPushContextValue | null>(null);

type RoomPushProviderProps = {
  room: Room;
  children: ReactNode;
};

export function RoomPushProvider({ room, children }: RoomPushProviderProps) {
  const queryClient = useQueryClient();
  const clientRef = useRef<Client | null>(null);
  const isConnectedRef = useRef(false);
  const token = getBearerToken();

  useEffect(() => {
    const sock = new SockJs(`${env.VITE_API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 1500,
      connectHeaders: { authorization: token ?? "" },
    });

    client.onConnect = () => {
      isConnectedRef.current = true;

      client.subscribe(
        `/topic/room/${room.id}/player/${room.me.id}`,
        ({ body }: IMessage) => {
          const data = JSON.parse(body) as Room;

          queryClient.setQueryData(["room", room.id], data);
          //queryClient.invalidateQueries({ queryKey: ["room", room.id] });
        }
      );
    };

    client.onDisconnect = () => {
      isConnectedRef.current = false;
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      isConnectedRef.current = false;
    };
  }, [room, token, queryClient]);

  const contextValue: RoomPushContextValue = {
    isConnected: isConnectedRef.current,
  };

  return (
    <RoomPushContext.Provider value={contextValue}>
      {children}
    </RoomPushContext.Provider>
  );
}

export function useRoomPush() {
  const context = useContext(RoomPushContext);
  if (!context) {
    throw new Error("useRoomPush must be used within a RoomPushProvider");
  }
  return context;
}

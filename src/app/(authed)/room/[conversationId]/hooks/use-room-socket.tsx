import { useEffect, useState } from "react";
import { IRoomSocketEvent } from "../lib/events";
import { socketIO } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const useRoomSocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [gameStarting, setGameStarting] = useState(false);

  useEffect(() => {
    const onEvent = (event: IRoomSocketEvent) => {
      switch (event.event) {
        case "PLAYER_JOINED_ROOM":
        case "PLAYER_EDIT":
          queryClient.setQueryData(["room", conversationId], () => event.data);
          break;
        case "REQUEST_SENT_TO_DM":
          setGameStarting(true);
          break;
        case "GAME_STARTED":
          router.push(`game/${conversationId}`);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId, queryClient, router]);

  return { gameStarting };
};

export default useRoomSocket;

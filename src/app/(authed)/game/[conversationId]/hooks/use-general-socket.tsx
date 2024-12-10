import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useReadLocalStorage } from "usehooks-ts";

import { socketIO } from "@/lib/socket";
import { roomKey } from "@/services/room-service";
import { IQuestion } from "@/types/room";

import { moveStore } from "../stores/move-store";
import { IAsciiMovieEvent, IGeneralSocketEvent } from "../types/events";

const useGeneralSocket = (conversationId: string) => {
  const accountId = useReadLocalStorage<string>("accountId");
  const queryClient = useQueryClient();

  const [canAsk, setCanAsk] = useState(true);
  const [questionAsked, setQuestionAsked] = useState<Partial<IQuestion>>();
  const [asciiScenes, setAsciiScenes] = useState<Array<string>>([]);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const onEvent = (event: IGeneralSocketEvent) => {
      switch (event.event) {
        case "PLAYER_ASKED_QUESTION":
          setCanAsk(false);
          setQuestionAsked({
            ...questionAsked,
            question: event.data.question,
            playerAccountId: event.data.accountId,
            playerName: event.data.player.name,
          });
          break;
        case "DM_ANSWERED_QUESTION":
          setCanAsk(false);
          setAsking(false);
          setQuestionAsked({
            ...questionAsked,
            question: event.data.question,
            bob3Answer: event.data.answer,
          });
          queryClient.invalidateQueries([roomKey, conversationId]);
          break;
        case "PLAYER_MOVE":
          queryClient.invalidateQueries([roomKey, conversationId]);
          if (event.data.accountId === accountId && event.data.aiDescriptionForRating)
            moveStore.aiDescription.set(event.data.aiDescriptionForRating);
          break;
        case "REQUEST_SENT_TO_DM":
          setCanAsk(false);
        case "ASCII_MOVIE_CHUNK":
          if (event.data && "asciiChunk" in event.data) {
            setAsciiScenes((prevScenes) => [
              ...prevScenes,
              ...(event as IAsciiMovieEvent).data.asciiChunk,
            ]);
          }
          break;
        case "ROUND_STORY":
          setCanAsk(true);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);

    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [accountId, conversationId, queryClient, questionAsked]);

  return { canAsk, setCanAsk, questionAsked, setQuestionAsked, asking, setAsking, asciiScenes };
};

export default useGeneralSocket;

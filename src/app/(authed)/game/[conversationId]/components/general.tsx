"use client";
import { Box } from "@/components/ui/box";
import useGetRoomData from "@/hooks/use-get-room-data";
import { IPlayer } from "@/types/dnd";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import Player from "./player";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";
import { AiOutlineLeft } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { IoMdSend } from "react-icons/io";
import { zip } from "lodash";
import useAskQuestion from "../hooks/use-ask-question";
import useGeneralSocket from "../hooks/use-general-socket";
import Spinner from "@/components/ui/spinner";
import Question from "./question";
import Moves from "./moves";

const General = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const { data: roomData } = useGetRoomData(conversationId);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();
  const [statsOpened, setStatsOpened] = useState(false);
  const [question, setQuestion] = useState("");
  const { canAsk, setCanAsk, questionAsked, setQuestionAsked } = useGeneralSocket(conversationId);
  const { mutate: askQuestion } = useAskQuestion();

  useEffect(() => {
    if (roomData) {
      setCurrentPlayer(
        roomData.playerState.find(
          (player) => player.accountId === localStorage.getItem("accountId"),
        ),
      );
      const questionsLength = roomData.questions3History.length;
      if (questionsLength === roomData.currentRound + 1) {
        if (roomData.questions3History[questionsLength - 1].question) {
          setQuestionAsked(undefined);
        }
      } else if (questionAsked && !questionAsked.playerName && questionAsked.playerAccountId) {
        const player = roomData.playerState.find(
          (player) => player.accountId === questionAsked.playerAccountId,
        );
        setQuestionAsked({ ...questionAsked, playerName: player?.name });
      }
    }
  }, [questionAsked, roomData, setCanAsk, setQuestionAsked]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    askQuestion({ conversationId, question });
    setQuestion("");
  };

  const autoBottomScrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoBottomScrollDiv.current) {
      autoBottomScrollDiv.current.scrollIntoView({ behavior: "instant" });
    }
  }, [roomData?.moves, roomData?.questions3History, questionAsked]);

  if (!roomData || !currentPlayer) {
    return (
      <Box title="" className="flex h-full justify-center items-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  return (
    <Box title="general" className="flex flex-col min-h-0 flex-1 gap-8 p-8">
      <Player player={currentPlayer} />
      <div className="w-full border-t border-white/25" />
      <div className={cn("flex flex-col min-h-0 flex-1 gap-8", statsOpened && "hidden")}>
        {roomData.playerState.length > 1 && (
          <Button
            variant={"ghost"}
            className="border-white text-white"
            onClick={() => setStatsOpened(true)}
          >
            Team stats
          </Button>
        )}
        {/* currently printing moves before questions until we get timestamps */}
        <div className="flex flex-col min-h-0 h-full gap-4 pr-6 overflow-y-auto">
          {zip(roomData.moves, roomData.questions3History).map((val, i) => (
            <div key={i} className="flex flex-col gap-4">
              {Array.isArray(val[0]) && <Moves moves={val[0]} />}
              {!!val[1] && !!val[1].question && <Question question={val[1]} />}
            </div>
          ))}
          {!!questionAsked && <Question question={questionAsked} />}
          <div ref={autoBottomScrollDiv} />
        </div>

        <form onSubmit={onSubmit} className="flex w-full items-end gap-8">
          <div className="flex flex-col flex-1">
            <Input
              disabled={!canAsk}
              label="Ask Bob"
              value={question}
              className="m-0"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </div>
          <Button
            disabled={!canAsk}
            type="submit"
            variant="ghost"
            className="text-tomato w-fit text-2xl"
          >
            <IoMdSend />
          </Button>
        </form>
      </div>
      <div className={cn("flex flex-col gap-8", !statsOpened && "hidden")}>
        <div className="flex w-full">
          <Button
            variant={"ghost"}
            className="w-fit text-base  gap-2 flex items center text-white uppercase"
            onClick={() => setStatsOpened(false)}
          >
            <AiOutlineLeft /> <span className="mt-[1px]">back to events</span>
          </Button>
        </div>
        <div className="flex flex-col min-h-0 flex-1 gap-8 overflow-auto">
          {roomData.playerState
            .filter((player) => player.accountId !== currentPlayer.accountId)
            .map((player) => (
              <Player key={player.accountId} player={player} />
            ))}
        </div>
      </div>
    </Box>
  );
};

export default General;

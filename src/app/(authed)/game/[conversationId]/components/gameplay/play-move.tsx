import { IPlayer, IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import usePlayMove from "../../hooks/use-play-move";
import usePlayMoveSocket from "../../hooks/use-play-move-socket";
import { moveStore } from "../../stores/move-store";
import MoveInput from "./move-input";
import PickPowerup from "./pick-powerup";
import RollDice from "./roll-dice";

export interface PlayMoveProps {
  roomData: IRoomDetail;
  conversationId: string;
  currentPlayer: IPlayer;
  loadingText: boolean;
}

const PlayMove = ({ roomData, conversationId, currentPlayer, loadingText }: PlayMoveProps) => {
  usePlayMoveSocket(conversationId);
  const { timeToDisplay } = usePlayMove(roomData, currentPlayer, loadingText);
  const store = moveStore.use();

  return (
    <>
      <div
        className={cn(
          "flex w-full flex-col gap-8 lg:flex-row",
          (roomData.state === "WIN" || roomData.state === "LOSE" || currentPlayer.health <= 0) &&
            "hidden",
        )}
      >
        <div
          className={cn(
            "flex h-full flex-1 flex-col gap-6",
            store.buttonState !== "CANPLAY" && "hidden lg:flex",
          )}
        >
          <div
            className={cn(
              "bg-white/5 px-4 py-2.5 text-xl uppercase tracking-[0.07em] lg:px-8",
              !store.canPlay && "text-white/50",
            )}
          >
            <span className="font-semibold">
              Type or select <span className="hidden lg:inline"> your move</span>
            </span>
            <span className="opacity-50"> - {timeToDisplay()} Left</span>
          </div>
          <MoveInput champion={currentPlayer.champion} />
        </div>
        <div className="flex flex-col gap-6">
          <PickPowerup currentMana={currentPlayer.mana} />
          <RollDice conversationId={conversationId} accountId={currentPlayer.accountId} />
        </div>
      </div>

      {currentPlayer.health <= 0 && roomData.state === "GAMING" && (
        <div className="flex h-44 w-full flex-col items-center justify-center bg-white/5 lg:text-xl">
          <p className="text-center font-semibold">Players are choosing their actions...</p>
          <p>{timeToDisplay()} Left</p>
        </div>
      )}
    </>
  );
};

export default PlayMove;
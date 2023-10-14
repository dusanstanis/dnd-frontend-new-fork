import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { IChampion } from "@/types/dungeon";
import { IDefaultMove } from "@/types/room";
import { cn } from "@/utils/style-utils";

import { moveStore } from "../../stores/move-store";

const MoveInput = ({ champion }: { champion: IChampion | null | undefined }) => {
  const move = moveStore.move.use();
  const canPlay = moveStore.canPlay.use();
  const freeWill = moveStore.freeWill.use();

  if (!champion) return <div>Something went wrong</div>;

  return (
    <div className="flex h-60 flex-col gap-4 lg:h-full">
      <div className="flex flex-1">
        {move ? (
          <div
            className={cn(
              "flex h-full w-full rounded-md border-2 border-transparent px-8 py-4 transition-all duration-200",
              move === "discover_health" && "border-primary",
              move === "discover_mana" && "border-cyan-500",
              move === "conversation_with_team" && "border-green-500",
              move === "rest" && "border-purple-400",
            )}
          >
            <MoveDisplay move={move} />
            <div className="flex basis-1/2 items-center justify-center text-center">
              {champion.moveMapping[move]}
            </div>
          </div>
        ) : (
          <TextArea
            maxLength={300}
            className="m-0 h-full border-white/50 focus-within:border-white"
            placeholder="I found a secret tunnel and escape through it..."
            disabled={!canPlay}
            onChange={(e) => {
              moveStore.freeWill.set(e.target.value);
              moveStore.move.set(undefined);
            }}
            value={freeWill}
          />
        )}
      </div>

      <div className="flex w-full shrink-0 justify-center gap-4">
        <div className="flex h-9 gap-2">
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "h-9 w-9 shrink grow bg-white/5 px-0 text-dark-200 hover:text-primary active:text-primary lg:shrink-0 lg:grow-0",
              move === "discover_health" && "border-primary text-primary",
            )}
            onClick={() => moveStore.move.set("discover_health")}
          >
            <AiFillHeart />
          </Button>
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "h-9 w-9 shrink grow bg-white/5 px-0 text-dark-200 hover:text-cyan-500 active:text-cyan-500 lg:shrink-0 lg:grow-0",
              move === "discover_mana" && "border-cyan-500 text-cyan-500",
            )}
            onClick={() => moveStore.move.set("discover_mana")}
          >
            <HiSparkles />
          </Button>
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "h-9 w-9 shrink grow bg-white/5 px-0 text-dark-200 hover:text-green-500 active:text-green-500 lg:shrink-0 lg:grow-0",
              move === "conversation_with_team" && "border-green-500 text-green-500",
            )}
            onClick={() => moveStore.move.set("conversation_with_team")}
          >
            <GoPeople />
          </Button>
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "h-9 w-9 shrink grow bg-white/5 px-0 text-dark-200 hover:text-purple-400 active:text-purple-400 lg:shrink-0 lg:grow-0",
              move === "rest" && "border-purple-400 text-purple-400",
            )}
            onClick={() => moveStore.move.set("rest")}
          >
            <GiNightSleep />
          </Button>
        </div>
        <Button
          variant="ghost"
          disabled={!canPlay}
          className={cn(
            "pointer-events-auto h-9 bg-white/5 px-4 normal-case text-dark-200 lg:w-fit",
            !move && "border-white text-white",
          )}
          onClick={() => moveStore.move.set(undefined)}
        >
          Use free will
        </Button>
      </div>
    </div>
  );
};

const MoveDisplay = ({ move }: { move: IDefaultMove }) => {
  return (
    <div className="flex basis-1/2 flex-col items-center justify-center gap-2">
      <div
        className={cn(
          "flex items-center gap-2 text-xl font-medium",
          move === "discover_health" && "text-primary",
          move === "discover_mana" && "text-cyan-500",
          move === "conversation_with_team" && "text-green-500",
          move === "rest" && "text-purple-400",
        )}
      >
        {move === "discover_health" && (
          <>
            <AiFillHeart /> Heal action
          </>
        )}
        {move === "discover_mana" && (
          <>
            <HiSparkles /> Mana action
          </>
        )}
        {move === "conversation_with_team" && (
          <>
            <GoPeople /> Round bonus action
          </>
        )}
        {move === "rest" && (
          <>
            <GiNightSleep /> Rest action
          </>
        )}
      </div>
      <p className="text-center opacity-50">
        {move === "discover_health" && "Your health could increase or decrease"}
        {move === "discover_mana" && "Your mana could increase or decrease"}
        {move === "conversation_with_team" &&
          "Your health could decrease or your mana could increase"}
        {move === "rest" && "Your stats won't be affected"}
      </p>
    </div>
  );
};
export default MoveInput;
import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { IChampion } from "@/types/dungeon";
import { DefaultMove } from "@/types/game";
import { cn } from "@/utils/style-utils";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";

export interface MoveInputProps {
  move: DefaultMove | undefined;
  freeWill: string;
  champion: IChampion;
  canPlay: boolean;
  setMove: (move: DefaultMove | undefined) => void;
  setFreeWill: (freeWill: string) => void;
}

const MoveInput = ({ move, freeWill, champion, canPlay, setMove, setFreeWill }: MoveInputProps) => {
  return (
    <div className="relative flex h-60 lg:h-full">
      <TextArea
        maxLength={300}
        center={!!move}
        className="m-0 h-full border-white/50"
        placeholder="I found a secret tunnel and escape through it..."
        disabled={!canPlay}
        onChange={(e) => {
          setFreeWill(e.target.value);
          setMove(undefined);
        }}
        value={move ? champion.moveMapping[move] : freeWill}
      />
      <div className="pointer-events-none absolute bottom-4 flex w-full flex-col justify-between gap-2 px-4  lg:flex-row">
        <div className="flex h-9 justify-between gap-2 lg:justify-start">
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "pointer-events-auto h-9 w-9 shrink grow bg-white/5 text-white lg:shrink-0 lg:grow-0",
              move === "discover_health" && "border-tomato",
            )}
            onClick={() => setMove("discover_health")}
          >
            <AiFillHeart />
          </Button>
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "pointer-events-auto h-9 w-9 shrink grow bg-white/5 text-white lg:shrink-0 lg:grow-0",
              move === "discover_mana" && "border-tomato",
            )}
            onClick={() => setMove("discover_mana")}
          >
            <HiSparkles />
          </Button>
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "pointer-events-auto h-9 w-9 shrink grow bg-white/5 text-white lg:shrink-0 lg:grow-0",
              move === "conversation_with_team" && "border-tomato",
            )}
            onClick={() => setMove("conversation_with_team")}
          >
            <GoPeople />
          </Button>
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "pointer-events-auto h-9 w-9 shrink grow bg-white/5 text-white lg:shrink-0 lg:grow-0",
              move === "rest" && "border-tomato",
            )}
            onClick={() => setMove("rest")}
          >
            <GiNightSleep />
          </Button>
        </div>
        <Button
          variant="ghost"
          disabled={!canPlay}
          className={cn(
            "pointer-events-auto h-9 bg-white/5 px-4 normal-case text-white lg:w-fit",
            !move && "border-tomato",
          )}
          onClick={() => setMove(undefined)}
        >
          Use free will
        </Button>
      </div>
    </div>
  );
};

export default MoveInput;
import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { RiCopperCoinFill } from "react-icons/ri";
import { VscHeartFilled } from "react-icons/vsc";

import { IPlayer } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import useGetAvatar from "@/hooks/use-get-avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Player = (props: { player: IPlayer }) => {
  const { player } = props;

  const { data: avatarData } = useGetAvatar(player.avatarId);

  return (
    <div className="relative flex gap-4 lg:gap-6">
      <div className="relative h-[90px] w-[90px]">
        <Image
          src={avatarData?.imageUrl || "/images/default-avatar.png"}
          alt={player.name}
          draggable={false}
          width={90}
          height={90}
        />
        {player.health <= 0 && (
          <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black/75">
            <Image
              src={"/images/player-dead.png"}
              alt={"dead"}
              draggable={false}
              width={64}
              height={64}
            />
          </div>
        )}
      </div>

      <div className={cn("flex flex-col gap-1.5", player.health <= 0 && "opacity-50")}>
        <p className="-mt-1 text-xl font-semibold uppercase tracking-[0.07em]">{player.name}</p>
        <p className="font-light tracking-[0.15em]">{player.champion.name}</p>
        <div className="flex gap-4 lg:gap-8">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex cursor-default items-center gap-2 text-lg">
                  <VscHeartFilled />
                  <span className="mt-0.5">{Math.max(0, player.health)}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Health</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex cursor-default items-center gap-2 text-lg">
                  <BsFillLightningFill />
                  <span className="mt-0.5">{player.bonusForNextRound}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bonus - will be applied on next roll</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex cursor-default items-center gap-2 text-lg">
                  <HiSparkles />
                  <span className="mt-0.5">{player.mana}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mana - can be used on any roll</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex cursor-default items-center gap-2 text-lg">
                  <RiCopperCoinFill />
                  <span className="mt-0.5">{player.gold}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gold that you have aquired till now</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;

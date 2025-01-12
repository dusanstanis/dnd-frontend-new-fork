import Image from "next/image";

import { Tooltip } from "@/components/ui/tooltip";
import useGetTokenAccountBalance from "@/hooks/helpers/use-get-token-account-balance";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { cn } from "@/utils/style-utils";

const RewardPool = () => {
  const { data: currentCommunity } = useGetCurrentCommunity();

  const rewardPoolBalance = useGetTokenAccountBalance(currentCommunity?.rewardPool ?? "");

  return (
    <Tooltip
      content="Higher you climb the leaderboard more chance you have to receive part of reward pool. Reward pool is going up whenever someone plays adventures in this community"
      contentClassName="w-56 tracking-[1.02px] whitespace-normal"
      position="bottom"
    >
      {currentCommunity && (
        <button
          className={cn(
            "z-20 flex h-[70px] cursor-default items-center gap-2 rounded-full border-2 border-[#7c692e] bg-rewardGradient p-2 pr-6 transition-all duration-200 hover:bg-neutral-800 hover:shadow-[0px_0px_30px_0px_#FBBC0540] active:opacity-90",
          )}
        >
          <Image
            src={currentCommunity?.rewardPoolImgUrl ?? ""}
            width={45}
            height={45}
            alt={currentCommunity?.name + " reward pool image"}
            className="size-fit rounded-full"
          />
          <div className="flex flex-col justify-between font-medium">
            Reward Pool
            <div className="flex items-center gap-1 text-sm">
              <Image
                src={currentCommunity?.tokenImgUrl ?? ""}
                width={20}
                height={20}
                alt={currentCommunity?.name + " token image"}
                className="rounded-full bg-white p-1"
              />
              {rewardPoolBalance} {currentCommunity?.currencyName}
            </div>
          </div>
        </button>
      )}
    </Tooltip>
  );
};

export default RewardPool;

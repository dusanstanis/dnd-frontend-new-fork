import { useState } from "react";
import Image from "next/image";

import { ICampaign } from "@/types/dungeon";
import useCopy from "@/hooks/use-copy";

import DesktopActions from "./desktop-actions";
import MobileActions from "./mobile-actions";

const KingdomCampaign = ({ campaign }: { campaign: ICampaign }) => {
  const [copied, setCopied] = useCopy();

  const [showDesktopActions, setShowDesktopActions] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(campaign._id);
    setCopied(true);
  };

  return (
    <div
      className="flex flex-col gap-4 rounded-md border border-white/10 p-3 pr-0 transition-colors duration-300 hover:bg-white/5 lg:border-0 lg:p-4"
      onMouseOver={() => setShowDesktopActions(true)}
      onMouseLeave={() => setShowDesktopActions(false)}
    >
      <div className="flex flex-row gap-8">
        <Image
          src={campaign.imageUrl || "/images/default-dungeon.png"}
          alt={campaign.name ?? "campaign"}
          width={180}
          height={180}
          className="h-16 w-16 lg:h-[180px] lg:w-[180px]"
        />
        <div className="flex w-full flex-col gap-1 lg:gap-4 lg:py-4">
          <div className="flex w-full flex-row justify-between pr-4">
            <p className="w-48 truncate text-lg font-normal uppercase tracking-wider lg:w-auto lg:text-[22px] lg:font-medium lg:leading-7 lg:tracking-[0.15em]">
              {campaign.name}
            </p>
            <DesktopActions
              showDesktopActions={showDesktopActions}
              copied={copied}
              onCopy={onCopy}
              campaign={campaign}
            />
          </div>

          <p className="line-clamp-2 w-48 break-all text-[14px] font-light leading-tight tracking-widest text-white opacity-50 lg:line-clamp-none lg:w-auto lg:text-base lg:opacity-100">
            {campaign.description}
          </p>
        </div>
      </div>

      <MobileActions copied={copied} onCopy={onCopy} campaign={campaign} />
    </div>
  );
};

export default KingdomCampaign;
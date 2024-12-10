"use client";

import { useState } from "react";

import GameHistory from "@/components/common/game-history";
import MobileNavbar from "@/components/navbar/mobile-navbar";
import { Box } from "@/components/ui/box";
import useAuth from "@/hooks/helpers/use-auth";
import useCommunity from "@/hooks/helpers/use-community";

import CommunityInfo from "./components/community-info";
import CreateRoom from "./components/desktop/create-room";
import JoinRoom from "./components/desktop/join-room";
import MobileCreateRoom from "./components/mobile/mobile-create-room";
import MobileJoinRoom from "./components/mobile/mobile-join-room";
import ShowPaymentModal from "./hooks/show-payment-modal";

const Page = () => {
  const { isDefault } = useCommunity();
  const [join, setJoin] = useState(false);

  const [adventureDetailId, setAdventureDetailId] = useState<string>();
  const [campaignDetailId, setCampaignDetailId] = useState<string>();

  const [closingAdventureId, setClosingAdventureId] = useState<string>();
  const [closingCampaignId, setClosingCampaignId] = useState<string>();

  const onClickBack = join
    ? () => {
        setJoin(false);
      }
    : adventureDetailId
    ? () => {
        setClosingAdventureId(adventureDetailId);
        setAdventureDetailId(undefined);
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        setTimeout(() => setClosingAdventureId(undefined), 500);
      }
    : campaignDetailId
    ? () => {
        setClosingCampaignId(campaignDetailId);
        setCampaignDetailId(undefined);
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        setTimeout(() => setClosingCampaignId(undefined), 500);
      }
    : undefined;
  const { loggedIn } = useAuth();

  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 pb-12 lg:flex lg:flex-row lg:px-0">
        <CreateRoom />
        <div className="flex h-full w-1/4 flex-1 flex-col gap-12">
          <JoinRoom />
          <div className="flex min-h-0 flex-1 overflow-y-auto">
            <Box
              title="GAME HISTORY"
              wrapperClassName="w-full"
              className="mb-4 flex min-h-0 flex-1 lg:mb-0 lg:gap-8 lg:p-8"
            >
              <GameHistory />
            </Box>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" onClickBack={onClickBack} />
        {loggedIn && !isDefault && <CommunityInfo />}
        <MobileJoinRoom
          show={!adventureDetailId && !campaignDetailId}
          open={join}
          setOpen={setJoin}
        />

        <MobileCreateRoom
          adventureDetailId={adventureDetailId}
          setAdventureDetailId={setAdventureDetailId}
          campaignDetailId={campaignDetailId}
          setCampaignDetailId={setCampaignDetailId}
          closingAdventureId={closingAdventureId}
          closingCampaignId={closingCampaignId}
        />
      </div>
      <ShowPaymentModal />
    </>
  );
};

export default Page;

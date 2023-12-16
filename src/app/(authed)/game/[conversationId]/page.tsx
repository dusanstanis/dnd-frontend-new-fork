"use client";

import React from "react";

import HowToPlay from "@/components/how-to-play";
import MobileNavbar from "@/components/navbar/mobile-navbar";
import { cn } from "@/utils/style-utils";

import AnimationEffects from "./components/animation-effects";
import Feedback from "./components/feedback";
import Gameplay from "./components/gameplay";
import General from "./components/general";
import MobileControls from "./components/mobile/mobile-controls";
import MobileStory from "./components/mobile/mobile-story";
import { gameStore } from "./stores/game-store";

const Game = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  const pageState = gameStore.pageState.use();

  if (pageState === "FEEDBACK") return <Feedback />;

  if (pageState === "HOWTOPLAY")
    return (
      <div className="flex h-full min-h-0 flex-col gap-5 lg:pb-12">
        <HowToPlay
          onHideHowToPlay={() => gameStore.pageState.set("DEFAULT")}
          hideText={"back to the game"}
        />
      </div>
    );

  return (
    <>
      <div className="hidden h-full min-h-0 flex-col gap-5 lg:flex lg:pb-12">
        <AnimationEffects />

        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-row gap-12 overflow-y-auto py-0">
          <div className={cn("flex h-full w-[70%] flex-1")}>
            <Gameplay conversationId={conversationId} />
          </div>
          <div className={cn("flex h-full min-h-0 w-[27%]")}>
            <General conversationId={conversationId} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <AnimationEffects />
        <MobileStory conversationId={conversationId} />
        <MobileControls conversationId={conversationId} />
      </div>
    </>
  );
};

export default Game;

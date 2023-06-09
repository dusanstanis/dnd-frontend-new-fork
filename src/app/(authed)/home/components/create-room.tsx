"use client";

import { AiOutlineCheck, AiOutlineQuestionCircle } from "react-icons/ai";
import { DungeonTabType } from "../types/home";
import Tabs from "./tabs";
import { Button } from "@/components/ui/button";
import useHome from "../hooks/use-home";
import { useState } from "react";
import { IDungeon } from "@/types/dnd";
import { useRouter } from "next/navigation";
import dndService from "@/services/dndService";
import Image from "next/image";
import { cn } from "@/utils/style-utils";
import { useTabStore } from "../stores/tab-store";

export interface CreateRoomProps {
  dungeonTab: DungeonTabType;
}

const CreateRoom = () => {
  const { dungeonTab } = useTabStore((state) => state);
  const { recommendedDungeons, myDungeons } = useHome();
  const dungeons = dungeonTab === "TOP DUNGEONS" ? recommendedDungeons : myDungeons;
  const [selectedDungeon, setSelectedDungeon] = useState<IDungeon>();
  const router = useRouter();

  const createRoom = () => {
    // TODO: audio & images not in design
    dndService
      .createRoom({
        generateAudio: false,
        generateImages: false,
        dungeon: selectedDungeon?._id,
      })
      .then((res) => {
        router.push(`lobby/${res.data.conversationId}`);
      });
  };
  return (
    <>
      <Tabs
        homeOrDungeons="dungeon"
        selectedTab={dungeonTab}
        onTabClick={() => setSelectedDungeon(undefined)}
      />

      <div className="flex flex-col gap-12 flex-1 overflow-y-auto pr-8">
        {dungeons.map((dungeon) => (
          <div
            key={dungeon._id}
            className={cn(
              "flex flex-row gap-8 hover:bg-white/5",
              dungeon === selectedDungeon && "bg-white/5",
            )}
            onClick={() => setSelectedDungeon(dungeon)}
          >
            <Image
              src={dungeon.image || "/images/bg-cover.png"}
              alt={dungeon.name}
              width={180}
              height={180}
              className="h-[180px]"
            />
            <div className="flex flex-col py-4 gap-4 w-full">
              <div className="flex flex-row justify-between w-full pr-8">
                <p className="text-[22px] leading-7 font-medium tracking-[0.15em] uppercase">
                  {dungeon.name}
                </p>
                {dungeon === selectedDungeon && (
                  <div className="flex flex-row items-center px-3 gap-4 border border-tomato justify-self-end">
                    <AiOutlineCheck className="text-tomato text-lg" />
                    <p className="leading-6 tracking-[0.15em] text-tomato uppercase">SELECTED</p>
                  </div>
                )}
              </div>
              <p className="font-light text-lg tracking-widest">{dungeon.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 items-center text-white/50 cursor-pointer">
          <AiOutlineQuestionCircle className="text-2xl" />
          <p className="leading-7 tracking-[0.15em]  uppercase">HOW TO PLAY</p>
        </div>
        <Button className="px-8 w-fit" disabled={!selectedDungeon} onClick={createRoom}>
          CREATE
        </Button>
      </div>
    </>
  );
};

export default CreateRoom;

"use client";

import { IRoomData } from "@/services/dndService";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";
import useHome from "../hooks/use-home";

const GameHistory = () => {
  const { roomHistory } = useHome();

  return (
    <div className="flex flex-col flex-1 gap-8 overflow-y-auto no-scrollbar">
      {roomHistory.map((room, i) => (
        <div key={i /* room.conversationId */} className="flex flex-row items-center gap-4">
          <Image src={room.image || "/images/bg-cover.png"} alt={"Game"} width={80} height={80} className="h-20" />
          <div className="flex flex-col gap-1 flex-1 justify-center">
            <p className="leading-5 font-medium tracking-widest uppercase">Dungeon name</p>
            <p className="text-sm tracking-[0.15em] text-white/50 uppercase">Avatar name</p>
            {room.state === "GAMING" && (
              <p className="text-sm tracking-[0.15em] text-tomato/50 uppercase">RESUME (TURN {room.currentRound})</p>
            )}
          </div>
          {room.state === "GAMING" && (
            <AiOutlineRight className="cursor-pointer text-tomato h-8 w-5" preserveAspectRatio="none" />
          )}
        </div>
      ))}
      <div />
    </div>
  );
};

export default GameHistory;
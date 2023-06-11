"use client";

import Skeleton from "@/components/ui/skeleton";
import { useGetMyDungeons } from "../hooks/use-get-home-data";
import { useTabStore } from "../stores/tab-store";
import Dungeon from "./dungeon";

const Dungeons = () => {
  const { homeTab } = useTabStore((state) => state);

  const { data: myDungeons, isLoading } = useGetMyDungeons(homeTab === "MY KINGDOM");

  if (isLoading) return <Skeleton />;

  if (!myDungeons) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-5xl">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 flex-1 overflow-y-auto pr-8">
      {myDungeons.map((dungeon) => (
        <Dungeon key={dungeon._id} dungeon={dungeon} />
      ))}
    </div>
  );
};

export default Dungeons;

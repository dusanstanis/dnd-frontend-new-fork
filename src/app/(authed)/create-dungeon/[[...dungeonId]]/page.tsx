/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useStore from "@/hooks/use-store";
import { redirect, useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";
import Champions from "./components/champions";
import DungeonSkeleton from "./components/dungeon-skeleton";
import Final from "./components/final";
import Initial from "./components/initial";
import Locations from "./components/locations";
import { useDungeonFormStore } from "./stores/form-store";
import useGetDungeon from "./hooks/use-get-dungeon";
import { useEffect, useRef } from "react";

const CreateDungeon = ({ params }: { params: { dungeonId?: [string] } }) => {
  const router = useRouter();

  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const previousDungeonFormStore = useRef(dungeonFormStore);

  const dungeonId = params.dungeonId?.[0];
  const dungeonQuery = useGetDungeon(dungeonId);

  const loadDungeonData = () => {
    if (dungeonId) {
      // editing...
      if (dungeonQuery?.data && dungeonFormStore && !dungeonFormStore.dungeonFormData.id) {
        dungeonFormStore.updateDungeonFormData({
          id: dungeonId,
          name: dungeonQuery.data.name,
          description: dungeonQuery.data.description,
          locations: dungeonQuery.data.locations,
          champions: dungeonQuery.data.champions,
        });
      }
    } else {
      // creating...
      dungeonFormStore?.resetDungeonFormData();
    }

    // Update previousDungeonFormStore two times to ensure it is always one step behind dungeonFormStore
    previousDungeonFormStore.current = dungeonFormStore;
  };

  useEffect(() => {
    loadDungeonData();
  }, [dungeonQuery?.data, dungeonId]);

  //! Hacky way to wait for dungeonFormStore to become defined (mounted) after nextjs hydration
  useEffect(() => {
    // Check if dungeonFormStore has become defined
    if (dungeonFormStore && !previousDungeonFormStore.current) {
      loadDungeonData();
    }
  }, [dungeonFormStore]);

  if (dungeonQuery?.isError) return redirect("/home");

  if (dungeonQuery?.isLoading || !dungeonFormStore) return <DungeonSkeleton />;

  const { currentStep, setCurrentStep, resetDungeonFormData } = dungeonFormStore;

  const abortDungeonCreation = () => {
    router.push("/home");
    setCurrentStep("INITIAL");
    resetDungeonFormData();
  };

  return (
    <div className="flex justify-center h-full p-16 overflow-y-hidden">
      <div className="flex flex-col gap-8">
        <div
          className="cursor-pointer flex flex-row gap-1 w-fit font-medium items-center tracking-[0.08em]  uppercase"
          onClick={abortDungeonCreation}
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </div>

        {currentStep === "INITIAL" && <Initial />}
        {currentStep === "LOCATIONS" && <Locations />}
        {currentStep === "CHAMPIONS" && <Champions dungeonId={dungeonId} />}
        {currentStep === "FINAL" && <Final />}
      </div>
    </div>
  );
};

export default CreateDungeon;
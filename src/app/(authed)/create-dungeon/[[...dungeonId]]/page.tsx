/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import { isEqual } from "lodash";
import { AiOutlineLeft } from "react-icons/ai";

import useGetDungeon from "@/hooks/use-get-dungeon";
import useStore from "@/hooks/use-store";
import BoxSkeleton from "@/components/BoxSkeleton";
import MobileNavbar from "@/components/mobile-navbar";

import Champions from "./components/champions";
import Final from "./components/final";
import Initial from "./components/initial";
import Locations from "./components/locations";
import { initialDungeonFormData, useDungeonFormStore } from "./stores/form-store";

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
          duration: dungeonQuery.data.duration,
          description: dungeonQuery.data.description,
          style: dungeonQuery.data.style,
          tags: dungeonQuery.data.tags.map((tag) => ({
            label: tag,
            value: tag,
          })),
          locations: dungeonQuery.data.locations,
          champions: dungeonQuery.data.champions,
          imageUrl: dungeonQuery.data.imageUrl,
          image: dungeonQuery.data.imageUrl,
        });
      }
    } else {
      // creating...
      if (dungeonFormStore) {
        // if the user is not in creation process but just started it then reset the form
        if (isEqual(dungeonFormStore.dungeonFormData, initialDungeonFormData))
          dungeonFormStore?.resetDungeonFormData();
      }
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

  if (dungeonQuery.isError) return redirect("/home");

  if (dungeonQuery.isInitialLoading || !dungeonFormStore)
    return <BoxSkeleton title={`${dungeonId ? "EDIT" : "CREATE"} DUNGEON`} />;

  const { currentStep, setCurrentStep, resetDungeonFormData } = dungeonFormStore;

  const abortDungeonCreation = () => {
    router.push("/home");
    setCurrentStep("INITIAL");
    resetDungeonFormData();
  };

  return (
    <div className="mt-8 h-full w-full overflow-y-auto lg:mt-0">
      <MobileNavbar goBackAction={abortDungeonCreation} />
      <div className="flex h-full w-full justify-center pt-8 lg:overflow-y-hidden lg:p-16">
        <div className="flex w-full flex-col items-center gap-8">
          <div
            className="hidden w-fit cursor-pointer flex-row items-center justify-center gap-1 text-lg font-medium uppercase tracking-[0.08em] lg:flex"
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
    </div>
  );
};

export default CreateDungeon;

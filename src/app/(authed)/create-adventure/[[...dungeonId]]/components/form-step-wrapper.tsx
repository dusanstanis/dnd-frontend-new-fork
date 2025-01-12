import React from "react";
import { useRouter } from "next/navigation";

import GoBackButton from "@/components/common/go-back-button";
import { Box } from "@/components/ui/box";
import { Tooltip } from "@/components/ui/tooltip";
import { IDungeonDetail } from "@/types/dungeon";

import useLoadDungeonData from "../hooks/use-load-dungeon-data";
import { dungeonFormStore } from "../stores/dungeon-form-store";
import { stepDescriptions } from "../utils/step-utils";

interface IFormStepWrapperProps {
  isEditing?: boolean;
  children: React.ReactNode;
  dungeonData: IDungeonDetail | undefined;
}

const FormStepWrapper = ({ isEditing, children, dungeonData }: IFormStepWrapperProps) => {
  const currStep = dungeonFormStore.currentStep.use();
  const stepDescription = stepDescriptions[currStep];
  const statusObs = dungeonFormStore.status;
  const status = statusObs.use();

  const router = useRouter();

  const { setAborting } = useLoadDungeonData({ dungeonData });

  const onClickBack = () => {
    if (status === "LIST") abortDungeonCreation();
    else statusObs.set("LIST");
  };

  const abortDungeonCreation = () => {
    setAborting(true);
    router.push("/profile");
  };

  return (
    <Box
      title={isEditing ? "EDIT ADVENTURE" : "CREATE ADVENTURE"}
      className="mb-4 flex min-h-0 flex-1 flex-col gap-5 p-5 lg:mb-0 lg:gap-6 lg:p-8"
      wrapperClassName="w-[95%] lg:w-full mx-auto"
    >
      <GoBackButton text={status === "LIST" ? "PROFILE" : "BACK"} onClick={onClickBack} />

      <div className="flex flex-row items-center justify-between gap-8">
        <p className="w-full text-lg font-semibold uppercase leading-7 tracking-[0.15em] lg:text-[22px]">
          {currStep} {stepDescription && <span className="text-white/50">/ {stepDescription}</span>}
        </p>
        <Tooltip
          content={
            <ul className="list-inside list-disc">
              <li>Title is required</li>
              <li>Description is required</li>
              <li>Scenes: Min. 3 - Max. 5</li>
              <li>Characters: Min. 1</li>
            </ul>
          }
        >
          <div className="cursor-default whitespace-nowrap rounded-md border border-white/25 px-3 py-1.5 tracking-wider">
            See requirements
          </div>
        </Tooltip>
      </div>
      <div className="hidden w-full border-t border-white/20 lg:block" />

      {children}
    </Box>
  );
};

export default FormStepWrapper;

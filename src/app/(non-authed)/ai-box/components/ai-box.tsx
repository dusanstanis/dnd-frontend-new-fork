import React from "react";

import MobileNavbar from "@/components/navbar/mobile-navbar";

import AiBoxSwitcher from "./ai-box-switcher";

interface AiBoxProps {
  state?: string;
  boxId?: string;
}

const AiBoxWrapper: React.FC<AiBoxProps> = ({ state = "daily", boxId }) => {
  return (
    <>
      <div className="hidden flex-1 flex-col gap-12 px-5 pb-12 lg:flex lg:flex-row lg:px-0">
        <AiBoxSwitcher state={state} boxId={boxId} />
      </div>
      <div className="relative flex flex-col lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <AiBoxSwitcher state={state} boxId={boxId} />
      </div>
    </>
  );
};

export default AiBoxWrapper;

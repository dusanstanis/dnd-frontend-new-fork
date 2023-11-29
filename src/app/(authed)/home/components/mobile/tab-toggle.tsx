import { motion } from "framer-motion";

import HelmetIcon from "@/components/icons/helmet-icon";
import SwordsIcon from "@/components/icons/swords-icon";
import { cn } from "@/utils/style-utils";

import { baseTabs, tabStore } from "../../stores/tab-store";

const TabToggle = ({
  switching = false,
  setSwitching,
}: {
  switching?: boolean;
  setSwitching?: (swtiching: boolean) => void;
}) => {
  const activeBaseTab = tabStore.baseTab.use();

  return (
    <div className={cn("flex justify-center px-4")}>
      <div className="pointer-events-auto relative flex w-full rounded-full border border-white/[8%] bg-black">
        {baseTabs.map((tab) => (
          <div
            key={tab}
            className={cn(
              "z-10 mx-5 my-2.5 flex w-full select-none items-center justify-center text-sm uppercase opacity-50 transition-all",
              tab === "adventures" && "gap-1",
              tab === "campaigns" && "gap-2.5",
              activeBaseTab === tab && "opacity-100",
            )}
            onClick={() => {
              if (activeBaseTab !== tab && !switching) {
                tabStore.baseTab.set(tab);
                if (setSwitching) {
                  setSwitching(true);
                  setTimeout(() => setSwitching(false), 500);
                }
              }
            }}
          >
            {tab === "adventures" && <HelmetIcon className="h-4 w-4" />}
            {tab === "campaigns" && <SwordsIcon className="h-4 w-4 fill-white" />}

            {tab}
          </div>
        ))}

        <div
          className={cn(
            "absolute inset-0 flex h-full w-full items-center justify-start p-0.5",
            activeBaseTab === "campaigns" && "justify-end",
          )}
        >
          <motion.div
            className={cn("h-9 w-1/2 rounded-full bg-primary")}
            layout
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default TabToggle;
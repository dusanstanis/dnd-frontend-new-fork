import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Star1 } from "iconsax-react";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { TextArea } from "@/components/ui/text-area";
import { IDungeonDetail } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

import useRateDungeon from "../../hooks/use-rate-dungeon";
import { gameStore } from "../../stores/game-store";

const RateModal = ({
  dungeon,
  conversationId,
}: {
  dungeon: IDungeonDetail;
  conversationId: string;
}) => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");
  const pageState = gameStore.pageState.use();
  const rewardOpen = gameStore.reward.use();

  const open = pageState === "RATE" && !rewardOpen;

  const close = () => {
    gameStore.pageState.set("DEFAULT");
  };

  const [rating, setRating] = useState(3);
  const [hovered, setHovered] = useState<number>();
  const { mutate } = useRateDungeon();

  const rateDungeon = () => {
    mutate({ dungeonId: dungeon._id, rating, roomId: conversationId });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) close();
      }}
    >
      <DialogContent className="max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900">
        <DialogHeader>
          <DialogTitle className="text-center uppercase">
            RATE YOUR ADVENTURE IN {dungeon.name}
          </DialogTitle>

          <DialogDescription className="text-center text-base leading-7 tracking-tight lg:w-[530px]">
            Your bravery led you through the twists and turns of {dungeon.name}. We value your
            feedback. How did you find your journey?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-8 flex w-full flex-col items-center gap-8">
          <div className="flex w-full justify-center gap-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star1
                key={i + 1}
                onMouseEnter={() => {
                  if (!isMobileTablet) setHovered(i + 1);
                }}
                onMouseLeave={() => {
                  if (!isMobileTablet) setHovered(undefined);
                }}
                onClick={() => {
                  if (rating === i + 1) setRating(0);
                  else setRating(i + 1);
                }}
                className={cn(
                  "h-12 w-12 fill-transparent text-primary transition-all duration-200",
                  hovered === undefined
                    ? rating >= i + 1 && "fill-primary"
                    : hovered >= i + 1 && "lg:fill-primary",
                )}
              />
            ))}
          </div>
          <TextArea
            placeholder="Leave your comments or suggestions here"
            label="Additional comment"
            rows={3}
          />
        </div>
        <DialogFooter className="items-center max-lg:flex-col">
          <Button
            variant="outline"
            className="flex max-w-full flex-1 px-4 text-sm max-lg:w-56 lg:w-fit lg:px-8 lg:text-xl"
            onClick={close}
            autoFocus
          >
            cancel
          </Button>
          <Button
            variant="primary"
            className="flex w-fit max-w-full flex-1  whitespace-nowrap px-4 text-sm max-lg:w-56 lg:px-8 lg:text-xl"
            onClick={() => {
              rateDungeon();
              close();
            }}
          >
            rate this adventure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RateModal;

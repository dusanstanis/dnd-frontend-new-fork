/* eslint-disable react/no-unescaped-entities */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaDice } from "react-icons/fa";
import { useReadLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { cn } from "@/utils/style-utils";
import { gameModeSchema } from "@/validations/room";

import usePlayMove from "../../hooks/use-play-move";
import usePlayMoveSocket from "../../hooks/use-play-move-socket";
import { moveStore } from "../../stores/move-store";
import PickPowerup from "../gameplay/pick-powerup";
import { IPlayMoveProps } from "../gameplay/play-move";
import WordChallengeEntry from "../gameplay/word-challenge-entry";

const MobilePlayMove = ({ roomData, conversationId, currentPlayer }: IPlayMoveProps) => {
  usePlayMoveSocket(conversationId);
  const accountId = useReadLocalStorage<string>("accountId");
  const { onPlay } = usePlayMove(conversationId, roomData, currentPlayer);

  const wordChallengeForPlayer = roomData.wordsChallenge?.find(
    (wordChallenge) => wordChallenge.accountId === accountId,
  );

  const hide = roomData.state === "WIN" || roomData.state === "LOSE";
  const store = moveStore.use();

  if (!currentPlayer.champion) return <div>Something went wrong.</div>;

  return (
    <div
      className={cn(
        "relative border-t border-white/20 bg-black pb-6",
        !store.canPlay && "pointer-events-none",
        hide && "hidden",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 size-full bg-black opacity-0 transition-all duration-200",
          !store.canPlay && "opacity-60",
        )}
      />
      <motion.header className="relative flex h-7 pl-4 pt-3">
        <AnimatePresence>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            key="1"
            className="absolute flex w-full items-center gap-3"
          >
            <MoveDisplay className="border-0 p-0 uppercase" gameMode={currentPlayer.gameMode} />
          </motion.div>
        </AnimatePresence>
      </motion.header>
      <motion.section className="relative h-fit min-h-[58px]">
        <AnimatePresence>
          <motion.div
            key="1"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="flex w-full flex-col justify-between gap-2"
          >
            <div className="flex w-full flex-col gap-3 px-4 pt-3">
              {currentPlayer.gameMode == gameModeSchema.Enum.random_words ? (
                wordChallengeForPlayer && (
                  <div className="flex size-full max-h-[200px] flex-col overflow-y-auto">
                    <div className="inline">
                      {wordChallengeForPlayer.words.map((word, index) => (
                        <WordChallengeEntry
                          key={JSON.stringify({ ...roomData.wordsChallenge, index })}
                          index={index}
                          word={word}
                        />
                      ))}
                      <WordChallengeEntry
                        key={JSON.stringify({
                          ...roomData.wordsChallenge,
                          index: wordChallengeForPlayer.words.length,
                        })}
                        index={wordChallengeForPlayer.words.length}
                        word="."
                      />
                    </div>
                  </div>
                )
              ) : (
                <TextArea
                  placeholder="Write your response and roll the dice..."
                  className="m-0 w-full border-0 p-0 text-xs"
                  value={store.freeWill}
                  onChange={(e) => {
                    moveStore.freeWill.set(e.target.value);
                  }}
                />
              )}
            </div>
            <div className="flex border border-gray-800">
              <PickPowerup currentMana={currentPlayer.mana} />
              <div className="flex w-full bg-primary px-6">
                <Button
                  onClick={onPlay}
                  disabled={!store.canPlay || (!store.freeWill && !store.wordsChallenge.length)}
                  className="flex w-full items-center gap-1 rounded-none border-none py-1.5 text-xs"
                >
                  <FaDice /> Roll the dice
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

interface IMoveDisplayProps {
  onClick?: () => void;
  className?: string;
  gameMode: string | null | undefined;
}

const MoveDisplay = ({ onClick, className, gameMode }: IMoveDisplayProps) => {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-md border border-white p-2 text-xs font-medium",
        className,
      )}
      onClick={onClick}
    >
      {gameMode === "normal" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Normal mode" className="text-xs">
            ✍️
          </span>
          <p className="text-[10px] leading-tight">
            Write your move normally without any restrictions.
          </p>
        </div>
      )}
      {gameMode === "only_emoji" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Emoji mode" className="text-xs">
            😃
          </span>
          <p className="text-[10px] leading-tight">Use only emojis to express your move.</p>
        </div>
      )}
      {gameMode === "overly_descriptive" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Overly descriptive mode" className="text-xs">
            🎨
          </span>
          <p className="text-[10px] leading-tight">
            Add excessive detail to your move, describing the color, texture, and smell. Brevity
            will be penalized!
          </p>
        </div>
      )}
      {gameMode === "vagueness" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Vagueness mode" className="text-xs">
            🌀
          </span>
          <p className="text-[10px] leading-tight">
            Keep your move vague and open to interpretation. The more ambiguous, the better your
            rating!
          </p>
        </div>
      )}
      {gameMode === "three_languages" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Multilingual mode" className="text-xs">
            🌍
          </span>
          <p className="text-[10px] leading-tight">
            {" "}
            Declare your move in at least 3 different languages to earn a higher rating.
          </p>
        </div>
      )}
      {gameMode === "random_words" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Random words mode" className="text-xs">
            🎲
          </span>
          <p className="text-[10px] leading-tight">Incorporate random words into your move.</p>
        </div>
      )}
      {gameMode === "smart" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Smart move" className="text-xs">
            🧠
          </span>
          <p className="text-[10px] leading-tight">
            Outsmart your opponent with a clever, strategic move.
          </p>
        </div>
      )}
      {gameMode === "aggressive" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Aggressive move" className="text-xs">
            💥
          </span>
          <p className="text-[10px] leading-tight">
            Take a bold, forceful action with no hesitation.
          </p>
        </div>
      )}
      {gameMode === "rap_battle" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Rap battle move" className="text-xs">
            🎤
          </span>
          <p className="text-[10px] leading-tight">
            Deliver your move in the form of rhymes and rhythm. Get ready to rap your way out!
          </p>
        </div>
      )}
      {gameMode === "stupid" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Stupid move" className="text-xs">
            🧟
          </span>
          <p className="text-[10px] leading-tight">
            Make a move that’s completely random and nonsensical. No brainpower required.
          </p>
        </div>
      )}
      {gameMode === "emotional" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Emotional move" className="text-xs">
            😢
          </span>
          <p className="text-[10px] leading-tight">
            Pour your feelings into the move — sad, happy, or overwhelmed.
          </p>
        </div>
      )}
      {gameMode === "sarcastic" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Sarcastic move" className="text-xs">
            🙄
          </span>
          <p className="text-[10px] leading-tight">
            Express your move with maximum sarcasm and wit.
          </p>
        </div>
      )}
      {gameMode === "mysterious" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Mysterious move" className="text-xs">
            🕵️‍♂️
          </span>
          <p className="text-[10px] leading-tight">
            Be vague, cryptic, and leave your opponent guessing.
          </p>
        </div>
      )}
      {gameMode === "heroic" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Heroic move" className="text-xs">
            🦸
          </span>
          <p className="text-[10px] leading-tight">
            Make a courageous, heroic move as if you're saving the day.
          </p>
        </div>
      )}
      {gameMode === "lazy" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Lazy move" className="text-xs">
            😴
          </span>
          <p className="text-[10px] leading-tight">
            Barely move, or move as little as possible with minimal effort.
          </p>
        </div>
      )}
      {gameMode === "flashy" && (
        <div className="flex flex-wrap items-center space-x-2">
          <span role="img" aria-label="Flashy move" className="text-xs">
            ✨
          </span>
          <p className="text-[10px] leading-tight">
            Execute a move with flair and style. Impress everyone, even if it doesn't work.
          </p>
        </div>
      )}
    </div>
  );
};

export default MobilePlayMove;

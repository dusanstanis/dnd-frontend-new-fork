/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react";

import Spinner from "@/components/ui/spinner"; // Importing Spinner component
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import useGetTournament from "../hooks/use-get-tournament";
import CommunityCarosel from "./community-carosel";
import CommunityLeaderboard from "./community-leaderboard";
import CommunityTrack from "./community-track";
import TournamentLeaderboardList from "./tournament-leaderboard-list";
import TournamentSkeleton from "./tournament-skeleton";

const TournamentDesktop = () => {
  const { data, isLoading, error } = useGetTournament();
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);
  const [lastRefetch, setLastRefetch] = useState<number>(1);
  const [isArrowSpinning, setIsArrowSpinning] = useState(false);

  const handleArrowSpinning = () => {
    setIsArrowSpinning(true); // Show the spinner

    // Simulate a 3-second delay
    setTimeout(() => {
      setIsArrowSpinning(false); // Show the arrow again after 3 seconds
      setLastRefetch(Date.now());
    }, 3000);
  };

  useEffect(() => {
    if (data && data.communities.length > 0) {
      setSelectedCommunity(data.communities[0]); // Automatically select the first community
    }
  }, [data]);

  if (isLoading) {
    return <TournamentSkeleton />;
  }

  if (error) {
    return (
      <div className="mb-4 flex flex-col items-center rounded-t-md py-6">
        <h1 className="text-4xl font-bold tracking-wide text-white">
          Error loading tournament data
        </h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mb-4 flex flex-col items-center rounded-t-md py-6">
        <h1 className="text-4xl font-bold tracking-wide text-white">No data found </h1>
      </div>
    );
  }

  const { name, season, startDate, endDate, prize, prizeToken, communities } = data;

  const handleSelectCommunity = (community: any) => {
    setSelectedCommunity(community);
  };

  return (
    <div
      className={cn(
        "no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden p-4 lg:p-8 ",
      )}
    >
      {" "}
      <div className="relative flex w-full  flex-row justify-between p-2">
        <div className="mb-4 flex flex-col items-center rounded-t-md ">
          <h1 className="mb-4 text-4xl font-bold tracking-wide text-red-400" style={jibril.style}>
            {name}
          </h1>
          <h2 className="mb-4 text-2xl font-semibold">Season {season}</h2>
          <h2 className="text-2xl font-semibold">Starts: {formatDate(startDate)}</h2>
          <h2 className="text-2xl font-semibold">Ends: {formatDate(endDate)}</h2>
        </div>
        <CommunityTrack
          communities={communities}
          selectedCommunity={selectedCommunity}
          handleSelectCommunity={handleSelectCommunity}
        />
        <div className="relative mt-4 flex flex-col items-center rounded-t-md ">
          <h1
            className="mb-4 text-4xl font-semibold text-red-400"
            style={jibril.style}
          >{`Ultimate battle prize`}</h1>
          <h1 className="mt-4 font-mono text-6xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
            {`${prize} ${prizeToken}`}
          </h1>
          <a href="https://www.ora.io/" target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col items-center">
              <div className="flex flex-row items-center ">
                <h1 className="text-center text-lg font-bold tracking-wide text-white">
                  Powered by ORA Protocol
                </h1>
                <img
                  src="/images/logos/ora-logo.png"
                  alt="ora logo"
                  style={{ width: "40px", height: "40px", objectFit: "contain" }}
                />
              </div>
            </div>
          </a>
          <br />
          <a
            href="https://www.alchemy.com/faucets/arbitrum-sepolia"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2"
          >
            <p className="text-center text-lg font-bold tracking-wide text-red-400 group-hover:underline">
              Click to get free testnet tokens on Arbitrum
            </p>
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        {isArrowSpinning ? (
          <Spinner className="m-0 size-5 shrink-0 opacity-100" style={{ cursor: "pointer" }} />
        ) : (
          <ArrowClockwise
            className="m-0 size-5 shrink-0 cursor-pointer opacity-100"
            size={24}
            onClick={handleArrowSpinning}
          />
        )}
        <p className="text-lg text-white">
          It can take up to <strong className="font-semibold text-red-400">2 minutes</strong> for
          the AI to rate your query after a successful transaction. Please{" "}
          <strong className="font-semibold text-red-400">refresh the page</strong> to see the
          result.
        </p>
      </div>
      <div className="relative mt-3 flex flex-row gap-4 ">
        <div className={cn("flex  w-1/4 flex-shrink-0 flex-col")}>
          <div className="mb-12 flex flex-col ">
            <CommunityCarosel selectedCommunity={selectedCommunity} />
          </div>
          <div>
            <CommunityLeaderboard communities={communities} />
          </div>
        </div>
        <div className={cn("w-full ")}>
          <TournamentLeaderboardList
            lastRefetch={lastRefetch}
            communityId={selectedCommunity ? selectedCommunity._id : ""}
          />
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options); // undefined means it will use the user's locale
};

export default TournamentDesktop;

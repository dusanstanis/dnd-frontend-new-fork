/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react";

import Spinner from "@/components/ui/spinner"; // Importing Spinner component

import useGetTournament from "../hooks/use-get-tournament";
import CommunityLeaderboard from "./community-leaderboard";
import CommunityTrack from "./community-track";
import TournamentLeaderboardList from "./tournament-leaderboard-list";

const TournamentMobile = () => {
  const { data, isLoading, error } = useGetTournament();
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);
  const [lastRefetch, setLastRefetch] = useState<number>(1);
  const [isArrowSpinning, setIsArrowSpinning] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1); // State to manage active tab

  const handleArrowSpinning = () => {
    setIsArrowSpinning(true);
    setTimeout(() => {
      setIsArrowSpinning(false);
      setLastRefetch(Date.now());
    }, 3000);
  };

  useEffect(() => {
    if (data && data.communities.length > 0) {
      setSelectedCommunity(data.communities[0]);
    }
  }, [data]);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-6">
        <h1 className="text-2xl font-bold text-white">Error loading tournament data</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center py-6">
        <h1 className="text-2xl font-bold text-white">No data found</h1>
      </div>
    );
  }

  const { name, season, startDate, endDate, prize, prizeToken, communities } = data;

  const handleSelectCommunity = (community: any) => {
    setSelectedCommunity(community);
  };

  return (
    <div className="mt-10 flex w-full flex-col p-4">
      {/* Tab Navigation */}
      <div className="mb-4 flex justify-between">
        <button
          className={`flex-1 p-2 ${activeTab === 1 ? "bg-red-400 text-black" : " text-white"}`}
          onClick={() => setActiveTab(1)}
        >
          Communities
        </button>

        <button
          className={`flex-1 p-2 ${activeTab === 2 ? "bg-red-400 text-black" : " text-white"}`}
          onClick={() => setActiveTab(2)}
        >
          Leaderboard
        </button>
      </div>

      {activeTab === 1 && (
        <div className="mt-8 flex flex-col items-center space-y-4">
          <CommunityLeaderboard communities={communities} />
        </div>
      )}

      {activeTab === 2 && (
        <div className="mt-8">
          <CommunityTrack
            communities={communities}
            selectedCommunity={selectedCommunity}
            handleSelectCommunity={handleSelectCommunity}
          />
          <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-white">
              It can take up to <strong className="text-red-400">2 minutes</strong> for the AI to
              rate your query. Please <strong className="text-red-400">refresh the page</strong> to
              see the result.
            </p>
            {/* Refresh Info */}
            <div className="flex items-center space-x-3">
              {isArrowSpinning ? (
                <Spinner className="m-0 size-5 opacity-100" style={{ cursor: "pointer" }} />
              ) : (
                <ArrowClockwise
                  className="cursor-pointer opacity-100"
                  size={24}
                  onClick={handleArrowSpinning}
                />
              )}
            </div>
          </div>
          <div className="mt-2">
            <TournamentLeaderboardList
              lastRefetch={lastRefetch}
              communityId={selectedCommunity ? selectedCommunity._id : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export default TournamentMobile;

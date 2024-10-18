/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React from "react";

import MobileNavbar from "@/components/navbar/mobile-navbar";

import TournamentDesktop from "./tournament-desktop";
import TournamentMobile from "./tournament-mobile";

const Tournament = () => {
  return (
    <>
      <div className="hidden lg:block ">
        <TournamentDesktop />
      </div>
      <div className="relative flex flex-col lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <TournamentMobile />
      </div>
    </>
  );
};

export default Tournament;

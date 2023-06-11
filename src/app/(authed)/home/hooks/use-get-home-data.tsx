"use client";

import dndService from "@/services/dnd-service";
import dungeonService from "@/services/dungeon-service";
import roomService from "@/services/room-service";
import { useQuery } from "@tanstack/react-query";

export const useGetRecommendedDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: ["recommendedDungeons"],
    queryFn: dungeonService.getRecommendedDungeons,
    enabled,
  });
};

export const useGetMyDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: ["myDungeons"],
    queryFn: dungeonService.getDungeons,
    enabled,
  });
};

export const useGetRoomHistory = () => {
  return useQuery({
    queryKey: ["roomHistory"],
    queryFn: roomService.getRooms,
  });
};

export const useGetKingdom = () => {
  return useQuery({
    queryKey: ["kingdom"],
    queryFn: dndService.getKingdom,
  });
};
import { IChampion, IDungeon, ILocation, IPlayer, IRoom, MoveType } from "@/types/dnd";

import createApi from "./apiFactory";
import { IDungeonFormData } from "@/app/(authed)/create-dungeon/[[...dungeonId]]/stores/form-store";

const dndApi = createApi();

const createRoom = async (data: {
  generateImages: boolean;
  generateAudio: boolean;
  templateSentences?: string;
  dungeon?: string;
}) => {
  return await dndApi.post<IRoom>("room", data);
};

const joinRoom = async (data: { link: string }) => {
  return await dndApi.post<IRoom>("room/join", data);
};

export interface IRoomData {
  state: "CREATING" | "GAMING" | "CLOSED";
  moves: string[];
  playerState: IPlayer[];
  roundEndsAt: string | null;
  dungeonId: string;
  link: string;
  queuedMoves: string[];
  currentRound: number;
  chatGptResponses: string[];
  generatedImages: string[];
  generateImages: boolean;
  generatedAudio: string[];
  generateAudio: string;
  location: ILocation;
  adventureMission: string;
  conversationId: string;
  image?: string;
}

export interface IPlayerMove {
  accountId: string;
  moveType: MoveType;
  message: string;
  dice: number;
  aiRating: number;
  aiDescriptionForRating: string;
}

const getRoomData = async (conversationId: string) => {
  return await dndApi.get<IRoomData>(`room/${conversationId}/`);
};

export interface IAvatar {
  _id: string;
  name: string;
  energy: number;
  level: number;
  kingdomId: string;
  label: string;
  image?: string;
}

export interface IKingdom {
  avatars: IAvatar[];
  name: string;
  gold: number;
}

const getKingdom = async () => {
  return await dndApi.get<IKingdom>("kingdom").then((res) => res.data);
};

const createAvatar = async (data: { name: string }) => {
  return await dndApi.post("avatar", data);
};

const startGame = async (data: { conversationId: string }) => {
  return await dndApi.post("room/start", data);
};

interface IEditChampion {
  conversationId: string;
  championId: string;
}

const editChampion = async (data: IEditChampion) => {
  return await dndApi.put("player/champion/edit", data);
};

interface IEditAvatar {
  conversationId: string;
  avatarId: string;
}

const editAvatar = async (data: IEditAvatar) => {
  return await dndApi.put("player/avatar/edit", data);
};

interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  moveType: string;
  message?: string;
}

export interface IPlayMoveResponse {
  dice: number;
  diceAfterBonus: number;
  diceBreakdown: {
    aiDiceBonus: number;
    bonusApplied: number;
    dice: number;
    mana: number;
  };
}

const playMove = async (data: IPlayMove) => {
  return await dndApi.post<IPlayMoveResponse>("play", data);
};

export interface IPostLocation {
  name: string;
  description: string;
  mission: string;
  transition: string;
}

const postLocations = async (data: { locations: IPostLocation[] }) => {
  return await dndApi.post<ILocation[]>("locations", data);
};

export interface IPostDungeon {
  name: string;
  description: string;
  locations: string[];
  champions: string[];
}

const getDungeon = async (dungeonId: string) => {
  return await dndApi.get<IDungeon>(`dungeon/${dungeonId}/`).then((res) => res.data);
};

const getDungeons = async () => {
  return await dndApi.get<IDungeon[]>("dungeons").then((res) => res.data);
};

const getRecommendedDungeons = async () => {
  return await dndApi.get<IDungeon[]>("dungeons/recommended").then((res) => res.data);
};

const createDungeon = async (data: IDungeonFormData) => {
  return await dndApi.post<IDungeon>("dungeon", data);
};

const updateDungeon = async (data: IDungeonFormData) => {
  return await dndApi.put<IDungeon>("dungeon", data);
};

const deleteDungeon = async (dungeonId: string) => {
  return await dndApi.delete(`dungeon/${dungeonId}`);
};

const getRooms = async () => {
  return await dndApi.get<{ rooms: IRoomData[] }>("rooms").then((res) => res.data);
};

export interface IPostChampion {
  name: string;
  description: string;
  label: string;
  moveMapping: { [key in MoveType]?: string };
}

const postChampions = async (data: { champions: IPostChampion[] }) => {
  return await dndApi.post<IChampion[]>("champions", data);
};

const postComplaint = async (data: { text: string }) => {
  return await dndApi.post("complaint", data);
};

const postQuestion = async (data: { question: string; conversationId: string }) => {
  return await dndApi.post("ask", data);
};

const dndService = {
  createRoom,
  joinRoom,
  getRoomData,
  getKingdom,
  createAvatar,
  startGame,
  editChampion,
  editAvatar,
  playMove,
  postLocations,
  createDungeon,
  updateDungeon,
  getDungeon,
  getDungeons,
  getRecommendedDungeons,
  deleteDungeon,
  getRooms,
  postChampions,
  postComplaint,
  postQuestion,
};

export default dndService;

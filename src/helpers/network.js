import { abiConfig } from "../configs";
import { networkConfig } from "../configs";

export const getABI = (contractType) => {
  const config = abiConfig;
  if (!config) return null;
  if (contractType === "TICKET") return config.gameTicketABI;
  if (contractType === "BOARD") return config.gameLeaderBoardABI;
  return null;
};

export const getContractAddress = (contractType, netId) => {
  if (!netId) return "0x";
  const config = networkConfig[`netId${netId}`];
  if (!config) return "0x";
  if (contractType === "TICKET") return config.gameTicketContract;
  if (contractType === "BOARD") return config.gameLeaderBoardContract;
  return "0x";
};

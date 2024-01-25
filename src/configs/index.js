const config = {
  alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "8",
  walletConnectId: process.env.REACT_APP_WALLET_CONNECT_ID ?? "",
  admins: ["0x777BEeF85E717Ab18e44cd054B1a1E33a4A93b83"],
};

export default config;

export * from "./abiConfig";
export * from "./abis";
export * from "./networkConfig";
export * from "./index";

import { configureStore } from "@reduxjs/toolkit";
import gameTicketReducer from "./modules/gameTicketSlice";
import gameLeaderboardReducer from "./modules/gameLeaderboardSlice";

const store = configureStore({
  reducer: {
    gameTicket: gameTicketReducer,
    gameLeaderboard: gameLeaderboardReducer,
  },
});

export default store;

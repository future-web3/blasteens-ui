import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  escapeFromGerms: {
    score: 0,
    allowSync: false,
  },
  tommyJumping: {
    score: 0,
    allowSync: false,
  },
  snowmanDefender: {
    score: 0,
    allowSync: false,
  },
  emojiMatch: {
    score: 0,
    allowSync: false,
  },
};

const gameLeaderboardSlice = createSlice({
  name: "leaderboards",
  initialState,
  reducers: {
    updateGameScore(state, action) {
      const { gameName, score } = action.payload;
      state[gameName].score = score;
    },
    toggleSyncPermission(state, action) {
      const { gameName, allowSync } = action.payload;
      state[gameName].allowSync = allowSync;
    },
  },
});

export default gameLeaderboardSlice.reducer;
export const gameLeaderboardActions = gameLeaderboardSlice.actions;

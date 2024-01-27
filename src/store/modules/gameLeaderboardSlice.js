import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  germs: {
    score: 0,
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
  },
});

export default gameLeaderboardSlice.reducer;
export const gameLeaderboardActions = gameLeaderboardSlice.actions;

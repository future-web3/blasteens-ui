import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  showTicketWindow: false,
  games: {
    escapeFromGerms: {
      numberOfLives: 0,
    },
    tommyJumping: {
      numberOfLives: 0,
    },
    snowmanDefender: {
      numberOfLives: 0,
    },
    emojiMatch: {
      numberOfLives: 0,
    },
  },
};

const gameTicketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload;
    },
    setNumberOfLives(state, action) {
      const { gameName, numberOfLives } = action.payload;
      state.games[gameName].numberOfLives = numberOfLives;
    },
    useLives(state, action) {
      const gameName = action.payload;
      state.games[gameName].numberOfLives -= 1;
    },
    setShowTicketWindow(state, action) {
      state.showTicketWindow = action.payload;
    },
  },
});

export default gameTicketSlice.reducer;
export const gameTicketActions = gameTicketSlice.actions;

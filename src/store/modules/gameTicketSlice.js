import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  allowGamePlay: false,
  numberOfLives: 0,
  showTicketWindow: false,
};

const gameTicketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload;
    },
    setAllowGamePlay(state, action) {
      state.allowGamePlay = action.payload;
    },
    setNumberOfLives(state, action) {
      state.numberOfLives = action.payload;
    },
    setShowTicketWindow(state, action) {
      state.showTicketWindow = action.payload;
    },
  },
});

export default gameTicketSlice.reducer;
export const gameTicketActions = gameTicketSlice.actions;

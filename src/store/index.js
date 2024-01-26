import { configureStore } from "@reduxjs/toolkit";
import gameTicketReducer from "./modules/gameTicketSlice";

const store = configureStore({
  reducer: {
    gameTicket: gameTicketReducer,
  },
});

export default store;

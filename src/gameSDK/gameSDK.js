import { gameTicketActions } from "../store/modules/gameTicketSlice";
import { gameLeaderboardActions } from "../store/modules/gameLeaderboardSlice";
import store from "../store";

export class gameSDK {
  constructor(gameName) {
    this.store = store;
    this.gameName = gameName;
  }

  useLives() {
    this.store.dispatch(gameTicketActions.useLives(this.gameName));
  }

  startGame(callback) {
    const state = this.store.getState();
    if (state.gameTicket.games[this.gameName].numberOfLives > 0) {
      callback();
    } else {
      this.store.dispatch(gameTicketActions.setShowTicketWindow(true));
    }
  }

  endGame(callback) {
    const state = this.store.getState();
    if (state.gameTicket.games[this.gameName].numberOfLives === 0) {
      this.store.dispatch(
        gameLeaderboardActions.toggleSyncPermission({
          gameName: this.gameName,
          allowSync: true,
        }),
      );
      callback();
    }
  }

  updateHighScore(score) {
    this.store.dispatch(
      gameLeaderboardActions.updateGameScore({
        gameName: this.gameName,
        score,
      }),
    );
  }

  getLives() {
    const state = this.store.getState();
    return state.gameTicket.games[this.gameName].numberOfLives;
  }
}

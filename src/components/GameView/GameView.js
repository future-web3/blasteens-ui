import { useParams } from "react-router-dom";
import styles from "./GameView.module.scss";
import React, { useEffect } from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import events from "../../constants/events";

import { gameGlossaryConfigs } from "../../configs/gameGlossaryConfig";
import Phaser from "phaser";
import Leaderboard from "../Leaderboard/Leaderboard";

let game = null;

function transformId(id) {
  let words = id.split("-");
  let transformedWords = words.map((word, index) => {
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
  });
  let result = transformedWords.join("");
  return result;
}

export const emitter = new Phaser.Events.EventEmitter();

function GameView() {
  const { connectAsync, connect, connectors, error } = useConnect();
  const { address, isConnected } = useAccount();
  const { gameId } = useParams();

  const targetGame = gameGlossaryConfigs[`${transformId(gameId)}`];

  useEffect(() => {
    if (!isConnected) {
      if (game) {
        game.destroy(true);
        game = null;
      }
      return;
    }
    if (!address) return;
    if (game) return;

    game = new Phaser.Game(targetGame.config);

    return () => {
      game.destroy(true);
      game = null;
    };
  }, [isConnected, address, game]);

  if (!targetGame) {
    return null;
  }

  const handleConnectWallet = async () => {
    try {
      if (!isConnected) {
        connect({ connector: connectors[0] });
      }
    } catch (error) {
      emitter.emit(events.AUTH_FAILED);
    }
  };

  return (
    <div className={styles.gameGlossaryContainer}>
      <header className={styles.gameGlossaryHeader}>
        <h1>{targetGame.name}</h1>
        <hr />
      </header>
      <div className={styles.gameGlossaryContent}>
        <div className={styles.gameGlossarySideBlock}>
          <Leaderboard />
        </div>
        <div className={styles.gameGlossaryFrame}>
          <div id="gameDisplay"></div>
          {!isConnected && (
            <div
              className={styles.gameGlossaryFilter}
              style={{
                backgroundImage: `url('/assets/games/${targetGame.key}/background.png')`,
              }}
            >
              <div className={styles.gameGlossaryButtonContainer}>
                <button
                  className={
                    (styles.gameGlossaryWeb3Button,
                    styles.btn,
                    styles.drawBorder)
                  }
                  onClick={handleConnectWallet}
                >
                  Connect Your Wallet
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.gameGlossarySideBlock}>Inventory</div>
      </div>
      <div className={styles.gameGlossaryDescription}>
        <hr />
        <h3>About this Game</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
export default GameView;

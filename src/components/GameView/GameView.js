import { useParams } from "react-router-dom";
import styles from "./GameView.module.scss";
import React, { useEffect } from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import events from "../../constants/events";

import { gameGlossaryConfigs } from "../../configs/gameGlossaryConfig";
import Phaser from "phaser";

let game = null;

export const emitter = new Phaser.Events.EventEmitter();

function GameView() {
  const { connectAsync, connect, connectors, error } = useConnect();
  const { address, isConnected } = useAccount();
  const { gameId } = useParams();

  const targetGame = gameGlossaryConfigs[`${gameId}`];

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
    <div className={styles.gameOuterContainer}>
      {!isConnected && (
        <div className={styles.filter}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.web3Button}
              onClick={() => {
                handleConnectWallet();
              }}
            >
              Connect Your Wallet
            </button>
          </div>
        </div>
      )}
      <p className={styles.gameTitle}>{targetGame.name}</p>
      <div id="game-glossary-frame"></div>
    </div>
  );
}
export default GameView;

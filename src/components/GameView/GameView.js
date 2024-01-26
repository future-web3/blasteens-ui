import { useParams } from "react-router-dom";
import styles from "./GameView.module.scss";
import React, { useEffect, useMemo } from "react";
import { useAccount, useConnect, useNetwork, readContracts } from "wagmi";
import events from "../../constants/events";

import { gameGlossaryConfigs } from "../../configs/gameGlossaryConfig";
import Phaser from "phaser";
import { getABI, getContractAddress } from "../../helpers/network";

let game = null;

export const emitter = new Phaser.Events.EventEmitter();

function GameView() {
  const { connectAsync, connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const netId = chain ? chain.id : 1;

  const { gameId } = useParams();
  const transformId = (id) => {
    let words = id.split("-");
    let transformedWords = words.map((word, index) => {
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    });
    return transformedWords.join("");
  };
  const targetGame = gameGlossaryConfigs[`${transformId(gameId)}`];

  const gameTicketContract = useMemo(() => {
    const address = getContractAddress("TICKET", netId);
    const abi = getABI("TICKET");
    if (!address || !abi) {
      return null;
    }
    return {
      address,
      abi,
    };
  }, [netId]);

  useEffect(() => {
    if (!isConnected || !targetGame) {
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
  }, [isConnected, address, game, targetGame]);

  useEffect(() => {
    if (!game) return;

    const checkTicketHandler = async () => {
      const data = await readContracts({
        contracts: [
          {
            ...gameTicketContract,
            functionName: "balanceOf",
            args: [address, 0],
          },
          {
            ...gameTicketContract,
            functionName: "balanceOf",
            args: [address, 1],
          },
          {
            ...gameTicketContract,
            functionName: "balanceOf",
            args: [address, 2],
          },
        ],
      });
      console.log(">>>>>>>data", data);
    };

    emitter.on(events.CHECK_TICKET, checkTicketHandler);

    return () => {
      emitter.off(events.CHECK_TICKET);
    };
  }, [game]);

  if (!targetGame) {
    return <div>The game url in invalid</div>;
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
      <div className={styles.gameContainer}>
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
    </div>
  );
}
export default GameView;

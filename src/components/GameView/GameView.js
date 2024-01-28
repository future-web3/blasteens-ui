import { useParams } from "react-router-dom";
import styles from "./GameView.module.scss";
import React, { useEffect, useMemo } from "react";
import { useAccount, useConnect, useNetwork, useWalletClient } from "wagmi";

import { gameGlossaryConfigs } from "../../configs/gameGlossaryConfig";
import Phaser from "phaser";
import { getABI, getContractAddress } from "../../helpers/network";
import { checkTicket } from "../../helpers/ticket";
import { useDispatch, useSelector } from "react-redux";
import { gameTicketActions } from "../../store/modules/gameTicketSlice";
import TicketFilter from "./TicketFilter/TicketFilter";

let game = null;

function GameView() {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const netId = chain ? chain.id : 1;

  const dispatch = useDispatch();

  const numberOfLives = useSelector((state) => state.gameTicket.numberOfLives);
  const showTicketWindow = useSelector(
    (state) => state.gameTicket.showTicketWindow,
  );

  const { gameId } = useParams();

  const transformId = (id) => {
    let words = id.split("-");
    let transformedWords = words.map((word, index) => {
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    });
    return transformedWords.join("");
  };

  const transformedGameId = transformId(gameId);
  const targetGame = gameGlossaryConfigs[transformedGameId];

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

  const gameLeaderboardContract = useMemo(() => {
    const address = getContractAddress("BOARD", netId);
    const abi = getABI("BOARD");
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
  }, [isConnected, address, targetGame]);

  useEffect(() => {
    const checkTicketHandler = async () => {
      if (!address || !gameTicketContract) return;
      const data = await checkTicket(gameTicketContract, address);
      console.log(">>>>>>>>>data", data);
      dispatch(gameTicketActions.setTickets(data));
      if (numberOfLives <= 0) {
        dispatch(gameTicketActions.setShowTicketWindow(true));
      } else {
        dispatch(gameTicketActions.setShowTicketWindow(false));
      }
    };

    checkTicketHandler();
  }, [address, gameTicketContract]);

  useEffect(() => {
    if (!game || !address || !gameTicketContract) return;

    // emitter.on(events.SYNC_SCORE);
    //
    // return () => {
    //   emitter.off(events.SYNC_SCORE);
    // };
  }, [game, address, dispatch, gameTicketContract]);

  const handleConnectWallet = async () => {
    try {
      if (!isConnected) {
        connect({ connector: connectors[0] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!targetGame) {
    return <div>The game url in invalid</div>;
  }

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
        {showTicketWindow && isConnected && (
          <TicketFilter
            transformedGameId={transformedGameId}
            address={address}
            gameTicketContract={gameTicketContract}
            gameLeaderboardContract={gameLeaderboardContract}
          />
        )}
        <p className={styles.gameTitle}>{targetGame.name}</p>
        <p>You have {numberOfLives} times of chance</p>
        <div id="game-glossary-frame"></div>
      </div>
    </div>
  );
}
export default GameView;

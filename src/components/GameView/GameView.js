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
import Leaderboard from "../Leaderboard/Leaderboard";
import Inventory from "../Inventory/Inventory";

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
    <div className={styles.gameGlossaryContainer}>
      <header className={styles.gameGlossaryHeader}>
        <h1>{targetGame.name}</h1>
        <p>You have {numberOfLives} times of chance</p>
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
              <div className={styles.gameGlossaryMenuContainer}>
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
          {showTicketWindow && isConnected && (
            <div
              className={`${styles.gameGlossaryFilter} ${styles.ticketInfoContainer}`}
            >
              <div
                className={`${styles.gameGlossaryMenuContainer} ${styles.gameGlossaryMenuContainerForTicket}`}
              >
                <TicketFilter
                  transformedGameId={transformedGameId}
                  address={address}
                  gameTicketContract={gameTicketContract}
                  gameLeaderboardContract={gameLeaderboardContract}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.gameGlossarySideBlock}>
          <Inventory />
        </div>
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

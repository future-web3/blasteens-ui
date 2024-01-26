import { useParams } from "react-router-dom";
import styles from "./GameView.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import events from "../../constants/events";

import { gameGlossaryConfigs } from "../../configs/gameGlossaryConfig";
import Phaser from "phaser";
import { getABI, getContractAddress } from "../../helpers/network";
import { checkTicket } from "../../helpers/ticket";
import { emitter } from "../../utils/emitter";
import { useDispatch, useSelector } from "react-redux";
import { gameTicketActions } from "../../store/modules/gameTicketSlice";

let game = null;

function GameView() {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const netId = chain ? chain.id : 1;

  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.gameTicket.tickets);
  const showTicketWindow = useSelector(
    (state) => state.gameTicket.showTicketWindow,
  );

  // const [showTicketWindow, setShowTicketWindow] = useState(false);

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
    console.log(">>>>>>>>>game", game);

    game = new Phaser.Game(targetGame.config);

    return () => {
      game.destroy(true);
      game = null;
    };
  }, [isConnected, address, targetGame]);

  useEffect(() => {
    if (!game || !address || !gameTicketContract) return;

    console.log(game);
    const checkTicketHandler = async () => {
      const data = await checkTicket(gameTicketContract, address);
      console.log(">>>>>>>>>data", data);
      dispatch(gameTicketActions.setTickets(data));
      // setShowTicketWindow(true);
      dispatch(gameTicketActions.setShowTicketWindow(true));
    };

    emitter.on(events.CHECK_TICKET, checkTicketHandler);

    return () => {
      emitter.off(events.CHECK_TICKET);
    };
  }, [game, address, dispatch, gameTicketContract]);

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
        {showTicketWindow && isConnected && (
          <div className={styles.filter}>
            <div className={styles.ticketInfoContainer}>
              <h3>Your current tickets</h3>
              <div>Bronze: {tickets[0]?.amount}</div>
              <div>Sliver: {tickets[1]?.amount}</div>
              <div>Gold: {tickets[2]?.amount}</div>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.web3TicketButton} onClick={() => {}}>
                Buy Ticket
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.web3TicketButton} onClick={() => {}}>
                Redeem Ticket
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

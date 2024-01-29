import styles from "./TicketFilter.module.scss";
import gameViewStyles from "../GameView.module.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { writeContract } from "@wagmi/core";
import { useWaitForTransaction, useWalletClient } from "wagmi";
import BN from "bignumber.js";
import { gameTicketActions } from "../../../store/modules/gameTicketSlice";
import { checkTicket } from "../../../helpers/ticket";
import { RotatingLines } from "react-loader-spinner";
import { emitter } from "../../../utils/emitter";
import events from "../../../constants/events";
import { gameLeaderboardActions } from "../../../store/modules/gameLeaderboardSlice";

function TicketFilter({
  transformedGameId,
  address,
  gameTicketContract,
  gameLeaderboardContract,
}) {
  const [isBuying, setIsBuying] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncPendingHash, setSyncPendingHash] = useState("");
  const [livesRedeemed, setLivesRedeemed] = useState(0);
  const [buyingPendingHash, setBuyingPendingHash] = useState("");
  const [redeemingPendingHash, setRedeemingPendingHash] = useState("");

  const { data: walletClientData } = useWalletClient();

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.gameTicket.tickets);
  const score = useSelector(
    (state) => state.gameLeaderboard[transformedGameId].score,
  );
  const allowSync = useSelector(
    (state) => state.gameLeaderboard[transformedGameId].allowSync,
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      buyTicketType: 1,
      ticketAmount: 0,
      redeemTicketType: 1,
    },
  });

  useWaitForTransaction({
    hash: buyingPendingHash,
    enabled: !!buyingPendingHash,
    onSuccess: async (data) => {
      if (data.status === "success") {
        setBuyingPendingHash("");
        console.log(">>>>>>>>>Buying success");
        const updatedTickets = await checkTicket(gameTicketContract, address);
        dispatch(gameTicketActions.setTickets(updatedTickets));
      }
      setIsBuying(false);
    },
    onError() {
      setBuyingPendingHash("");
      setIsBuying(false);
    },
  });

  const handleBuyTicket = async (data) => {
    setIsBuying(true);
    const args = [Number(data.buyTicketType), Number(data.ticketAmount)];
    const totalPrice =
      (Number(data.buyTicketType) * Number(data.ticketAmount)) / 10;

    try {
      const txReceiptForBuying = await writeContract({
        ...gameTicketContract,
        account: walletClientData.account.address,
        args,
        functionName: "buyTicket",
        value: new BN(totalPrice.toString()).multipliedBy(
          new BN(10).pow(new BN(18)),
        ),
      });
      console.log(txReceiptForBuying);
      setBuyingPendingHash(txReceiptForBuying.hash);
    } catch (error) {
      console.log(error);
      setIsBuying(false);
    }
  };

  useWaitForTransaction({
    hash: redeemingPendingHash,
    enabled: !!redeemingPendingHash,
    onSuccess: async (data) => {
      if (data.status === "success") {
        setRedeemingPendingHash("");
        const updatedTickets = await checkTicket(gameTicketContract, address);
        dispatch(gameTicketActions.setTickets(updatedTickets));
        dispatch(
          gameTicketActions.setNumberOfLives({
            gameName: transformedGameId,
            numberOfLives: livesRedeemed,
          }),
        );
        dispatch(gameTicketActions.setShowTicketWindow(false));
        console.log(">>>>>>>>>Redeeming success");
      }
      setIsRedeeming(false);
      setLivesRedeemed(0);
    },
    onError() {
      setRedeemingPendingHash("");
      setIsRedeeming(false);
      setLivesRedeemed(0);
    },
  });

  const handleRedeemTicket = async (data) => {
    setIsRedeeming(true);
    console.log(data);
    const args = [Number(data.redeemTicketType)];
    const targetTicket = tickets.find(
      (ticket) => ticket.type.toString() === data.redeemTicketType.toString(),
    );
    setLivesRedeemed(Number(targetTicket.numberOfLives));

    try {
      const txReceiptForRedeeming = await writeContract({
        ...gameTicketContract,
        account: walletClientData.account.address,
        args,
        functionName: "redeemTicket",
      });
      console.log(txReceiptForRedeeming);
      setRedeemingPendingHash(txReceiptForRedeeming.hash);
    } catch (error) {
      console.log(error);
      setIsRedeeming(false);
      setLivesRedeemed(0);
    }
  };

  useWaitForTransaction({
    hash: syncPendingHash,
    enabled: !!syncPendingHash,
    onSuccess: async (data) => {
      if (data.status === "success") {
        setSyncPendingHash("");
        console.log(">>>>>>>>>Sync success");
      }
      setIsSyncing(false);
      dispatch(
        gameLeaderboardActions.toggleSyncPermission({
          gameName: transformedGameId,
          allowSync: false,
        }),
      );
      emitter.emit(events.SYNC_FINISH);
    },
    onError() {
      setSyncPendingHash("");
      setIsSyncing(false);
      dispatch(
        gameLeaderboardActions.toggleSyncPermission({
          gameName: transformedGameId,
          allowSync: false,
        }),
      );
      console.log(">>>>>>>>>Sync finish,but your score is too low");
      emitter.emit(events.SYNC_FINISH);
    },
  });

  const handleSyncScore = async () => {
    setIsSyncing(true);
    const args = [address, score];

    try {
      const txReceiptForSyncing = await writeContract({
        ...gameLeaderboardContract,
        account: walletClientData.account.address,
        args,
        functionName: "addScore",
      });
      console.log(txReceiptForSyncing);
      setSyncPendingHash(txReceiptForSyncing.hash);
    } catch (error) {
      console.log(error);
      setIsSyncing(false);
    }
  };

  return (
    <div>
      {allowSync ? (
        <div className={styles.buttonContainer}>
          <button
            className={
              (gameViewStyles.gameGlossaryWeb3Button,
              gameViewStyles.btn,
              gameViewStyles.drawBorder)
            }
            onClick={handleSubmit(handleSyncScore)}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <RotatingLines strokeColor="#eff0f2" height="20" width="20" />
            ) : (
              "Sync"
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className={styles.formOuterContainer}>
            <div className={styles.formContainer}>
              <select
                className={styles.selection}
                {...register("buyTicketType")}
              >
                <option value={1}>Bronze</option>
                <option value={2}>Sliver</option>
                <option value={3}>Gold</option>
              </select>
              <input
                className={styles.numberInput}
                placeholder="fill in number of tickets"
                {...register("ticketAmount")}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={
                (gameViewStyles.gameGlossaryWeb3Button,
                gameViewStyles.btn,
                gameViewStyles.drawBorder)
              }
              onClick={handleSubmit(handleBuyTicket)}
              disabled={isBuying}
            >
              {isBuying ? (
                <RotatingLines strokeColor="#eff0f2" height="20" width="20" />
              ) : (
                "Buy Ticket"
              )}
            </button>
          </div>
          <div className={styles.formOuterContainer}>
            <div className={styles.formContainer}>
              <select
                className={styles.redeemSelection}
                {...register("redeemTicketType")}
              >
                <option value={1}>Bronze</option>
                <option value={2}>Sliver</option>
                <option value={3}>Gold</option>
              </select>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={
                (gameViewStyles.gameGlossaryWeb3Button,
                gameViewStyles.btn,
                gameViewStyles.drawBorder)
              }
              onClick={handleSubmit(handleRedeemTicket)}
              disabled={isRedeeming}
            >
              {isRedeeming ? (
                <RotatingLines strokeColor="#eff0f2" height="20" width="20" />
              ) : (
                "Redeem Ticket"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketFilter;

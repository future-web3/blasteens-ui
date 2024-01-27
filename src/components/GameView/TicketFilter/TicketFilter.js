import styles from "./TicketFilter.module.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { writeContract } from "@wagmi/core";
import { useWaitForTransaction, useWalletClient } from "wagmi";
import BN from "bignumber.js";
import { gameTicketActions } from "../../../store/modules/gameTicketSlice";
import { checkTicket } from "../../../helpers/ticket";

function TicketFilter({ address, gameTicketContract }) {
  const [isBuying, setIsBuying] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [livesRedeemed, setLivesRedeemed] = useState(0);
  const [buyingPendingHash, setBuyingPendingHash] = useState("");
  const [redeemingPendingHash, setRedeemingPendingHash] = useState("");

  const { data: walletClientData } = useWalletClient();

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.gameTicket.tickets);

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
    const totalPrice = Number(data.buyTicketType) * Number(data.ticketAmount);

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
        dispatch(gameTicketActions.setNumberOfLives(livesRedeemed));
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

  return (
    <div className={styles.filter}>
      <div className={styles.ticketInfoContainer}>
        <h3>Your current tickets</h3>
        <div>Bronze: {tickets[0]?.amount}</div>
        <div>Sliver: {tickets[1]?.amount}</div>
        <div>Gold: {tickets[2]?.amount}</div>
      </div>
      <div className={styles.formOuterContainer}>
        <div className={styles.formContainer}>
          <select className={styles.selection} {...register("buyTicketType")}>
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
          className={styles.web3TicketButton}
          onClick={handleSubmit(handleBuyTicket)}
        >
          Buy Ticket
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
          className={styles.web3TicketButton}
          onClick={handleSubmit(handleRedeemTicket)}
        >
          Redeem Ticket
        </button>
      </div>
    </div>
  );
}

export default TicketFilter;

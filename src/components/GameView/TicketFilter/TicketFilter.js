import styles from "./TicketFilter.module.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { writeContract } from "@wagmi/core";
import { useWalletClient } from "wagmi";
import BN from "bignumber.js";

function TicketFilter({ address, gameTicketContract }) {
  const { data: walletClientData } = useWalletClient();
  const tickets = useSelector((state) => state.gameTicket.tickets);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      buyTicketType: 1,
      ticketAmount: 0,
      redeemTicketType: 1,
    },
  });

  const handleBuyTicket = async (data) => {
    const args = [Number(data.buyTicketType), Number(data.ticketAmount)];
    const totalPrice = Number(data.buyTicketType) * Number(data.ticketAmount);
    try {
      const txReceipt = await writeContract({
        ...gameTicketContract,
        account: walletClientData.account.address,
        args,
        functionName: "buyTicket",
        value: new BN(totalPrice.toString()).multipliedBy(
          new BN(10).pow(new BN(18)),
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedeemTicket = async (data) => {};

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

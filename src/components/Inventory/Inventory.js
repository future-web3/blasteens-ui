import styles from "./Inventory.module.scss";
import React from "react";
import { useGameSelector } from "blast-game-sdk";
import { useAccount } from "wagmi";

function NFT({ name, addressLink, imageURL, amount }) {
  return (
    <div className={styles.nftContainer}>
      <div className={styles.nftInner} style={{ flex: 1 }}>
        <h3>
          <a href={addressLink} target="_blank" rel="noopener noreferrer">
            {name} * {amount ?? 0}
          </a>
        </h3>
      </div>
      <div className={styles.nftInner} style={{ flex: 3 }}>
        <img src={imageURL} alt={name} />
      </div>
      <hr />
    </div>
  );
}

function Inventory() {
  const { isConnected } = useAccount();

  const tickets = useGameSelector((state) => state.gameTicket.tickets);

  const nfts = [
    {
      name: "BRONZE",
      addressLink: "https://example.com/nft1",
      imageURL: "/images/ticket-bronze.png",
      type: 1,
    },
    {
      name: "SILVER",
      addressLink: "https://example.com/nft2",
      imageURL: "/images/ticket-silver.png",
      type: 2,
    },
    {
      name: "GOLD",
      addressLink: "https://example.com/nft3",
      imageURL: "/images/ticket-gold.png",
      type: 3,
    },
  ];

  const updatedTickets = tickets.map((ticket) => {
    const nftInfo = nfts.find((nft) => nft.type === ticket.type);
    return {
      ...ticket,
      ...nftInfo,
    };
  });

  return (
    <div className={styles.inventoryContainer}>
      <h2 className={styles.stickyHeader}>Inventory</h2>
      {isConnected ? (
        <>
          {updatedTickets.map((nft, index) => (
            <NFT key={index} {...nft} />
          ))}
        </>
      ) : (
        <>
          {nfts.map((nft, index) => (
            <NFT key={index} {...nft} />
          ))}
        </>
      )}
    </div>
  );
}

export default Inventory;

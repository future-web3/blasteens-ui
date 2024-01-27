import styles from "./Inventory.module.scss";
import React, { useEffect, useState } from "react";

function NFT({ name, addressLink, imageURL }) {
  console.log(imageURL);
  return (
    <div className={styles.nftContainer}>
      <div className={styles.nftInner} style={{ flex: 1 }}>
        <h3>
          <a href={addressLink} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h3>
      </div>
      <div className={styles.nftInner} style={{ flex: 3 }}>
        <img src={require(`${imageURL}`)} alt={name} />
      </div>
      <hr />
    </div>
  );
}

function Inventory() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    setNfts([
      {
        name: "NFT1",
        addressLink: "https://example.com/nft1",
        imageURL: "./demo1.png",
      },
      {
        name: "NFT2",
        addressLink: "https://example.com/nft2",
        imageURL: "./demo2.png",
      },
      {
        name: "NFT3",
        addressLink: "https://example.com/nft3",
        imageURL: "./demo3.png",
      },
      {
        name: "NFT4",
        addressLink: "https://example.com/nft4",
        imageURL: "./demo4.png",
      },
    ]);
  }, []);

  return (
    <div className={styles.inventoryContainer}>
      <h2 className={styles.stickyHeader}>Inventory</h2>
      {nfts.map((nft, index) => (
        <NFT key={index} {...nft} />
      ))}
    </div>
  );
}

export default Inventory;

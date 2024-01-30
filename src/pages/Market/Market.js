import React from "react";
import styles from "./Market.module.scss";

const userOwnNft = [
  { image: "/images/nft6.jpeg", button: "Sell" },
  { image: "/images/nft6.jpeg", button: "Sell" },
  { image: "/images/nft6.jpeg", button: "Sell" },
];

const nftStore = [
  { image: "/images/nft2.jpeg", button: "Buy" },
  { image: "/images/nft3.jpeg", button: "Buy" },
  { image: "/images/nft4.jpeg", button: "Buy" },
  { image: "/images/nft3.jpeg", button: "Buy" },
  { image: "/images/nft2.jpeg", button: "Buy" },
  { image: "/images/nft4.jpeg", button: "Buy" },
  { image: "/images/nft6.jpeg", button: "Buy" },
];

const BuyButton = () => {
  return <button className={styles.buyButton}>Buy</button>;
};

const SellButton = () => {
  return <button className={styles.sellButton}>Sell</button>;
};

const NftCard = ({ imgURL, buttonAction }) => {
  return (
    <div
      className={styles.NftCard}
      style={
        buttonAction === "Buy"
          ? { border: "5px solid green" }
          : { border: "5px solid red" }
      }
    >
      <img src={`${imgURL}`} alt="nft" className={styles.image} />
      <div className={styles.infoSection}>
        <div className={styles.p}>0.01B</div>
        {buttonAction === "Buy" ? <BuyButton /> : <SellButton />}
      </div>
    </div>
  );
};

const Market = () => {
  return (
    <div className={styles.outerLayer}>
      <div className={styles.grid}>
        <section className={styles.leftSection}>
          <div className={styles.assetSection}>
            <h3 className={styles.h3}>Your Wallet</h3>
            <h2 className={styles.h2}>$ 126.345 blast</h2>
            <p className={styles.p}>10.34%</p>
          </div>
          <div className={styles.filterSection}>filter</div>
        </section>
        <section className={styles.rightSection}>
          <div className={styles.NftsContainer}>
            {userOwnNft.map((nft, index) => (
              <NftCard
                imgURL={nft.image}
                key={index}
                buttonAction={nft.button}
              />
            ))}
          </div>
          <div>
            <div
              className={styles.NftsContainer}
              style={{ borderBottom: "none" }}
            >
              {nftStore.map((nft, index) => (
                <NftCard
                  imgURL={nft.image}
                  key={index}
                  buttonAction={nft.button}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Market;

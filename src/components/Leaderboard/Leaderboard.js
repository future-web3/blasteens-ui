import styles from "./Leaderboard.module.scss";
import React from "react";

function Individual({ rank, points, addressLink, address }) {
  return (
    <div className={styles.individualContainer}>
      <div className={styles.individualInner} style={{ flex: 1 }}>
        #{rank}
      </div>
      <div className={styles.individualInner} style={{ flex: 2 }}>
        {points} pt
      </div>
      <div className={styles.individualInner} style={{ flex: 3 }}>
        <a href={addressLink} target="_blank" rel="noopener noreferrer">
          {address}
        </a>
      </div>
    </div>
  );
}

function Leaderboard() {
  const individuals = Array.from({ length: 30 }, (_, index) => ({
    rank: index + 1,
    points: 1982 + index * 100,
    transactionLink: `https://etherscan.io/tx/0x${index.toString(16)}`,
    address: `#0xA2d...Azxc`,
  }));

  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.stickyHeader}>Leaderboard</h2>
      {individuals.map((individual, index) => (
        <Individual key={index} {...individual} />
      ))}
    </div>
  );
}

export default Leaderboard;

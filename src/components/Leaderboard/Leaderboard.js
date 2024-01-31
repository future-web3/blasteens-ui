import styles from "./Leaderboard.module.scss";
import React, { useEffect, useState } from "react";
import { checkScore } from "../../helpers/contracts";
import { formatHash } from "../../helpers/network";
import { useGameSelector } from "blast-game-sdk";

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
          {formatHash(address)}
        </a>
      </div>
    </div>
  );
}

function Leaderboard({ gameLeaderboardContract, transformedGameId }) {
  const [individuals, setIndividuals] = useState([]);
  const allowSync =
    useGameSelector(
      (state) => state.gameLeaderboard[transformedGameId]?.allowSync,
    ) || false;

  useEffect(() => {
    const checkScoreHandler = async () => {
      const data = await checkScore(gameLeaderboardContract, transformedGameId);
      setIndividuals(data);
    };

    checkScoreHandler();
  }, [gameLeaderboardContract, allowSync, transformedGameId]);

  return (
    <div className={styles.leaderboardContainer}>
      <div className={styles.stickyHeader}>
        <h2>Leaderboard</h2>
        <div className={styles.prizeInfoContainer}>
          <div>
            <p className={styles.infoText}>Prize Pool: 10.2345 blast</p>
            <p className={styles.infoText}>Count Down: 01:23:08</p>
          </div>
          <button className={styles.claimBtn}>Claim</button>
        </div>
      </div>
      {individuals?.map((individual, index) => (
        <Individual key={index} {...individual} />
      ))}
    </div>
  );
}

export default Leaderboard;

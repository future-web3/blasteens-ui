import styles from "./Leaderboard.module.scss";
import React, { useEffect, useState } from "react";
import { checkScore } from "../../helpers/contracts";
import { formatHash } from "../../helpers/network";
import { useGameSelector } from "phaser-simple-game-sdk";

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

function Leaderboard({ address, gameLeaderboardContract, transformedGameId }) {
  const [individuals, setIndividuals] = useState([]);
  const allowSync =
    useGameSelector(
      (state) => state.gameLeaderboard[transformedGameId]?.allowSync,
    ) || false;

  useEffect(() => {
    const checkScoreHandler = async () => {
      if (!address || !gameLeaderboardContract) return;
      const data = await checkScore(gameLeaderboardContract, transformedGameId);
      setIndividuals(data);
    };

    checkScoreHandler();
  }, [address, gameLeaderboardContract, allowSync]);

  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.stickyHeader}>Leaderboard</h2>
      {individuals?.map((individual, index) => (
        <Individual key={index} {...individual} />
      ))}
    </div>
  );
}

export default Leaderboard;

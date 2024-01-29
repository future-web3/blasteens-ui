import React from "react";
import styles from "./GameCard.module.scss";
import { gameConfigs } from "../../configs/gameConfig";

function GameCard({ gameId }) {
  const logoUrl = `/assets/games/${gameConfigs[gameId]["key"]}/logo.png`;
  console.log(logoUrl);
  return (
    <div className={styles.gameCardContainer}>
      <h3>{gameConfigs[gameId]["name"]}</h3>
      <div className={styles.gameCardDescription}>
        {gameConfigs[gameId]["description"]}
      </div>
      <div className={styles.gameCardLogo}>
        <img src={logoUrl} alt="LOGO" />
      </div>
      <div className={styles.gameCardButton}>
        <button>PLAY</button>
      </div>
    </div>
  );
}

export default GameCard;

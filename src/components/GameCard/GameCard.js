import React from "react";
import styles from "./GameCard.module.scss";
import { gameConfigs } from "../../configs/gameConfig";
import gameViewStyles from "../../pages/Arcade/Arcade.module.scss";

function GameCard({ gameId }) {
  const logoUrl = `/assets/games/${gameConfigs[gameId]["key"]}/logo.png`;

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
        <button
          className={
            (gameViewStyles.gameGlossaryWeb3Button,
              gameViewStyles.btn,
              gameViewStyles.drawBorder)
          }
        >
          PLAY
        </button>
      </div>
    </div>
  );
}

export default GameCard;
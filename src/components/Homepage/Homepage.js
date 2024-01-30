import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.scss";
import { gameListConfigs } from "../../configs/gameListConfig";
import GameCard from "../GameCard/GameCard";


function Homepage() {
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.homepageTitle}>
        <h1 className={styles.text}>
          <Link to="/about">ArcadeXplore</Link>
        </h1>
      </div>
      <div className={styles.homepageMain}>
        <div className={styles.homepageBackground}>
          <div className={styles.homepageGames}>
            <div className={styles.homepageSection}>
              <h1>Indie Games</h1>
              <div className={styles.homepageCards}>
                {gameListConfigs["gameGlossary"].map((gameId) => (
                  <GameCard gameId={gameId} />
                ))}
              </div>
            </div>
            <div className={styles.homepageSection}>
              <h1>Game Glossary</h1>
              <div className={styles.homepageCards}>
                {gameListConfigs["gameGlossary"].map((gameId) => (
                  <GameCard gameId={gameId} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

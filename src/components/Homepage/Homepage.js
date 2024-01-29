import React from "react";
import styles from "./Homepage.module.scss";
import { gameListConfigs } from "../../configs/gameListConfig";
import { gameCard } from "../GameCard/GameCard";

function Homepage() {
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.homepageTitle}>ArcadeXplode</div>
      <div className={styles.homepageGames}>
        <div className={styles.homepageSection}>
          <h1>Indie Games</h1>
        </div>
        <div className={styles.homepageSection}>
          <h1>Game Glossary</h1>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

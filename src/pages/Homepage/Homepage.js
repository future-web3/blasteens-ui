import React from 'react'
import styles from './Homepage.module.scss'
import { gameListConfigs } from '../../configs/gameListConfig'
import GameCard from '../../components/GameCard/GameCard'
import { useGameSelector } from 'blast-game-sdk'
import { useHighScore } from '../../hooks/useHighScore'

function Homepage() {
  const games = useGameSelector(state => state.gameTicket.games)
  const { highestScoresByGame } = useHighScore()

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.homepageSection}>
        <div className={styles.textEffectWrapper}>
          <h1 className={styles.text}>Arcade</h1>
        </div>
        <hr />
        <div className={styles.homepageCards}>
          {gameListConfigs['arcade'].map(id => (
            <GameCard gameId={id} key={id} games={games} highestScoresByGame={highestScoresByGame} />
          ))}
        </div>
      </div>
      <div className={styles.homepageSection}>
        <div className={styles.textEffectWrapper}>
          <h1 className={styles.text}>Indie Games</h1>
        </div>
        <hr />
        <div className={styles.homepageCards}>
          {gameListConfigs['indieGame'].map(id => (
            <GameCard gameId={id} key={id} games={games} highestScoresByGame={highestScoresByGame} />
          ))}
        </div>
      </div>
      <div className={styles.homepageSection}>
        <div className={styles.textEffectWrapper}>
          <h1 className={styles.text}>AAA Games</h1>
        </div>
        <hr />
        <div className={styles.homepageCards}>
          {gameListConfigs['aaaGame'].map(id => (
            <GameCard gameId={id} key={id} games={games} highestScoresByGame={highestScoresByGame} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage

import React from 'react'
import styles from './Homepage.module.scss'
import { gameListConfigs } from '../../configs/gameListConfig'
import GameCard from '../../components/GameCard/GameCard'

function Homepage() {
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.homepageSection}>
        <h1>Arcade</h1>
        <hr />
        <div className={styles.homepageCards}>
          {gameListConfigs['arcade'].map(id => (
            <GameCard gameId={id} key={id} />
          ))}
        </div>
      </div>
      <div className={styles.homepageSection}>
        <h1>Indie Games</h1>
        <hr />
        <div className={styles.homepageCards}>
          {' '}
          {gameListConfigs['indieGame'].map(id => (
            <GameCard gameId={id} key={id} />
          ))}
        </div>
      </div>
      <div className={styles.homepageSection}>
        <h1>AAA Games</h1>
        <hr />
        <div className={styles.homepageCards}>
          {gameListConfigs['aaaGame'].map(id => (
            <GameCard gameId={id} key={id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage

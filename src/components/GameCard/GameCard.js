import React from 'react'
import styles from './GameCard.module.scss'
import { Link } from 'react-router-dom'
import { gameConfigs } from '../../configs/gameConfig'

function GameCard({ gameId }) {
  const logoUrl = `/assets/games/${gameConfigs[gameId]['key']}/logo.png`

  return (
    <div className={styles.gameCardBox}>
      <div className={styles.gameCardContainer}>
        <h2>{gameConfigs[gameId]['name']}</h2>
        <div className={styles.gameCardButtonBox}>
          {gameConfigs[gameId]?.ready ? (
            <Link to={gameConfigs[gameId]?.url} className={styles.gameCardButton}>
              PLAY
            </Link>
          ) : (
            <span className={styles.gameCardButtonDisable}>Coming soon!</span>
          )}
        </div>
        <div className={styles.gameCardLogo}>
          <img src={logoUrl} alt='LOGO' />
          <div className={styles.gameCardDescription}>{gameConfigs[gameId]['description']}</div>
        </div>
        <div className={styles.gameCardDetail}>
          <p>
            <span className={styles.gameCardRow}>
              <span style={{ fontWeight: 'bold' }}>Prize Pool</span>
              <span>$2000</span>
            </span>
            <span className={styles.gameCardRow}>
              <span style={{ fontWeight: 'bold' }}>Highest Score</span>
              <span>923pt</span>
            </span>
            <span className={styles.gameCardRow}>
              <span style={{ fontWeight: 'bold' }}>Remaining Time</span>
              <span>01:23:12</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default GameCard

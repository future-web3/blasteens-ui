import React from 'react'
import styles from './GameCard.module.scss'
import { Link } from 'react-router-dom'
import { gameConfigs } from '../../configs/gameConfig'
import gameViewStyles from '../../pages/Arcade/Arcade.module.scss'

function GameCard({ gameId }) {
  const logoUrl = `/assets/games/${gameConfigs[gameId]['key']}/logo.png`

  return (
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
      </div>
      <div className={styles.gameCardDescription}>{gameConfigs[gameId]['description']}</div>
    </div>
  )
}

export default GameCard

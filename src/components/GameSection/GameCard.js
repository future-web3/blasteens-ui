import React from 'react'
import styles from './GameCard.module.scss'

function GameCard({src, name, description}) {
  return (
    <div className={styles.gameCard}>
      <div className={styles.gameCardImage}>
        <img src={src} alt={name} />
      </div>
      <div className={styles.gameCardInfo}>
        <h2>{name}</h2>
        <p>{description}</p>
        <button>Play Now</button>
      </div>
    </div>
  )
}

export default GameCard
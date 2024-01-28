import React from 'react'
import styles from './GameSection.module.scss'
import GameCard from './GameCard'
import config from '../../configs/webContentConfig.json'


function GameSection() {
  const {gameSection} = config
  return (
    <div className = {styles.gameSection}>
      <div className = {styles.title}> Feature Game</div>
      <div className={styles.games}>
        {gameSection.map((item, index) => (
            <GameCard key={index} src = {item.src} name = {item.name} description={item.description}/>
        ))}
      </div>
    </div>
  )
}

export default GameSection
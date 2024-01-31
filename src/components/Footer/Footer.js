import React from 'react'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.pictures}>
        <div className={styles.logo}>fasgasgsa</div>
        <div className={styles.icons}></div>
      </div>
      <div className={styles.rightFooter}>
        <img></img>
        <div className={styles.textContainer}>
          <div className={styles.text}></div>
          <img></img>
        </div>
      </div> 
    </div>
  )
}


export default Footer
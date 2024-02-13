import React from 'react'
import styles from './Footer.module.scss'
import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.pictures}>
        <div className={styles.logo}> <img src='/images/scorpion-studio-transparent.png' alt='blasteen logo' className={styles.logoImg} /></div>
        <div className={styles.icons}>
          <a href='https://twitter.com/blasteens' target='_blank' rel="noreferrer">
            <BsTwitterX className={styles.icon} />
          </a>
          <a href='https://github.com/future-web3/blasteens-ui' target='_blank' rel="noreferrer">
            <FaGithub className={styles.icon} />
          </a>
        </div>
      </div>
      <div className={styles.rightFooter}>
        <div className={styles.textContainer}>
          <img src='/images/blast-logo-yellow.png' alt='blast logo' className={styles.intextPicture}></img>
          <div className={styles.text}>Blast is the only Ethereum L2 with native yield for ETH and stablecoins.</div>
        </div>
        <div className={styles.logo}><img src='/images/PowerByBlast.png' alt='power by blast' className={styles.logoImg} /></div>
      </div>
    </div>
  )
}


export default Footer

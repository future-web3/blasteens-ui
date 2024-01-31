import React from "react";
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { FaWallet } from 'react-icons/fa'
import { useAccount, useConnect } from 'wagmi'

const NavItems = ({ className }) => {
  const { connect, connectors } = useConnect()
  const { isConnected } = useAccount()

  const handleConnectWallet = async () => {
    try {
      if (!isConnected) {
        connect({ connector: connectors[0] })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ul className={`${styles.linkDetailsWapper} ${className}`}>
      <li className={styles.linkInfoWrapper}>
        <Link to='/'>Game</Link>
      </li>
      <li className={styles.linkInfoWrapper}>
        <Link to='/market'>Market</Link>
      </li>
      <li className={styles.linkInfoWrapper}>
        <Link to='/prize'>Prize</Link>
      </li>
      <li className={styles.linkInfoWrapper}>
        <a href='https://www.google.com'>Doc</a>
      </li>
      <li className={styles.linkInfoWrapper}>
        <Link to='/about'>About Us</Link>
      </li>
      <li>
        {isConnected ? (
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} src='/images/nft6.jpeg' alt="avatar" />
          </div>
        ) : (
          <div
            onClick={() => {
              handleConnectWallet()
            }}
          >
            <FaWallet className={styles.walletIconContainer} />
          </div>
        )}
      </li>
    </ul>
  )
}

export default NavItems

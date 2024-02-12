import React from "react";
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { FaWallet } from 'react-icons/fa'
import { useAccount, useConnect } from 'wagmi'
import { useMediaQuery } from 'react-responsive'

const NavItems = ({ className }) => {
  const { connect, connectors } = useConnect()
  const { isConnected } = useAccount()

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1280px)' })

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
        <Link to='/arcade/escape-from-germs'>Games</Link>
      </li>
      <li className={styles.linkInfoWrapper}>
        <Link to='/market'>Market</Link>
      </li>
      <li className={styles.linkInfoWrapper}>
        <Link to='/lotto'>Lotto</Link>
      </li>
      <li className={styles.linkInfoWrapper}>
        <Link to='/about'>About Us</Link>
      </li>
      <li className={styles.linkInfoWrapper}>
        <a href='https://www.google.com' target="_blank" rel="noreferrer">Docs</a>
      </li>
      {!isTabletOrMobile && <li>
        {isConnected ? (
          <Link className={styles.avatarContainer} to="/profile">
            <img className={styles.avatar} src='/images/nft6.jpeg' alt="avatar" />
          </Link>
        ) : (
          <div
            onClick={() => {
              handleConnectWallet()
            }}
          >
            <FaWallet className={styles.walletIconContainer} />
          </div>
        )}
      </li>}
    </ul>
  )
}

export default NavItems

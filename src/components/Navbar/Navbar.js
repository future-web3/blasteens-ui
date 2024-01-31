import { Outlet, Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { FaWallet } from 'react-icons/fa'
import React from 'react'
import { useAccount, useConnect } from 'wagmi'

function Navbar() {
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
    <div className={styles.navBarContainer}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/arcade/escape-from-germs'>Germs</Link>
        </li>
        <li>
          <Link to='/arcade/tommy-jumping'>Tom</Link>
        </li>
        <li>
          <Link to='/arcade/snowman-defender'>Snowman</Link>
        </li>
        <li>
          <Link to='/arcade/emoji-match'>Emoji</Link>
        </li>
        <li>
          {isConnected ? (
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src='/images/nft6.jpeg' alt="avatar" />
            </div>
          ) : (
            <div
              className={styles.walletIconContainer}
              onClick={() => {
                handleConnectWallet()
              }}
            >
              <FaWallet />
            </div>
          )}
        </li>
      </ul>

      <Outlet />
    </div>
  )
}

export default Navbar

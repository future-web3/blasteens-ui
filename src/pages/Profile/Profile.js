import React from "react";
import styles from './Profile.module.scss'
import { useAccount, useConnect } from "wagmi";

const Profile = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()

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
    <div className={styles.profileContainer}>
      {address ? <div>This is user profile</div> : <button className={styles.connectBtn} onClick={handleConnectWallet}>Connect Button</button>}
    </div>
  )
}

export default Profile



import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useNetwork } from 'wagmi'
import styles from './Layout.module.scss'
import { useSwitchNetwork } from 'wagmi'
import { useAccount } from 'wagmi'

function Frame() {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { isConnected } = useAccount()

  const Comp = () => {
    if (isConnected && chain?.id !== 168_587_773) {
      return <div className={styles.noSupportedNetworkContainer}>
        <button className={styles.switchBtn} onClick={() => switchNetwork?.(168_587_773)}>Switch Network</button>
      </div>
    } else {
      return <Outlet />
    }
  }

  return (
    <div>
      <NavBar />
      <Comp />
      <Footer />
    </div>
  )
}

export default Frame

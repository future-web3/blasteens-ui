import { useParams } from 'react-router-dom'
import styles from './Arcade.module.scss'
import React, { useEffect, useMemo } from 'react'
import { useAccount, useConnect, useNetwork } from 'wagmi'

import { gameConfigs } from '../../configs/gameConfig'
import Phaser from 'phaser'
import { getABI, getContractAddress } from '../../helpers/network'
import { checkTicket } from '../../helpers/contracts'
import { useGameSelector, useGameDispatch, gameTicketActions, gameLeaderboardActions } from 'blast-game-sdk'
import TicketFilter from '../../components/TicketFilter/TicketFilter'
import Leaderboard from '../../components/Leaderboard/Leaderboard'
import Inventory from '../../components/Inventory/Inventory'
import { transformId } from '../../helpers/utils'
import { useMediaQuery } from 'react-responsive'

let game = null

function Arcade() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const netId = chain ? chain.id : 168587773
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1280px)' })

  const { gameId } = useParams()

  const transformedGameId = transformId(gameId)

  const dispatch = useGameDispatch()

  const games = useGameSelector(state => state.gameTicket.games)

  if (!games[transformedGameId] && gameConfigs[transformedGameId]) {
    dispatch(gameTicketActions.addGame(transformedGameId))
    dispatch(gameLeaderboardActions.addGame(transformedGameId))
  }

  const numberOfLives = useGameSelector(state => state.gameTicket.games[transformedGameId]?.numberOfLives || 0)
  const showTicketWindow = useGameSelector(state => state.gameTicket.showTicketWindow)

  const targetGame = gameConfigs[transformedGameId]

  const gameTicketContract = useMemo(() => {
    const address = getContractAddress('TICKET', netId)
    const abi = getABI('TICKET')
    if (!address || !abi) {
      return null
    }
    return {
      address,
      abi
    }
  }, [netId])

  const gameLeaderboardContract = useMemo(() => {
    const address = getContractAddress('BOARD', netId)
    const abi = getABI('BOARD')
    if (!address || !abi) {
      return null
    }
    return {
      address,
      abi
    }
  }, [netId])

  const forwarderContract = useMemo(() => {
    const address = getContractAddress('FORWARDER', netId)
    const abi = getABI('FORWARDER')
    if (!address || !abi) {
      return null
    }
    return {
      address,
      abi
    }
  }, [netId])

  const gameContract = useMemo(() => {
    const address = getContractAddress('GAME', netId)
    const abi = getABI('GAME')
    if (!address || !abi) {
      return null
    }
    return {
      address,
      abi
    }
  }, [netId])

  useEffect(() => {
    if (!isConnected || !targetGame || isTabletOrMobile) {
      if (game) {
        game.destroy(true)
        game = null
      }
      return
    }
    if (!address) return
    if (game) return

    game = new Phaser.Game(targetGame.config)

    return () => {
      game.destroy(true)
      game = null
    }
  }, [isConnected, address, targetGame, isTabletOrMobile])

  useEffect(() => {
    const checkTicketHandler = async () => {
      if (!address || !gameTicketContract) return
      const data = await checkTicket(gameTicketContract, address)
      console.log('>>>>>>>>>ticketData', data)
      dispatch(gameTicketActions.setTickets(data))
      if (numberOfLives <= 0) {
        dispatch(gameTicketActions.setShowTicketWindow(true))
      }
    }
    checkTicketHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, gameTicketContract, numberOfLives])

  const handleConnectWallet = async () => {
    try {
      if (!isConnected) {
        connect({ connector: connectors[0] })
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!targetGame) {
    return <div>The game url in invalid</div>
  }

  return (
    <div className={styles.arcadeContainer}>
      <header className={styles.arcadeHeader}>
        <h1>{targetGame.name}</h1>
        <p>Remaining chance {numberOfLives}</p>
        <hr />
      </header>
      {!isTabletOrMobile ? (
        <div className={styles.arcadeContent}>
          <div className={styles.arcadeSideBlock}>
            <Leaderboard gameLeaderboardContract={gameLeaderboardContract} transformedGameId={transformedGameId} />
          </div>
          <div className={styles.arcadeFrameContainer} style={{ backgroundImage: `url('/images/arcade-frame.png')` }}>
            <div className={styles.arcadeGameContainer}>
              {isConnected ? (
                <div id='gameDisplay' />
              ) : (
                <div
                  className={styles.arcadeFilter}
                  style={{
                    backgroundImage: `url('/assets/games/${targetGame.key}/background.png')`
                  }}
                >
                  <div className={styles.arcadeMenuContainer}>
                    {!isTabletOrMobile ? (
                      <button className={(styles.arcadeWeb3Button, styles.btn, styles.drawBorder)} onClick={handleConnectWallet}>
                        Connect Your Wallet
                      </button>
                    ) : (
                      <div className={(styles.btn, styles.drawBorder)}>Desktop Only</div>
                    )}
                  </div>
                </div>
              )}
              {showTicketWindow && isConnected && (
                <div className={`${styles.arcadeFilter} ${styles.ticketInfoContainer}`}>
                  <div className={`${styles.arcadeMenuContainer} ${styles.arcadeMenuContainerForTicket}`}>
                    <TicketFilter
                      transformedGameId={transformedGameId}
                      address={address}
                      gameTicketContract={gameTicketContract}
                      gameLeaderboardContract={gameLeaderboardContract}
                      forwarderContract={forwarderContract}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.arcadeSideBlock}>
            <Inventory />
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div className={styles.arcadeFrameContainer} style={{ backgroundImage: `url('/images/arcade-frame.png')` }}>
            <div className={styles.arcadeGameContainer}>
              <div
                className={styles.arcadeFilter}
                style={{
                  backgroundImage: `url('/assets/games/${targetGame.key}/background.png')`
                }}
              >
                <div className={styles.arcadeMenuContainer}>
                  <div className={(styles.btn, styles.drawBorder)}>Desktop Only</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mobileInfoContainer}>
            <div className={styles.arcadeSideBlock}>
              <Leaderboard gameLeaderboardContract={gameLeaderboardContract} transformedGameId={transformedGameId} />
            </div>
            <div className={styles.arcadeSideBlock}>
              <Inventory />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Arcade

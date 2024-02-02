import styles from './Leaderboard.module.scss'
import React, { useEffect, useState } from 'react'
import { checkScore } from '../../helpers/contracts'
import { formatHash, formatTimeToMilliseconds } from '../../helpers/utils'
import { useGameSelector } from 'blast-game-sdk'
import Countdown from 'react-countdown'
import { writeContract } from '@wagmi/core'
import { useAccount, useWaitForTransaction } from 'wagmi'

function Individual({ rank, points, addressLink, address }) {
  return (
    <div className={styles.individualContainer}>
      <div className={styles.individualInner} style={{ flex: 1 }}>
        #{rank}
      </div>
      <div className={styles.individualInner} style={{ flex: 2 }}>
        {points} pt
      </div>
      <div className={styles.individualInner} style={{ flex: 3 }}>
        <a href={addressLink} target='_blank' rel='noopener noreferrer'>
          {formatHash(address, 4)}
        </a>
      </div>
    </div>
  )
}

function Leaderboard({ gameContract, transformedGameId }) {
  const { address } = useAccount()
  const [individuals, setIndividuals] = useState([])
  const allowSync = useGameSelector(state => state.gameLeaderboard[transformedGameId]?.allowSync) || false
  const round = useGameSelector(state => state.gameLeaderboard[transformedGameId]?.round) || null
  const gameStatus = useGameSelector(state => state.gameLeaderboard[transformedGameId]?.gameStatus) || null
  const [isLoading, setIsLoading] = useState(false)
  const [pendingHash, setPendingHash] = useState('')

  useEffect(() => {
    if (!gameContract) return
    const leaderboardHandler = async () => {
      const data = await checkScore(gameContract, transformedGameId)
      setIndividuals(data)
    }
    leaderboardHandler()
  }, [gameContract, allowSync, transformedGameId])

  useWaitForTransaction({
    hash: pendingHash,
    enabled: !!pendingHash,
    onSuccess: async data => {
      if (data.status === 'success') {
        setPendingHash('')
        console.log('>>>>>>>>>Redeeming success')
      }
      setIsLoading(false)
    },
    onError() {
      setPendingHash('')
      setIsLoading(false)
    }
  })

  const handleClaimReward = async () => {
    if (!address) return
    try {
      setIsLoading(true)
      const txReceiptForClaiming = await writeContract({
        ...gameContract,
        account: address,
        functionName: 'claimReward'
      })
      console.log(txReceiptForClaiming)
      setPendingHash(txReceiptForClaiming.hash)
    } catch (error) {
      console.error('handleClaimReward error', error.message)
      setIsLoading(false)
    }
  }

  const countdownRender = ({ days, hours, minutes, seconds }) => {
    return (
      <p className={styles.infoText}>
        {days} D : {hours} H : {minutes} M : {seconds} S
      </p>
    )
  }

  return (
    <div className={styles.leaderboardContainer}>
      <div className={styles.stickyHeader}>
        <h2>Leaderboard #{round ? round.gameRound : 0}</h2>
        <div className={styles.prizeInfoContainer}>
          <div style={{ minWidth: '250px' }}>
            <p className={styles.infoText}>Prize Pool: 10.2345 blast</p>
            {round && gameStatus && (
              <span className={styles.countdownSection}>
                <p className={styles.infoText}>{gameStatus.isGameRunning ? 'Game' : 'Claim'} Remaining:</p>
                <Countdown date={formatTimeToMilliseconds(gameStatus.isGameRunning ? round.gameEndTime : round.claimEndTime)} renderer={countdownRender} />
              </span>
            )}
          </div>
          {gameStatus && gameStatus.isClaiming && address && (
            <button className={styles.claimBtn} onClick={handleClaimReward}>
              Claim
            </button>
          )}
        </div>
      </div>
      {individuals?.map((individual, index) => (
        <Individual key={index} {...individual} />
      ))}
    </div>
  )
}

export default Leaderboard

import React, { useEffect, useMemo } from 'react'
import styles from './GameCard.module.scss'
import { Link } from 'react-router-dom'
import { gameConfigs } from '../../configs/gameConfig'
import { getABI, getContractAddress } from '../../helpers/network'
import { getCurrentGameInfo } from '../../helpers/contracts'
import { gameLeaderboardActions, gameTicketActions, useGameDispatch, useGameSelector } from 'blast-game-sdk'
import { useBalance } from 'wagmi'
import Countdown from 'react-countdown'
import { formatTimeToMilliseconds } from '../../helpers/utils'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function GameCard({ gameId, games, highestScoresByGame, isLoading, loaded }) {
  const logoUrl = `/assets/games/${gameConfigs[gameId]['key']}/logo.png`
  const dispatch = useGameDispatch()
  const round = useGameSelector(state => state.gameLeaderboard[gameId]?.round) || null
  const gameStatus = useGameSelector(state => state.gameLeaderboard[gameId]?.gameStatus) || null

  const gameContract = useMemo(() => {
    const address = getContractAddress('GAME', 168587773, gameId)
    const abi = getABI('GAME')
    if (!address || !abi) {
      return null
    }
    return {
      address,
      abi
    }
  }, [gameId])

  const score = highestScoresByGame?.[gameId] || 0

  const { data: poolPrize } = useBalance({ address: gameContract?.address })

  useEffect(() => {
    if (!gameContract) return

    const fetchGameInfo = async () => {
      const { round, gameStatus } = await getCurrentGameInfo(gameContract)

      if (!games[gameId] && gameConfigs[gameId]) {
        dispatch(gameTicketActions.initGame(gameId))
        dispatch(gameLeaderboardActions.initGame({ gameName: gameId, round, gameStatus }))
      }
    }

    fetchGameInfo()
  }, [gameContract])

  const countdownRender = ({ days, hours, minutes, seconds }) => {
    return (
      <span className={styles.infoText}>
        {days} D : {hours} H : {minutes} M : {seconds} S
      </span>
    )
  }

  return (
    <div className={styles.gameCardBox}>
      <div className={styles.gameCardContainer}>
        <h2>{gameConfigs[gameId]['name']}</h2>
        <div className={styles.gameCardButtonBox}>
          {gameConfigs[gameId]?.ready ? (
            <Link to={gameConfigs[gameId]?.url} className={styles.gameCardButton}>
              PLAY
            </Link>
          ) : (
            <span className={styles.gameCardButtonDisable}>Coming soon!</span>
          )}
        </div>
        <div className={styles.gameCardLogo}>
          <img src={logoUrl} alt='LOGO' />
          <div className={styles.gameCardDescription}>{gameConfigs[gameId]['description']}</div>
        </div>
        {isLoading && !loaded && (!round || !gameStatus) ? (
          <div className={styles.gameCardDetail}>
            <div style={{ padding: '3px', width: '100%' }}>
              <SkeletonTheme baseColor={'#191919'} highlightColor={'#7d7a92'}>
                <Skeleton count={3} className={styles.skeletonLoading} />
              </SkeletonTheme>
            </div>
          </div>
        ) : (
          <div className={styles.gameCardDetail}>
            <p>
              <span className={styles.gameCardRow}>
                <span style={{ fontWeight: 'bold' }}>Prize Pool</span>
                <span>{poolPrize ? poolPrize.formatted : 0} ETH</span>
              </span>
              <span className={styles.gameCardRow}>
                <span style={{ fontWeight: 'bold' }}>Highest Score</span>
                <span>{score}pt</span>
              </span>
              <span className={styles.gameCardRow}>
                {round && gameStatus && (
                  <>
                    <span style={{ fontWeight: 'bold' }}>Remaining Time</span>
                    <span>
                      <Countdown
                        date={formatTimeToMilliseconds(gameStatus.isGameRunning ? round.gameEndTime : round.claimEndTime)}
                        renderer={countdownRender}
                      />
                    </span>
                  </>
                )}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameCard

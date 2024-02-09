import { generateRandomHex32, keccak256Hash, formatHash, formatTokenAmount, numberFormat } from '../../helpers/utils'
import { useEffect, useMemo, useState } from 'react'
import { getABI, getContractAddress } from '../../helpers/network'
import { writeContract } from '@wagmi/core'
import { useAccount, useWaitForTransaction, useBalance, useContractEvent } from 'wagmi'
import BN from 'bignumber.js'
import { PYTH_BASE_URL } from '../../configs'
import { getSequenceNumberByUser } from '../../helpers/contracts'
import axios from 'axios'
import styles from './Lotto.module.scss'
import { getWinners } from '../../services/graph'
import { useRefresh } from '../../context/Refresh/hooks'
import { RotatingLines } from 'react-loader-spinner'

function Lotto() {
  const [randomnessPendingHash, setRandomnessPendingHash] = useState('')
  const [revealPendingHash, setRevealPendingHash] = useState('')
  const [userRandomNumber, setUserRandomNumber] = useState('0')
  const [lastWinner, setLastWinner] = useState(null)
  const [lastestWinner, setLastestWinner] = useState(null)
  const [shouldGetSequenceNumber, setShouldGetSequenceNumber] = useState(false)
  const [shouldGetRandomNumber, setShouldGetRandomNumber] = useState(false)
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()
  const { slowRefresh } = useRefresh()

  const lottoContract = useMemo(() => {
    const address = getContractAddress('LOTTO', 168587773)
    const abi = getABI('LOTTO')
    if (!address || !abi) {
      return null
    }
    return {
      address,
      abi
    }
  }, [])

  const { data: lottoPrize } = useBalance({ address: lottoContract?.address, watch: true })

  useEffect(() => {
    const fetchLastWinner = async () => {
      try {
        const winners = await getWinners()
        if (winners.length > 0) setLastWinner({
          winner: winners[0].winner,
          amount: winners[0].amount
        })
      } catch (error) {
        console.error("fetchLastWinner error", error.message)
      }
    }
    fetchLastWinner()
  }, [slowRefresh])

  useContractEvent({
    address: lottoContract.address,
    abi: lottoContract.abi,
    enabled: !!lottoContract && shouldGetRandomNumber,
    eventName: 'Winner',
    listener(log) {
      const event = log
      const args = event[0].args
      setLastestWinner(args)
      setLoading(false)
      setShouldGetRandomNumber(false)
    },
  })

  useEffect(() => {
    if (lastestWinner) {
      const boxTimer = setTimeout(() => {
        setLastestWinner(null);
      }, 5000);

      return () => clearTimeout(boxTimer);
    }
  }, [lastestWinner]);

  useWaitForTransaction({
    hash: revealPendingHash,
    enabled: !!revealPendingHash,
    onSuccess: async data => {
      if (data.status === 'success') {
        setRevealPendingHash('')
        setShouldGetRandomNumber(true)
        console.log('>>>>>>>>>generating success')
      }
    },
    onError() {
      setRevealPendingHash('')
      setLoading(false)
    }
  })

  useEffect(() => {
    if (!shouldGetSequenceNumber) return

    const fetchSequenceNumber = async () => {
      try {
        const sequenceNumber = await getSequenceNumberByUser(lottoContract, address)
        const res = await axios.get(`${PYTH_BASE_URL}/${sequenceNumber}`)
        const providerRandomNumber = `0x${res.data.value.data}`

        const getTxReceipt = await writeContract({
          ...lottoContract,
          account: address,
          functionName: 'revealResult',
          args: [sequenceNumber, userRandomNumber, providerRandomNumber]
        })

        setRevealPendingHash(getTxReceipt.hash)
      } catch (error) {
        console.error(error)
        setLoading(false)
      } finally {
        setShouldGetSequenceNumber(false)
      }
    }

    fetchSequenceNumber()
  }, [address, lottoContract, shouldGetSequenceNumber, userRandomNumber])

  useWaitForTransaction({
    hash: randomnessPendingHash,
    enabled: !!randomnessPendingHash,
    onSuccess: async data => {
      if (data.status === 'success') {
        setRandomnessPendingHash('')
        setShouldGetSequenceNumber(true)
        console.log('>>>>>>>>>Requesting success')
      }
    },
    onError() {
      setRandomnessPendingHash('')
      setLoading(false)
    }
  })

  const handleOnclick = async () => {
    setLoading(true)
    const generatedRandomNumber = generateRandomHex32()
    setUserRandomNumber(generatedRandomNumber)
    const commitment = keccak256Hash(generatedRandomNumber)
    console.log('>>>>>>>generatedRandomNumber', generatedRandomNumber)
    console.log('>>>>>>>commitment', commitment)

    try {
      const requestTxReceipt = await writeContract({
        ...lottoContract,
        account: address,
        functionName: 'requestRandomness',
        args: [commitment],
        value: new BN('0.001').multipliedBy(new BN(10).pow(new BN(18)))
      })

      setRandomnessPendingHash(requestTxReceipt.hash)
      console.log('>>>>>>>generatedRandomNumber', generatedRandomNumber)
      console.log('>>>>>>>commitment', commitment)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className={styles.drawBox}>
      <div className={styles.prizeInfoSection}>
        <h2>Participants: 100</h2>
        <h2>Lotto Prize: {numberFormat(lottoPrize?.formatted, '0.000')} ETH</h2>
        {lastWinner && <h2>Last Winner: {formatHash(lastWinner.winner, 3)} - {numberFormat(formatTokenAmount(lastWinner.amount), '0,0.000')} ETH</h2>}
      </div>
      <div className={styles.bgLight} />
      <div className={`${lastestWinner ? styles.boxOpen : styles.closeBox} ${loading ? styles.picShake : ''}`}>
        <div className={`${styles.boxMsg} ${!lastestWinner ? styles.hide : ''}`}>
          {lastestWinner && (
            <div className={styles.winning}>
              <h3 className={styles.boxMsgTitle}>Congratulations!</h3>
              <div className={styles.boxMsgCongent}>{formatHash(lastWinner.winner, 3)} won {numberFormat(formatTokenAmount(lastestWinner.amount.toString()), '0,0.000')} ETH</div>
            </div>
          )}
        </div>
      </div>
      <button className={styles.drawBtn} onClick={handleOnclick} disabled={loading || Number(lottoPrize?.formatted) < 0.1}>{loading ? <RotatingLines strokeColor='#eff0f2' height='20' width='20' /> : 'Draw Rewards'}</button>
    </div>
  )
}

export default Lotto

import { generateRandomHex32, keccak256Hash } from '../../helpers/utils'
import { useEffect, useMemo, useState } from 'react'
import { getABI, getContractAddress } from '../../helpers/network'
import { writeContract } from '@wagmi/core'
import { useAccount, useWaitForTransaction } from 'wagmi'
import BN from 'bignumber.js'
import { PYTH_BASE_URL } from '../../configs'
import { getRandomNumber, getSequenceNumberByUser } from '../../helpers/contracts'
import axios from 'axios'
import styles from './Lotto.module.scss'

function Lotto() {
  const [requestPendingHash, setRequestPendingHash] = useState('')
  const [getPendingHash, setGetPendingHash] = useState('')
  const [userRandomNumber, setUserRandomNumber] = useState('0')
  const [isWinning, setIsWinning] = useState(false)
  const [finalRandomNumber, setFinalRandomNumber] = useState(null)
  const [shouldGetSequenceNumber, setShouldGetSequenceNumber] = useState(false)
  const [shouldGetRandomNumber, setShouldGetRandomNumber] = useState(false)
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()

  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const openBox = () => {
    setIsBoxOpen(false)
    const val = Math.ceil(Math.random() * 2);

    setTimeout(() => {
      setIsBoxOpen(true);
      setIsWinner(val === 1);
    }, 1200);
  };

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

  useEffect(() => {
    if (!shouldGetRandomNumber) return
    const fetchRandomness = async () => {
      try {
        const data = await getRandomNumber(lottoContract, address)
        const number = data.split(',')[0]
        const winning = data.split(',')[1]
        setFinalRandomNumber(number)
        setIsWinning(winning === 'true')
        console.log(data)
      } catch (error) {
        console.error(error)
      } finally {
        setShouldGetRandomNumber(false)
        setLoading(false)
      }
    }

    fetchRandomness()
  }, [shouldGetRandomNumber, address, lottoContract])

  useWaitForTransaction({
    hash: getPendingHash,
    enabled: !!getPendingHash,
    onSuccess: async data => {
      if (data.status === 'success') {
        setGetPendingHash('')
        setShouldGetRandomNumber(true)
        console.log('>>>>>>>>>generating success')
      }
    },
    onError() {
      setGetPendingHash('')
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

        setGetPendingHash(getTxReceipt.hash)
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
    hash: requestPendingHash,
    enabled: !!requestPendingHash,
    onSuccess: async data => {
      if (data.status === 'success') {
        setRequestPendingHash('')
        setShouldGetSequenceNumber(true)
        console.log('>>>>>>>>>Requesting success')
      }
    },
    onError() {
      setRequestPendingHash('')
      setLoading(false)
    }
  })

  const handleOnclick = async () => {
    setIsWinning(false)
    const generatedRandomNumber = generateRandomHex32()
    setUserRandomNumber(generatedRandomNumber)
    const commitment = keccak256Hash(generatedRandomNumber)
    console.log('>>>>>>>generatedRandomNumber', generatedRandomNumber)
    console.log('>>>>>>>commitment', commitment)

    try {
      setLoading(true)
      const requestTxReceipt = await writeContract({
        ...lottoContract,
        account: address,
        functionName: 'requestRandomness',
        args: [commitment],
        value: new BN('0.000001').multipliedBy(new BN(10).pow(new BN(18)))
      })

      setRequestPendingHash(requestTxReceipt.hash)

      console.log('>>>>>>>generatedRandomNumber', generatedRandomNumber)
      console.log('>>>>>>>commitment', commitment)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          handleOnclick()
        }}
      >
        Random
      </button>
      <div className={styles.drawBox}>
        <div className={styles.bgLight} />
        <div className={`${isBoxOpen ? styles.boxOpen : styles.closeBox}`}>
          <div className={`${styles.boxMsg} ${!isBoxOpen ? styles.hide : ''}`}>
            {isBoxOpen && isWinner && (
              <div className={styles.winning}>
                <h3 className={styles.boxMsgTitle}>中奖啦！</h3>
                <div className={styles.boxMsgCongent}>恭喜您获得*****1个,请到我的预约里查看并支付尾款!</div>
                <div className={styles.boxMsgOperat}>
                  <button type="button" className={styles.btnBlue}>
                    查看我的预约
                  </button>
                </div>
              </div>
            )}

            {!isWinner && isBoxOpen && (
              <div className={styles.notWon}>
                <div className={styles.boxMsgContent}>很遗憾您未抽中预约名额，请明天再来</div>
                <div className={styles.boxMsgTip}>温馨提示：活动期间，每日都有一次抽奖机会</div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.promptOperation} onClick={openBox}>Click to draw rewards</div>
      </div>
    </div >
  )
}

export default Lotto

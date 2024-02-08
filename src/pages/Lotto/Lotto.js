import { generateRandomHex32, keccak256Hash } from '../../helpers/utils'
import { useEffect, useMemo, useState } from 'react'
import { getABI, getContractAddress } from '../../helpers/network'
import { writeContract } from '@wagmi/core'
import { useAccount, useWaitForTransaction } from 'wagmi'
import BN from 'bignumber.js'
import { getRandomNumber, getSequenceNumberByUser } from '../../helpers/contracts'
import axios from 'axios'

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
  }, [shouldGetRandomNumber])

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
        //TODO:network name
        const res = await axios.get(`https://fortuna-staging.pyth.network/v1/chains/blast-testnet/revelations/${sequenceNumber}`)
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
  }, [address, lottoContract, shouldGetSequenceNumber])

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
      <div class='draw-box'>
        <div class='bg-light'></div>

        <div class='close-box'>
          <div class='box-msg hide'>
            <div class='winning hide'>
              <h3 class='box-msg-title'>中奖啦！</h3>
              <div class='box-msg-congent'>恭喜您获得*****1个，请到我的预约里查看并支付尾款！</div>
              <div class='box-msg-operat'>
                <button type='button' class='btn-blue'>
                  查看我的预约
                </button>
              </div>
            </div>

            <div class='notWon hide'>
              <div class='box-msg-congent'>很遗憾您未抽中预约名额，请明天再来</div>
              <div class='box-msg-tip'>温馨提示：活动期间，每日都有一次抽奖机会</div>
            </div>
          </div>
        </div>

        <div class='prompt-operation'>Click to draw rewards</div>
      </div>
    </div>
  )
}

export default Lotto

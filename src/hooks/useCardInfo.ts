import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { getZodiacContract, getZodiacLandContract } from '../zodiac/utils'
import useZodiac from './useZodiac'
import useBlock from './useBlock'
import { Contract } from 'web3-eth-contract'
import { Card, CardExt } from '../types/Card'
import BigNumber from 'bignumber.js/bignumber'

export function useCardInfo(id: number | null) {
  const { account } = useWallet()
  const zodiac = useZodiac()
  const zodiacContract = getZodiacContract(zodiac)
  const block = useBlock()
  const [card, setCard] = useState<null | Card>(null)

  const fetchCardDetails = useCallback(async () => {
    if (account && zodiacContract && id) {
      const cardInfo = await getCardInfo(zodiacContract, account, id)
      setCard(cardInfo)
    }
  }, [account, block, id, zodiacContract])

  useEffect(() => {
    if (account) {
      fetchCardDetails()
    }
  }, [account, block, zodiacContract])

  return card
}

const getCardInfo = async (zodiacContract: Contract, account: string, id: number) => {
  try {
    const cardInfo = await zodiacContract.methods.zodiacInfo(id).call()
    return {
      zgIndex: cardInfo.zgIndex,
      breedCount: cardInfo.zgBreedCount,
      breedCoolDown: cardInfo.breedCoolDownAt,
      inStaking: cardInfo.inStaking,
      owner: cardInfo.owner,
      zgLevel: cardInfo.zgLevel,
      tokenId: `${id}`,
    }
  } catch (e) {
    console.error(e)
  }
  return null
}

export function useCardExtInfo(id: number | null) {
  const { account } = useWallet()
  const zodiac = useZodiac()
  const zodiacLandContract = getZodiacLandContract(zodiac)
  const block = useBlock()
  const [cardExt, setCardExt] = useState<null | CardExt>(null)

  const fetchCardDetails = useCallback(async () => {
    if (account && zodiacLandContract && id) {
      const cardExtInfo = await getCardExtInfo(zodiacLandContract, account, id)
      setCardExt(cardExtInfo)
    }
  }, [account, block, id, zodiacLandContract])

  useEffect(() => {
    if (account) {
      fetchCardDetails()
    }
  }, [account, block, zodiacLandContract])

  return cardExt
}

const getCardExtInfo = async (zodiacContract: Contract, account: string, id: number) => {
  try {
    const cardInfo = await zodiacContract.methods.getCurrentPointByTokenId(account, id).call()
    return {
      currentPoint: cardInfo.currentPoint,
      power: cardInfo.power,
      level: cardInfo.level,
    }
  } catch (e) {
    console.error(e)
  }
  return null
}

export function useHashPower() {
  const { account } = useWallet()
  const zodiac = useZodiac()
  const zodiacLandContract = getZodiacLandContract(zodiac)
  const block = useBlock()
  const [hashPower, setHashPower] = useState<null | string>(null)

  const fetchCardDetails = useCallback(async () => {
    if (account && zodiacLandContract) {
      const udpPerDay = await getUdpPerDay(zodiacLandContract, account)
      if (udpPerDay) {
        const day = new BigNumber(new Date().getTime())
          .dividedBy(1000)
          .dividedBy(24 * 60 * 60)
          .toFixed(0, 0)
        setHashPower(new BigNumber(udpPerDay).dividedBy(new BigNumber(10).pow(18)).dividedBy(day).toFixed(2))
      }
    }
  }, [account, block, zodiacLandContract])

  useEffect(() => {
    if (account) {
      fetchCardDetails()
    }
  }, [account, block, zodiacLandContract])

  return hashPower
}

const getUdpPerDay = async (zodiacContract: Contract, account: string) => {
  try {
    const udpPerDay = await zodiacContract.methods.udpPerDay().call()
    return udpPerDay
  } catch (e) {
    console.error(e)
  }
  return null
}

import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { getZodiacContract } from '../zodiac/utils'
import useZodiac from './useZodiac'
import useBlock from './useBlock'
import { Contract } from 'web3-eth-contract'
import { Card } from '../types/Card'

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

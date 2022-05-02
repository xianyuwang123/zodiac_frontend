import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getZodiacContract } from '../zodiac/utils'
import useZodiac from './useZodiac'

export function useBuyCard() {
  const { account } = useWallet()
  const zodiac = useZodiac()

  const handleBuyCard = useCallback(async () => {
    if (!account) return false
    try {
      const tx = await openMysteryBox(getZodiacContract(zodiac), account)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, zodiac])

  return { onBuyCard: handleBuyCard }
}

const openMysteryBox = async (zodiacContract: any, account: string) => {
  return zodiacContract.methods.openMysteryBox().send({ from: account })
}

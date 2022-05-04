import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getZodiacContract } from '../zodiac/utils'
import useZodiac from './useZodiac'
import { BEST_ESTIMATED_GAS, calculateGasMargin } from '../zodiac/utils'

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
  let gas = BEST_ESTIMATED_GAS
  try {
    gas = await zodiacContract.methods.openMysteryBox().estimateGas({ from: account })
  } catch (error) {
    console.log(error)
    throw error
  }

  return zodiacContract.methods
    .openMysteryBox()
    .send({ from: account, gas: calculateGasMargin(gas) })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx?.transactionHash
    })
}

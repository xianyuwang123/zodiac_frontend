import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getZodiacContract } from '../zodiac/utils'
import useZodiac from './useZodiac'
import { BEST_ESTIMATED_GAS, calculateGasMargin } from '../zodiac/utils'

export function useBreed() {
  const { account } = useWallet()
  const zodiac = useZodiac()

  const handleBreed = useCallback(
    async (firstId, lastId) => {
      if (!account || !firstId || !lastId) return false
      try {
        const tx = await breed(getZodiacContract(zodiac), account, firstId, lastId)
        return tx
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [account, zodiac]
  )

  return { onBreed: handleBreed }
}

const breed = async (zodiacContract: any, account: string, firstId: string, lastId: string) => {
  let gas = BEST_ESTIMATED_GAS
  try {
    gas = await zodiacContract.methods.breed(firstId, lastId).estimateGas({ from: account })
  } catch (error) {
    console.log(error)
    throw error
  }

  return zodiacContract.methods
    .breed(firstId, lastId)
    .send({ from: account, gas: calculateGasMargin(gas)})
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx?.transactionHash
    })
}

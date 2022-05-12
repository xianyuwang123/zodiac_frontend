import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getZodiacLandContract } from '../zodiac/utils'
import { Contract } from 'web3-eth-contract'
import useZodiac from './useZodiac'

export const useHarvest = () => {
  const { account } = useWallet()
  const zodiac = useZodiac()
  const landContract = getZodiacLandContract(zodiac)

  const handleHarvest = useCallback(async () => {
    if (account && landContract) {
      try {
        const txHash = await harvest(landContract, account)
        console.log(txHash)
      } catch (error) {
        console.log(error)
      }
    }
  }, [landContract, account])

  return { onHarvest: handleHarvest }
}

const harvest = async (landContract: Contract, account: string) => {
  return landContract.methods
    .harvest()
    .send({ from: account })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx.transactionHash
    })
}

import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getZodiacLandContract } from '../zodiac/utils'
import { Contract } from 'web3-eth-contract'
import useZodiac from './useZodiac'

export const useStake = () => {
  const { account } = useWallet()
  const zodiac = useZodiac()
  const landContract = getZodiacLandContract(zodiac)

  const handleStake = useCallback(
    async (tokenId: string) => {
      if (account && landContract && tokenId) {
        try {
          const txHash = await stake(landContract, tokenId, account)
          return txHash
        } catch (error) {
          console.log(error)
        }
      }
    },
    [landContract, account]
  )

  return { onStake: handleStake }
}

const stake = async (landContract: Contract, tokenId: string, account: string) => {
  return landContract.methods
    .stake(tokenId)
    .send({ from: account })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx.transactionHash
    })
}

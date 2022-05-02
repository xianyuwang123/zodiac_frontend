import { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'

import { getWalletChain } from '../utils/formatWallet'

/**
 * NOT WORKING since the chainId is set on UseWalletProvider
 */
const useNetowrk = () => {
  const [correct, setCorrect] = useState(true)
  const { chainId, networkName }: { chainId: number | null; networkName: string } = useWallet()
  const { chainId: targetChainId, chainName: targetNetworkName } = getWalletChain()

  const wallet = useWallet()
  console.info(wallet)

  useEffect(() => {
    setCorrect(chainId === targetChainId)
  }, [chainId, targetChainId])

  return { correct, chainId, targetChainId, networkName, targetNetworkName }
}

export default useNetowrk

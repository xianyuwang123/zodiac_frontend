import { useState, useEffect } from 'react'
//import { useWeb3React } from '@web3-react/core'
import { useWallet } from 'use-wallet'
import { getWalletChain, persistChainIdIfNeeded, supportedChainId } from '../utils/formatWallet'
import useAuth from './useAuth'
import { getConnectorName } from '../utils/walletProvider'
import { Connectors } from 'use-wallet'

const useInactiveListener = (suppress = false) => {
  const [currentChainId, setCurrentChainId] = useState<number | undefined>()
  //const { active, error, activate } = useWeb3React()
  const { error } = useWallet()
  const { login } = useAuth()
  const currentChain = getWalletChain()

  useEffect((): any => {
    const { ethereum } = window as any
    if (ethereum && ethereum.on /* && !active && !error */ && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)

        if (chainId) {
          const chainIdNum = Number(chainId)
          setCurrentChainId(chainIdNum)
          persistChainIdIfNeeded(chainIdNum)
          //reloading the page
          if (currentChain.chainId === chainIdNum && supportedChainId(chainIdNum)) {
            const connectorName = getConnectorName()
            if (connectorName) {
              const connetorId = connectorName as keyof Connectors
              login(connetorId)
            }
          } else {
            window.location.reload()
          }
        }
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          //dump
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [error, suppress])

  return {
    walletChainId: currentChainId,
  }
}

export default useInactiveListener

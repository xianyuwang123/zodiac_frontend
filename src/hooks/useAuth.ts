import { useCallback, useEffect } from 'react'
import {
  setupChainNetwork,
  getConnectorName,
  rememberConnetor,
  forgetConnector,
  ChainNetwork,
  isTokenPocketWallet,
  setupTokenPocketEthereumNetwork,
  clearUpWalletConnect,
} from '../utils/walletProvider'
import { useWallet, ChainUnsupportedError, Connectors } from 'use-wallet'
import { CHAIN_NETWORKS } from '../utils/constant'
import { getWalletChainId, persistChainIdIfNeeded, isEthMainnet } from '../utils/formatWallet'

interface AuthOperations {
  loginCallback?: () => void
  loginErrorCallback?: () => void
  logoutCallback?: () => void
}
export default function useAuth(operations?: AuthOperations): {
  login: (connectorId: keyof Connectors | undefined) => void
  logout: () => void
} {
  const { status, error, connect, reset, connector } = useWallet()

  const getChainNetwrok = (chainId: number): ChainNetwork | undefined => {
    return CHAIN_NETWORKS[chainId]
  }

  useEffect(() => {
    if (!error) return

    console.info(`login to ${connector} error.`, error)

    if (error instanceof ChainUnsupportedError) {
      const chainId = getWalletChainId()
      console.info(`chainId = ${chainId}`)
      const chainNetwork = getChainNetwrok(chainId)

      chainNetwork &&
        setupChainNetwork(chainNetwork).then((hasSetup) => {
          if (hasSetup) {
            login(connector) // a little janky...can't use setError because the connector isn't set
            rememberConnetor(connector)
            persistChainIdIfNeeded(chainId)
            !!operations && !!operations.loginCallback && operations.loginCallback()
          }
        })
      if (!chainNetwork && isEthMainnet(chainId)) {
        // try to switch to ethereum
        isTokenPocketWallet() &&
          setupTokenPocketEthereumNetwork().then((hasSetup) => {
            if (hasSetup) {
              login(connector) // a little janky...can't use setError because the connector isn't set
              rememberConnetor(connector)
              persistChainIdIfNeeded(chainId)
              !!operations && !!operations.loginCallback && operations.loginCallback()
            }
          })
      }
    } else {
      //forgetConnector()
      !!operations && !!operations.loginErrorCallback && operations.loginErrorCallback()
    }
  }, [error])

  useEffect(() => {
    console.info(`useWallet status: ${status}`)
    if (status === 'connected') {
      console.info(`login to ${connector} successfully.`)
      rememberConnetor(connector)
    }
  }, [status])

  const login = useCallback(async (connectorId: keyof Connectors | undefined) => {
    const connectorName = getConnectorName()
    const fallbackConnetorId = connectorName as keyof Connectors

    //console.info(`useWallet try to login: ${connectorId}, and the fallback connector = ${fallbackConnetorId}`)

    const safetyConnectorId = connectorId ?? fallbackConnetorId
    if (safetyConnectorId) {
      await connect(safetyConnectorId)
      rememberConnetor(safetyConnectorId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = useCallback(() => {
    console.info(`useWallet try to logout`)

    reset()
    forgetConnector()

    // remove Walletconnect anyway
    clearUpWalletConnect()

    !!operations && !!operations.logoutCallback && operations.logoutCallback()
    // eslint-disable-next-line react-hooks/exhaustive-deps

    window.location.reload()
  }, [])

  return { login, logout }
}

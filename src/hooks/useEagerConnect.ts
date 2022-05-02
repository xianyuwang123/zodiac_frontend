import { useEffect } from 'react'
import useAuth from './useAuth'
import useMetaMaskMobile from './useMetaMaskMobile'
import { getConnectorName, isWalletConnectEnabled } from '../utils/walletProvider'
import { Connectors, useWallet } from 'use-wallet'

export default function useEagerConnect(): void {
  const { login } = useAuth()

  const { account }: { account: string | null } = useWallet()
  const isMetaMaskMobile = useMetaMaskMobile()

  useEffect(() => {
    const connectorName = getConnectorName()
    if (!account) {
      const walletConnectEnabled = isWalletConnectEnabled()
      if (walletConnectEnabled) return

      // disable walletconnect for MetaMask to avoid auto connect issue
      if (!!connectorName && !(connectorName === 'walletconnect' && isMetaMaskMobile)) {
        const connetorId = connectorName as keyof Connectors
        login(connetorId)
      } else if (isMetaMaskMobile) {
        // handle mobile inject
        // login('injected' as keyof Connectors)
      } else {
        console.warn('windown.ethereum is not ready...')
      }
    }
  }, [account, login, isMetaMaskMobile])
}

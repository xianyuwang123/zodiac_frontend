import { useEffect, useState } from 'react'

import useMobile from './useMobile'
import { isMetaMask } from '../utils/walletProvider'

import detectEthereumProvider from '@metamask/detect-provider'

const useMetaMaskMobile = (): boolean => {
  const [isMetaMaskState, setMetaMaskState] = useState(false)
  const isMobile = useMobile()
  const { ethereum } = window

  const detectEthereum = async () => {
    await detectEthereumProvider()
  }

  useEffect(() => {
    detectEthereum()

    setMetaMaskState(isMobile && isMetaMask())
  }, [isMobile, ethereum])

  return isMetaMaskState
}

export default useMetaMaskMobile

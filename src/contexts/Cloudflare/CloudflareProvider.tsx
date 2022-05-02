import React, { createContext, useEffect, useState } from 'react'

import { CloudflareWeb3Api } from '../../providers/cloudflare'
import { getWalletChainId } from '../../utils/formatWallet'

export interface CloudflareContext {
  cloudflare?: typeof CloudflareWeb3Api
}

export const Context = createContext<CloudflareContext>({
  cloudflare: undefined,
})

const CloudflareProvider: React.FC = ({ children }) => {
  const [cloudflare, setCloudflare] = useState<any>()

  window.cloudflare = cloudflare

  useEffect(() => {
    const chainId = getWalletChainId()
    const cloudflareLib = new CloudflareWeb3Api(chainId, {
      defaultConfirmations: 1,
      autoGasMultiplier: 1.5,
      testing: false,
      defaultGas: '6000000',
      defaultGasPrice: '1000000000000',
      accounts: [],
      ethereumNodeTimeout: 10000,
    })
    setCloudflare(cloudflareLib)
  }, [])

  return <Context.Provider value={{ cloudflare }}>{children}</Context.Provider>
}

export default CloudflareProvider

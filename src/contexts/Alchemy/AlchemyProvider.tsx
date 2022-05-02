import React, { createContext, useEffect, useState } from 'react'

import { AlchemyWeb3Api } from '../../providers/alchemy'
import { getWalletChainId } from '../../utils/formatWallet'

export interface AlchemyContext {
  alchemy?: typeof AlchemyWeb3Api
}

export const Context = createContext<AlchemyContext>({
  alchemy: undefined,
})

const AlchemyProvider: React.FC = ({ children }) => {
  const [alchemy, setAlchemy] = useState<any>()

  window.alchemy = alchemy

  useEffect(() => {
    const chainId = getWalletChainId()
    const alchemyLib = new AlchemyWeb3Api(chainId, {
      defaultConfirmations: 1,
      autoGasMultiplier: 1.5,
      testing: false,
      defaultGas: '6000000',
      defaultGasPrice: '1000000000000',
      accounts: [],
      ethereumNodeTimeout: 10000,
    })
    setAlchemy(alchemyLib)
  }, [])

  return <Context.Provider value={{ alchemy }}>{children}</Context.Provider>
}

export default AlchemyProvider

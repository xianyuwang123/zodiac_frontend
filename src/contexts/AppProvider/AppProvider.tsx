import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Zodiac } from '../../zodiac'

export interface ZodiacAppContext {
  zodiacApp?: typeof Zodiac
}

export const Context = createContext<ZodiacAppContext>({
  zodiacApp: undefined,
})

declare global {
  interface Window {
    zodiacAppsauce: any
  }
}

const ZodiacAppProvider: React.FC = ({ children }) => {
  const { ethereum, chainId }: { ethereum: any; chainId: number | null } = useWallet()
  const [zodiacApp, setZodiacApp] = useState<any>()

  window.bunnyArmyApp = zodiacApp
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const zodiacAppLib = new Zodiac(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setZodiacApp(zodiacAppLib)
      window.zodiacAppsauce = zodiacAppLib
      console.info('init the app...', chainId)
    }
  }, [ethereum, chainId])

  return <Context.Provider value={{ zodiacApp: zodiacApp }}>{children}</Context.Provider>
}

export default ZodiacAppProvider

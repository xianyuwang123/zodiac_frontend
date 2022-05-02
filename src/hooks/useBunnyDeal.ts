import { useCallback, useMemo } from 'react'
import { useWallet } from 'use-wallet'

import { sale, cancle, buyBunny, getZodiacContract } from '../zodiac/utils'
import useZodiac from './useZodiac'

export const useSale = () => {
  const { account } = useWallet()
  const zodiac = useZodiac()

  const handleSale = useCallback(
    async (bunnyToken: number, amount: string) => {
      await sale(getZodiacContract(zodiac), bunnyToken, amount, account)
    },
    [account, zodiac]
  )

  return { onSale: handleSale }
}

export const useCancelSale = () => {
  const { account } = useWallet()
  const zodiac = useZodiac()

  const handleCancel = useCallback(
    async (bunnyToken: number) => {
      await cancle(getZodiacContract(zodiac), bunnyToken, account)
    },
    [account, zodiac]
  )

  return { onCancel: handleCancel }
}

export const useBuy = () => {
  const { account } = useWallet()
  const zodiac = useZodiac()

  const handleBuy = useCallback(
    async (bunnyToken: number, price: string) => {
      await buyBunny(getZodiacContract(zodiac), bunnyToken, price, account)
    },
    [account, zodiac]
  )

  return { onBuy: handleBuy }
}

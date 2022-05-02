import { useCallback, useEffect, useState, useMemo } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalance } from '../utils/erc20'
import { getEthBalance } from '../zodiac/utils'

import useBlock from './useBlock'

import useZodiac from './useZodiac'

const useErc20Balance = (erc20Address: string, userAddress?: string): BigNumber => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet()
  const block = useBlock()
  const dApp = useZodiac()

  const fetchBalance = useCallback(async () => {
    if (!account && !userAddress) return

    let balance = '0'
    if (erc20Address?.toUpperCase() === 'ETH') {
      balance = await getEthBalance(dApp, userAddress ?? account)
    } else {
      balance = erc20Address ? await getBalance(ethereum, erc20Address, userAddress ?? account ?? '') : '0'
    }
    setBalance(new BigNumber(balance))
  }, [account, userAddress, ethereum, erc20Address, dApp])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, block])

  return balance
}

export default useErc20Balance

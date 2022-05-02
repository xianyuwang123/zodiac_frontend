import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalance } from '../utils/erc20'
import { getEthBalance } from '../zodiac/utils'
import useBlock from './useBlock'
import useZodiac from './useZodiac'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { ethereum, account }: { ethereum: provider | null; account: string | null } = useWallet()

  const block = useBlock()
  const bunnyArmy = useZodiac()

  const fetchBalance = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let balance: string = '0'
    if (tokenAddress?.toUpperCase() === 'ETH') {
      balance = await getEthBalance(bunnyArmy, account ?? '')
    } else {
      balance = tokenAddress ? await getBalance(ethereum, tokenAddress, account ?? '') : '0'
    }
    setBalance(new BigNumber(balance))
  }, [account, ethereum, tokenAddress, bunnyArmy])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, block])

  return balance
}

export default useTokenBalance

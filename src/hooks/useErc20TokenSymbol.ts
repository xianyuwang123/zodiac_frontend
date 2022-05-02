import { useCallback, useEffect, useMemo, useState } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContract, getTokenSymbol } from '../utils/erc20'
import { getWalletChainId } from '../utils/formatWallet'

const useErc20TokenSymbol = (erc20Address: string) => {
  const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet()
  const chainId = getWalletChainId()
  const [tokenSymbol, setTokenSymbol] = useState('')

  const fetchTokenSymbol = useCallback(async () => {
    if (!erc20Address) return
    const symbol = await getTokenSymbol(ethereum, erc20Address)
    setTokenSymbol(symbol)
  }, [ethereum, erc20Address, chainId])

  useEffect(() => {
    if (erc20Address) {
      fetchTokenSymbol()
    }
  }, [erc20Address])

  return tokenSymbol
}

export default useErc20TokenSymbol

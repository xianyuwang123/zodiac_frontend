import { useCallback, useEffect, useState, useMemo } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getContract, getAllowance } from '../utils/erc20'

import useBlock from './useBlock'

const useErc20Allowance = (erc20Address: string, contract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet()
  const block = useBlock()

  const tokenContract = useMemo(() => {
    return getContract(ethereum, erc20Address)
  }, [ethereum, erc20Address])

  const fetchAllowance = useCallback(async () => {
    if (!contract || !tokenContract || !account) return

    const allowance = await getAllowance(tokenContract, contract, account)
    setAllowance(new BigNumber(allowance))
  }, [account, contract, tokenContract])

  useEffect(() => {
    if (account && contract && tokenContract) {
      fetchAllowance()
    }
  }, [account, contract, tokenContract, block])

  return allowance
}

export default useErc20Allowance

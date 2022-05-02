import { useCallback, useMemo } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getContract, approve } from '../utils/erc20'

const useErc20Approve = (erc20Address: string, contract: Contract) => {
  const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum, erc20Address)
  }, [ethereum, erc20Address])

  const handleApprove = useCallback(async () => {
    if (!account || !contract || !tokenContract) return

    try {
      const tx = await approve(tokenContract, contract, account)
      return tx
    } catch (e) {
      console.error(e)
      throw e
    }
  }, [account, tokenContract, contract])

  return { onApprove: handleApprove }
}

export default useErc20Approve

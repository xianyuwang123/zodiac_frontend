import { useCallback, useMemo } from 'react'
import useZodiac from './useZodiac'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContract } from '../utils/erc20'
import { approve, getZodiacContract } from '../zodiac/utils'

const useBunnySaleApprove = (erc20Address: string) => {
  const { ethereum, account }: { ethereum: provider | null; account: string | null } = useWallet()

  const bunnyArmy = useZodiac()
  const usdtContract = getZodiacContract(bunnyArmy)

  const erc20Contract = useMemo(() => {
    return getContract(ethereum, erc20Address)
  }, [ethereum, erc20Address])

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(erc20Contract, usdtContract, account)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, erc20Contract, usdtContract])

  return { onApprove: handleApprove }
}

export default useBunnySaleApprove

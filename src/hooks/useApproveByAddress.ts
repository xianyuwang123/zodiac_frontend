import { useCallback, useEffect, useMemo, useState } from 'react'
import useZodiac from './useZodiac'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getAllowance, getBalance, getContract } from '../utils/erc20'
import { approve, getEthBalance, getZodiacContract } from '../zodiac/utils'
import BigNumber from 'bignumber.js'
import useBlock from './useBlock'
import { tokenMap } from '../zodiac/lib/constants'
import Web3 from 'web3'
import UNIV2PairABI from '../zodiac/lib/abi/uni_v2_lp.json'
import { AbiItem } from 'web3-utils'

const useApprove = (erc20Address: string, masterAddress?: string) => {
  const { account, ethereum, chainId }: { account: string | null; ethereum: provider | null; chainId: number | null } =
    useWallet()
  const zodiac = useZodiac()
  let masterContract = getZodiacContract(zodiac)
  if (masterAddress) {
    const web3 = new Web3(ethereum)
    masterContract = new web3.eth.Contract(UNIV2PairABI as unknown as AbiItem, masterAddress)
  }
  const block = useBlock()
  const [isApprove, setIsApprove] = useState<null | boolean>(null)
  const [balance, setBalance] = useState(new BigNumber(0))

  const tokenContract = useMemo(() => {
    return ethereum && !!erc20Address ? getContract(ethereum as provider, erc20Address) : null
  }, [ethereum, erc20Address])

  const fetchToken = useCallback(async () => {
    if (!erc20Address || !chainId || !account || !tokenContract) return

    if (checkAddressIsStakeToken(erc20Address, chainId)) {
      const balance = await getEthBalance(zodiac, account)
      setBalance(new BigNumber(balance))
      setIsApprove(true)
      return
    }
    const tokenAllowance = await getAllowance(tokenContract, masterContract, account)
    const balance = await getBalance(ethereum, erc20Address, account)
    if (new BigNumber(tokenAllowance).gt(0)) {
      setIsApprove(true)
    } else {
      setIsApprove(false)
    }
    setBalance(new BigNumber(balance))
  }, [erc20Address, block, chainId])

  useEffect(() => {
    if (account && ethereum && erc20Address) {
      fetchToken()
    }
  }, [account, ethereum, block, erc20Address])

  const lpContract = useMemo(() => {
    return getContract(ethereum, erc20Address)
  }, [ethereum, erc20Address])
  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterContract, account)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, lpContract, masterContract])

  return { onApprove: handleApprove, isApprove: isApprove, balance: balance }
}

const checkAddressIsStakeToken = (erc20Address: string, chainId: number) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const stakeTokenAddress = tokenMap.WETH[chainId]
  return stakeTokenAddress?.toLowerCase() === erc20Address?.toLowerCase()
}

export default useApprove

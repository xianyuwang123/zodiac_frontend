import { useCallback, useEffect, useState } from 'react'
import useBlock from './useBlock'
import { useWallet } from 'use-wallet'
import { getZodiacContract, getZodiacViewHelperContract } from '../zodiac/utils'
import useZodiac from './useZodiac'
import { Contract } from 'web3-eth-contract'
import { Card } from '../types/Card'

export const useCardList = () => {
  const [list, setList] = useState<null | Card[]>(null)
  const zodiac = useZodiac()
  const zodiacViewHelperContract = getZodiacViewHelperContract(zodiac)
  const zodiacContract = getZodiacContract(zodiac)
  const { account }: { account: string | null } = useWallet()
  const block = useBlock()
  const fetchCardList = useCallback(async () => {
    if (account && zodiacContract && zodiacViewHelperContract) {
      const NftInfo = await getCardList(zodiacViewHelperContract, account, zodiacContract)
      setList(NftInfo)
    }
  }, [account, block, zodiacContract])

  useEffect(() => {
    if (account) {
      fetchCardList()
    }
  }, [account, block, zodiacContract])

  return list
}

const getCardList = async (zodiacViewHelperContract: Contract, account: string, zodiacContract: Contract) => {
  try {
    const cardInfo = await zodiacViewHelperContract.methods.userNFTs(zodiacContract.options.address, account).call()
    return cardInfo
  } catch (e) {
    console.error(e)
  }
  return null
}

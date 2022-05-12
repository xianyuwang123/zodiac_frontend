import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import BigNumber from 'bignumber.js'
import useBlock from './useBlock'
import useZodiac from './useZodiac'
import { getZodiacLandContract } from '../zodiac/utils'
import { Contract } from 'web3-eth-contract'

interface UserInfoProps {
  dayAt: BigNumber
  totalEarn: BigNumber
  totalPoint: BigNumber
  pendingReward: BigNumber
}

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null)
  const { account } = useWallet()
  const block = useBlock()
  const zodiac = useZodiac()
  const landContract = getZodiacLandContract(zodiac)

  const fetchUserInfo = useCallback(async () => {
    if (!account) return
    const result: any = await Promise.all([getUserInfo(landContract, account), getPendingReward(landContract, account)])
    const { dayAt, totalEarn, totalPoint } = result[0]

    return setUserInfo({
      pendingReward: result[1],
      dayAt: new BigNumber(dayAt),
      totalEarn: new BigNumber(totalEarn),
      totalPoint: new BigNumber(totalPoint),
    })
  }, [block, account])

  useEffect(() => {
    fetchUserInfo()
  }, [block, account])

  return userInfo
}

const getUserInfo = async (landContract: Contract, account: string) => {
  try {
    const userInfo = await landContract.methods.userInfo(account).call()
    return userInfo
  } catch (err) {
    return [new BigNumber(0), new BigNumber(0)]
  }
}

const getPendingReward = async (landContract: Contract, account: string) => {
  try {
    const pendingReward = await landContract.methods.pendingReward(account).call()
    return new BigNumber(pendingReward)
  } catch (err) {
    return new BigNumber(0)
  }
}

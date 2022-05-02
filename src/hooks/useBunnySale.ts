import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { queryPricePerBunny, getZodiacContract, queryRemainCount, adoptBunny } from '../zodiac/utils'
import useZodiac from './useZodiac'
import useBlock from './useBlock'
import axios from '../utils/axios'

export function useQueryPricePerBunny() {
  const [price, setPrice] = useState(new BigNumber(0))
  const { account } = useWallet()
  const bunnyArmy = useZodiac()
  const zodiacContract = getZodiacContract(bunnyArmy)
  const block = useBlock()

  const fetchPrice = useCallback(async () => {
    const price = await queryPricePerBunny(zodiacContract)
    setPrice(new BigNumber(price ?? 0))
  }, [account, bunnyArmy])

  useEffect(() => {
    if (account && bunnyArmy) {
      fetchPrice()
    }
  }, [account, setPrice, block, bunnyArmy])

  return price
}

export function useQueryRemainingCount() {
  const [remain, setRemain] = useState(0)
  const { account } = useWallet()
  const zodiac = useZodiac()
  const zodiacContract = getZodiacContract(zodiac)
  const block = useBlock()

  const fetchRemain = useCallback(async () => {
    const remain = await queryRemainCount(zodiacContract)
    setRemain(remain ?? 0)
  }, [account, zodiac])

  useEffect(() => {
    if (account && zodiac) {
      fetchRemain()
    }
  }, [account, setRemain, block, zodiac])

  return remain
}

export function useAdoptBunny() {
  const { account } = useWallet()
  const bunnyArmy = useZodiac()

  const handleAdoptBunny = useCallback(async () => {
    try {
      const tx = await adoptBunny(getZodiacContract(bunnyArmy), account)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, bunnyArmy])

  return { onAdoptBunny: handleAdoptBunny }
}

export const syncPet = async (param: any) => {
  return await axios
    .post('/api/pet/sync', {
      pet_token: param,
    })
    .then((res) => {
      const { code, pet } = res
      if (code === 200) {
        return pet
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const queryAttribute = async (petId: string) => {
  return await axios
    .post('/api/pet/detail', {
      petId,
    })
    .then((res) => {
      const { code } = res
      if (code === 200) {
        return res
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export function useQueryAttribute(petId: string) {
  const [attribute, setAttribute] = useState(0)
  const { account } = useWallet()
  const block = useBlock()
  const ecSignature = window.localStorage.getItem('ecSignature')

  const fetchAttribute = useCallback(async () => {
    const attributeInfo = await queryAttribute(petId)
    setAttribute(attributeInfo)
  }, [account, block, petId])

  useEffect(() => {
    if (account) {
      fetchAttribute()
    }
  }, [account, block, petId, ecSignature])

  return attribute
}

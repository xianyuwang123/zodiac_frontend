import { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react'

import { get as getObjectProps, set as setObjectProps } from 'lodash'

import { DEFAULT_VALUES, StoreValue, ValueType } from '../constants/defaultValues'
import { getWalletChainId } from '../utils/formatWallet'

import { useWallet } from 'use-wallet'
import useBlock from './useBlock'

/**
 * Cached the values on the specific key
 *
 * @param key Key of storage
 * @param cachedPerBlock Refresh the cache per block, default is 10
 * @returns Value of storage
 */
function useCachedValue(key: string, cachedPerBlock = 10): [ValueType, Dispatch<SetStateAction<ValueType>>] {
  const block = useBlock()

  const { chainId }: { chainId: number | null } = useWallet()
  const staticChainId = getWalletChainId()

  const storageKey = useMemo(() => key?.split('.')[0], [key])
  const nestedKey = useMemo(() => key?.split('.').slice(1)?.join('.'), [key])
  const objectPath = useMemo(() => {
    return nestedKey ? `${chainId ?? staticChainId}.${nestedKey}` : `${chainId ?? staticChainId}`
  }, [nestedKey, chainId])

  const getLatestValue = (value1: StoreValue | undefined, value2: StoreValue | undefined) => {
    if (!!value1 && !!value2) {
      return (value1.blockHeight ?? 0) > (value2.blockHeight ?? 0) ? value1 : value2
    } else if (value1) {
      return value1
    } else if (value2) {
      return value2
    }
    return undefined
  }
  // Get from configration and local storage then
  // parse stored json or return initialValue
  const readValueAndBlockHeight = () => {
    const initialValue: StoreValue | undefined = getObjectProps(DEFAULT_VALUES, objectPath)

    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const storageItem = window?.localStorage.getItem(storageKey)
      const storageValue: StoreValue | undefined = storageItem
        ? getObjectProps(JSON.parse(storageItem), objectPath)
        : undefined

      return getLatestValue(initialValue, storageValue)
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }
  const readValue = () => {
    return readValueAndBlockHeight()?.value || 0
  }
  const readBlockHeight = () => {
    return readValueAndBlockHeight()?.blockHeight || 0
  }

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<ValueType>(readValue)

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<ValueType>> = (value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window == 'undefined') {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`)
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      const previousBlock = readBlockHeight()

      if (block - previousBlock >= cachedPerBlock) {
        const storageItem = window?.localStorage.getItem(storageKey)
        const newStorageItem = setObjectProps(storageItem ? JSON.parse(storageItem) : {}, objectPath, {
          value: newValue,
          blockHeight: block,
        })

        // Save to local storage
        window?.localStorage.setItem(storageKey, JSON.stringify(newStorageItem))

        // Save state
        setStoredValue(newValue)

        // We dispatch a custom event so every useCachedValue hook are notified
        window?.dispatchEvent(new Event('local-storage'))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  }

  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    // this only works for other documents, not the current one
    window?.addEventListener('storage', handleStorageChange)

    // this is a custom event, triggered in writeValueToLocalStorage
    window?.addEventListener('local-storage', handleStorageChange)

    return () => {
      window?.removeEventListener('storage', handleStorageChange)
      window?.removeEventListener('local-storage', handleStorageChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [storedValue, setValue]
}

export default useCachedValue

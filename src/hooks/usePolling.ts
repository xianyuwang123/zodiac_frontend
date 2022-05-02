import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'

const usePolling = (cycles = 20000) => {
  const [block, setBlock] = useState(0)
  const [time, setTime] = useState(0)
  const [RPCurl, setRPCurl] = useState('')
  const { ethereum, account, chainId }: { ethereum: provider; account: string | null; chainId: number | null } =
    useWallet()

  useEffect(() => {
    if (ethereum && account) {
      const fn = async (val: number) => {
        const web3 = new Web3(ethereum)
        const time1 = new Date().getTime()
        const latestBlockNumber = await web3.eth.getBlockNumber()
        const time2 = new Date().getTime()
        if (val !== latestBlockNumber || val === 0) {
          setTime(time2 - time1)
        }
        setBlock(latestBlockNumber)
      }
      if (time === 0) {
        fn(block)
      }
      const interval = setInterval(fn, cycles, block)
      return () => clearInterval(interval)
    }
    const provider = window.ethereum
    if (provider && provider.rpc && provider.rpc.rpcUrl) {
      setRPCurl(provider.rpc.rpcUrl)
    }
    return () => {}
  }, [ethereum, account, block])

  return {
    block,
    time,
    RPCurl,
    chainId,
  }
}

export const getTimeColor = (time: number): string => {
  if (time < 200) {
    return 'green'
  } else if (200 < time && time < 1000) {
    return 'orange'
  } else {
    return 'red'
  }
}

export default usePolling

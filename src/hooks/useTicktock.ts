import { useEffect, useState } from 'react'

/**
 * use in public scope instead of useBlock
 */
const useTicktock = (ticktockInSeconds?: number): number => {
  const [ticktock, setTicktock] = useState(1)

  useEffect(() => {
    const interval = setInterval(async () => {
      setTicktock(Date.now())
    }, (ticktockInSeconds || Number(process.env.REACT_APP_TICKTOCK_INTERVAL ?? 60)) * 1000)

    return () => clearInterval(interval)
  }, [])

  return ticktock
}

export default useTicktock

import { useEffect, useState, useContext } from 'react'
import { useWallet } from 'use-wallet'
import { ThemeContext } from 'styled-components'

const useInjectWallet = () => {
  const [inject, setInject] = useState(false)

  const {
    breakpoints: { mobile },
  } = useContext<{ breakpoints: any }>(ThemeContext)
  const isMobile = window.innerWidth <= (mobile || 576)

  const { account, connect } = useWallet()

  useEffect(() => {
    if (!account && isMobile) {
      connect('injected')
      setInject(true)
    }
  }, [])

  return inject
}

export default useInjectWallet

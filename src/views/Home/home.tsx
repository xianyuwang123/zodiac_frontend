import React, { useEffect } from 'react'
import styled from 'styled-components'
import useEagerConnect from '../../hooks/useEagerConnect'
import useInactiveListener from '../../hooks/useInactiveListener'
import useMobile from '../../hooks/useMobile'
import WalletNotConnectWrapper from '../../components/WalletNotConnectModal/WalletNotConnectWrapper'
import BlindBoxSale from './components/BlindBoxSale'
import Bg from '../../assets/img/zodiac/home/bg.png'
import { useHistory, useLocation } from 'react-router-dom'
import { useWallet } from 'use-wallet'

const Home: React.FC = () => {
  const { account } = useWallet()
  const isMobile = useMobile()
  const history = useHistory()
  const { pathname } = useLocation()

  useInactiveListener()
  useEagerConnect()

  useEffect(() => {
    if (pathname !== '/') {
      history.push('/')
    }
  }, [account])

  return (
    <StyledBannerWrapper isMobile={isMobile}>
      <StyledTopBarBanner isMobile={isMobile}>
        <BlindBoxSale />
        <WalletNotConnectWrapper />
      </StyledTopBarBanner>
    </StyledBannerWrapper>
  )
}

interface StyledIsMobileProps {
  isMobile: boolean
}

const StyledBannerWrapper = styled.div<StyledIsMobileProps>`
  min-height: 100vh;
  height: 100%;
  background-image: url('${Bg}');
  background-size: cover;
  padding-top: 82px;
`

const StyledTopBarBanner = styled.div<StyledIsMobileProps>`
  text-align: center;
  position: relative;
  top: -82px;
`

export default Home

import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import Container from '../Container'
import Spacer from '../Spacer'

import AccountButton from './components/AccountButton'
import TopbarExt from './components/TopbarExt'
import Logo from '../../assets/img/zodiac/home/logo.png'
import { useWallet } from 'use-wallet'
import useMobile from '../../hooks/useMobile'
import NotConnectButton from './components/NotConnectButton'

interface TopBarProps {
  showTestnet?: boolean
  children?: React.ReactNode
  onPresentMobileMenu?: () => void
}

const TopBar: React.FC<TopBarProps> = ({ children, onPresentMobileMenu, showTestnet }) => {
  const { account } = useWallet()
  const isMobile = useMobile()
  const { pathname } = useLocation()

  const isHomePage = useMemo(() => {
    return pathname === '/'
  }, [pathname])

  return (
    <StyledTopBar style={{ background: isHomePage ? 'transparent' : '#242735' }}>
      <Container size={isMobile ? 'lg' : 'unset'}>
        <StyledTopBarLightInner>
          <StyledLogoWrapper>
            <StyledLogoLink to="/">
              <StyledLogo src={Logo} />
            </StyledLogoLink>
          </StyledLogoWrapper>
          <StyledActionsLightWrapper>
            <StyledAccountButtonWrapper className="accountDetail">
              {!account ? <NotConnectButton isSidebar={false} /> : <AccountButton isSidebar={false} />}
            </StyledAccountButtonWrapper>
            <Spacer size="sm" />
            {children}
            <TopbarExt />
          </StyledActionsLightWrapper>
        </StyledTopBarLightInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoLink = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  text-decoration: none;
`

const StyledLogo = styled.img``

const StyledLogoWrapper = styled.div`
  width: auto;
  display: flex;
`

const StyledTopBar = styled.div`
  position: relative;
  z-index: 1;
`

const StyledTopBarLightInner = styled.div`
  align-items: center;
  display: flex;
  height: 82px;
  line-height: 82px;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`
const StyledActionsLightWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0;
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    justify-content: center;
    min-width: unset;
  }
`

export default TopBar

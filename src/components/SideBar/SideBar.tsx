import React, { useCallback } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { useTranslation } from 'react-i18next'
import NotConnectButton from '../TopBar/components/NotConnectButton'
import AccountButton from '../TopBar/components/AccountButton'
import JumpImg from '../../assets/img/zodiac/side/jump.png'
import HomeImg from '../../assets/img/zodiac/side/home.png'
import MiningImg from '../../assets/img/zodiac/side/mining.png'
import AccountImg from '../../assets/img/zodiac/side/account.png'
import LangImg from '../../assets/img/zodiac/side/lang.png'
import TwitterImg from '../../assets/img/zodiac/side/twitter.png'
import TelegramImg from '../../assets/img/zodiac/side/telegram.png'
import DiscordImg from '../../assets/img/zodiac/side/discord.png'
import { tokenMap } from '../../zodiac/lib/constants'
import { ChainId } from '../../types'
import useTokenBalance from '../../hooks/useTokenBalance'
import { getFullDisplayBalance } from '../../utils/formatBalance'
import udi_icon from '../../assets/img/zodiac/account/udi.png'
import udp_icon from '../../assets/img/zodiac/account/udp.png'

export interface SideBarProps {
  onSignout?: () => void
  style?: React.CSSProperties
}

const SideBar: React.FC<SideBarProps> = ({ onSignout, style }) => {
  const { account, chainId }: { account: string | null; chainId: number | null } = useWallet()
  const { t, i18n } = useTranslation()

  const handleChange = useCallback(() => {
    i18n.changeLanguage(i18n?.languages[0] === 'en' ? 'zh' : 'en')
    onSignout?.()
  }, [i18n])

  const udiAddr = tokenMap.UDI[chainId as ChainId] || ''
  const udiBalance = useTokenBalance(udiAddr)
  const udiBalanceCount = getFullDisplayBalance(udiBalance, 18, 3)

  const udpAddr = tokenMap.UDP[chainId as ChainId] || ''
  const udpBalance = useTokenBalance(udpAddr)
  const udpBalanceCount = getFullDisplayBalance(udpBalance, 18, 3)

  return (
    <StyledAccount style={style} id={'sidebar'}>
      <StyledMenuWrapper>
        <StyledLink exact activeClassName="active" to="/" onClick={onSignout}>
          <IconImg src={HomeImg} />
          {t('route.home')}
          <ToJumpImg src={JumpImg} />
        </StyledLink>
        <StyledLink exact activeClassName="active" to="/mining" onClick={onSignout}>
          <IconImg src={MiningImg} />
          {t('route.mining')}
          <ToJumpImg src={JumpImg} />
        </StyledLink>
        <StyledLink exact activeClassName="active" to="/account" onClick={onSignout}>
          <IconImg src={AccountImg} />
          {t('route.myAccount')}
          <ToJumpImg src={JumpImg} />
        </StyledLink>
        <StyledLang>
          <IconImg src={LangImg} />
          {t('route.language')}
          <LangSwitch onClick={handleChange}>{i18n?.languages[0].toLocaleUpperCase()}</LangSwitch>
        </StyledLang>
      </StyledMenuWrapper>
      <StyledAccountButtonWrapper>
        {!account ? (
          <NotConnectButton onSignout={onSignout} isSidebar={true} />
        ) : (
          <AccountButton onSignout={onSignout} isSidebar={true} />
        )}
      </StyledAccountButtonWrapper>
      {!account ? null : (
        <StyleoOpeartePanel>
          <StylePanel>
            <StylePanelLeft>
              <StylePanelImg src={udi_icon} />
              <StylePanelBalance>{udiBalanceCount}</StylePanelBalance>
              <StyleToken>{'UDI'}</StyleToken>
            </StylePanelLeft>
            <StylePanelButton>
              <span>
                <a
                  href={`https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=${udiAddr}`}
                  target={'_blank'}
                >
                  {'Buy'}
                </a>
              </span>
            </StylePanelButton>
          </StylePanel>
          <StylePanel>
            <StylePanelLeft>
              <StylePanelImg src={udp_icon} />
              <StylePanelBalance>{udpBalanceCount}</StylePanelBalance>
              <StyleToken>{'UDP'}</StyleToken>
            </StylePanelLeft>
            <StylePanelButton>
              <span>
                <a
                  href={`https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=${udpAddr}`}
                  target={'_blank'}
                >
                  {'Buy'}
                </a>
              </span>
            </StylePanelButton>
          </StylePanel>
        </StyleoOpeartePanel>
      )}
      <Nav>
        <StyledLinkExt target={'_blank'} href={'https://twitter.com/Uniteddefi?t=USTek_ugY7akCOIMAKEBIfQ&s=09'}>
          <IconImg src={TwitterImg} />
        </StyledLinkExt>
        <StyledLinkExt target={'_blank'} href={'https://t.me/uniteddefi'}>
          <IconImg src={TelegramImg} />
        </StyledLinkExt>
        <StyledLinkExt target={'_blank'} href={'https://discord.gg/khRpsZjcbp'}>
          <IconImg src={DiscordImg} />
        </StyledLinkExt>
      </Nav>
    </StyledAccount>
  )
}

const StyledAccount = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  color: #fff;
  justify-content: center;
  align-items: center;
  & > nav {
    position: absolute;
  }
`

const StyledMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 72px;
  width: 100%;
`

const StyledLink = styled(NavLink)`
  color: #fff;
  padding-left: 16px;
  height: 65px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  position: relative;
  .iconfont {
    font-size: 22px;
    margin-right: 15px;
  }
`

const StyledLang = styled.div`
  color: #fff;
  padding-left: 16px;
  height: 65px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  position: relative;
  .iconfont {
    font-size: 22px;
    margin-right: 15px;
  }
`

const StyledAccountButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const IconImg = styled.img`
  height: 22px;
  margin-right: 15px;
`

const ToJumpImg = styled.img`
  width: 32px;
  position: absolute;
  right: 0px;
`

const LangSwitch = styled.div`
  position: absolute;
  right: 10px;
  font-size: 18px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
`

const Nav = styled.div`
  position: fixed;
  width: 305px;
  bottom: 50px;
  display: flex;
`

const StyledLinkExt = styled.a`
  margin-left: 15px;
  &:first-child {
    margin-left: 40px;
  }
`

const StyleoOpeartePanel = styled.div`
  width: 100%;
  margin-top: 30px;
`

const StylePanel = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

const StylePanelLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #fff;
`

const StylePanelImg = styled.img`
  height: 20px;
  margin: 0 15px 0 10px;
`

const StylePanelBalance = styled.span`
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyleToken = styled.div`
  margin-left: 4px;
`

const StylePanelButton = styled.div`
  width: 60px;
  height: 20px;
  background: #00cf08;
  border-radius: 20px 20px 20px 20px;
  opacity: 1;
  text-align: center;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 12px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    zoom: 0.9;
    & > a {
      color: #ffffff;
    }
  }
`

export default SideBar

import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import udi_icon from '../../../assets/img/zodiac/account/udi.png'
import udp_icon from '../../../assets/img/zodiac/account/udp.png'
import CardList from './CardList'
import { ChainId } from '../../../types'
import { tokenMap } from '../../../zodiac/lib/constants'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import AccountImg from '../../../assets/img/zodiac/account/account.png'
import { useCardList } from '../../../hooks/useCardList'

const OpeartePanel: React.FC = () => {
  const { chainId }: { account: string | null; chainId: number | null } = useWallet()
  const { t } = useTranslation()
  const udiAddr = tokenMap.UDI[chainId as ChainId] || ''
  const udiBalance = useTokenBalance(udiAddr)
  const udiBalanceCount = getFullDisplayBalance(udiBalance, 18, 3)
  const udpAddr = tokenMap.UDP[chainId as ChainId] || ''
  const udpBalance = useTokenBalance(udpAddr)
  const udpBalanceCount = getFullDisplayBalance(udpBalance, 18, 3)
  const listInfo = useCardList()

  return (
    <>
      <StyleTitleWrapper>
        <StyleTitleLeft>
          <StyleTitleImg src={AccountImg} />
          <StyleTitle>{t('route.myAccount')}</StyleTitle>
        </StyleTitleLeft>
        <StyleTitleRight>{`${listInfo ? listInfo.length : '-'} NFT`}</StyleTitleRight>
      </StyleTitleWrapper>
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
      <CardList />
    </>
  )
}

const StyleoOpeartePanel = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  width: 100%;
  max-width: 400px;
  margin: 18px auto 10px;
`

const StylePanel = styled.div`
  border: 1px solid #29374b;
  border-radius: 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

const StylePanelLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #fff;
`

const StylePanelImg = styled.img`
  height: 20px;
  margin: 0 5px 0 0px;
`

const StylePanelBalance = styled.span`
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyleToken = styled.div`
  margin-left: 4px;
`

const StylePanelButton = styled.div`
  width: 36px;
  height: 20px;
  border-radius: 20px;
  opacity: 1;
  border: 1px solid #45b26b;
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
      color: #45b26b;
    }
  }
`

const StyleTitleWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

const StyleTitleLeft = styled.div`
  display: flex;
`

const StyleTitleRight = styled.div`
  font-size: 16px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #ffffff;
  line-height: 32px;
`

const StyleTitleImg = styled.img`
  height: 30px;
  margin-right: 10px;
`

const StyleTitle = styled.div`
  height: 32px;
  font-size: 16px;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #ffffff;
  line-height: 32px;
`

export default OpeartePanel

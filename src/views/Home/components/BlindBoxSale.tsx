import React, { useState, useCallback, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { Button, notification } from 'antd'
import SelectWalletAndNetworkModal from '../../../components/SelectWalletAndNetworkModal'
import useModal from '../../../hooks/useModal'
import { useBuyCard } from '../../../hooks/useBuyCard'
import { tokenMap } from '../../../zodiac/lib/constants'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import BlindboxImg from '../../../assets/img/zodiac/home/blindbox.png'
import Dots from '../../../components/Dots'
import CardModal from './CardModal'
import useApprove from '../../../hooks/useApproveByAddress'
import { ChainId } from '../../../types'
import BigNumber from 'bignumber.js/bignumber'

const BlindBoxSale: React.FC = () => {
  const { chainId, account }: { chainId: number | null; account: string | null } = useWallet()
  const { t } = useTranslation()
  const USDTAddress = tokenMap.USDT[chainId as ChainId] || ''
  const UDIAddress = tokenMap.UDI[chainId as ChainId] || ''
  const { onApprove: handleApproveUSDT, isApprove: USDTIsApprove, balance: USDTBalance } = useApprove(USDTAddress)
  const { onApprove: handleApproveUDI, isApprove: UDIIsApprove, balance: UDIBalance } = useApprove(UDIAddress)

  const [pending, setPending] = useState<boolean>(false)
  const [cardId, setCardId] = useState<number | null>(null)

  const { onBuyCard } = useBuyCard()
  const [onCardModal] = useModal(<CardModal id={cardId} />)

  const [onSelectWalletAndNetworkModal] = useModal(<SelectWalletAndNetworkModal />)

  const handleBuyCard = async () => {
    setPending(true)
    try {
      const txHash = await onBuyCard()
      if (txHash) {
        const cardId = txHash?.events?.Transfer?.returnValues?.tokenId
        if (cardId) {
          setCardId(parseInt(cardId))
        }
      }
    } catch (error: any) {
      if (error?.code === 4001) {
        //dummy
      } else if (error?.message) {
        notification.warning({
          message: t('transaction.exception'),
          description: t('transaction.details') + error.message,
        })
      }
    } finally {
      setPending(false)
    }
  }

  const handleUSDTApprove = async () => {
    setPending(true)
    try {
      const txHash = await handleApproveUSDT()
      console.log(txHash)
    } catch (error: any) {
      if (error?.code === 4001) {
        //dummy
      }
    } finally {
      setPending(false)
    }
  }
  const handleUDIApprove = async () => {
    setPending(true)
    try {
      const txHash = await handleApproveUDI()
      console.log(txHash)
    } catch (error: any) {
      if (error?.code === 4001) {
        //dummy
      }
    } finally {
      setPending(false)
    }
  }
  const handleApproveAndBuyCard = async () => {
    if (!account) {
      onSelectWalletAndNetworkModal()
    } else {
      if (!USDTIsApprove) {
        await handleUSDTApprove()
      } else if (!UDIIsApprove) {
        await handleUDIApprove()
      } else {
        await handleBuyCard()
      }
    }
  }

  useEffect(() => {
    if (cardId) {
      onCardModal()
    }
  }, [cardId])

  const buttonStatus = useMemo(() => {
    if (!account) {
      return t('actions.connect_wallet')
    } else if (UDIIsApprove === null && USDTIsApprove === null) {
      return `Loading...`
    } else if (new BigNumber(100).gt(USDTBalance.dividedBy(new BigNumber(10).pow(18)))) {
      return `Insufficient USDT`
    } else if (new BigNumber(0.25).gt(USDTBalance.dividedBy(new BigNumber(10).pow(4)))) {
      return `Insufficient UDI`
    } else if (!USDTIsApprove) {
      return `${t('actions.approve')} USDT`
    } else if (!UDIIsApprove) {
      return `${t('actions.approve')} UDI`
    } else {
      return 'Open Mystery Box'
    }
  }, [account, USDTIsApprove, UDIIsApprove, USDTBalance, UDIBalance, t])

  return (
    <>
      <StyledContainer>
        <StyledTitle>{t('homePage.sale_title')}</StyledTitle>
        <StyledSubTitle>{t('homePage.sale_sub_title')}</StyledSubTitle>
        <StyledBuyBox>
          <StyledCardImg src={BlindboxImg} />
          <StyledPriceTitle>{'Blind Box Price'}</StyledPriceTitle>
          <StyledPrice>{'100 USDT + 0.25 UDI'}</StyledPrice>
          <Button shape="round" onClick={handleApproveAndBuyCard} disabled={pending}>
            <Dots show={pending} text={buttonStatus} />
          </Button>
          <StyledUDILink
            target={'_blank'}
            href={`https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=${UDIAddress}`}
          >
            {t('homePage.buy')}
            {'UDI >'}
          </StyledUDILink>
        </StyledBuyBox>
      </StyledContainer>
    </>
  )
}

const StyledContainer = styled.div`
  color: #fff;
  text-align: center;
  padding-top: 124px;
`

const StyledTitle = styled.span`
  margin-top: -30px;
  display: block;
  font-size: 36px;
  font-family: Paytone One-Regular, Paytone One;
  font-weight: 400;
  background: linear-gradient(160deg, #e4ffb7 0%, #88ffb9 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`

const StyledSubTitle = styled.span`
  margin-top: 2px;
  font-size: 24px;
  font-family: Paytone One-Regular, Paytone One;
  font-weight: 400;
  color: #ffffff;
  display: block;
`

const StyledBuyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > button {
    display: flex;
    justify-content: center;
    width: 295px;
    height: 50px;
    line-height: 44px;
    background: linear-gradient(137deg, #e4ffb7 0%, #88ffb9 100%);
    border-radius: 30px 30px 30px 30px;
    font-size: 18px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: #2b2b2b;
    margin-top: 40px;
    margin-bottom: 48px;
    opacity: 0.9;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      margin-bottom: 60px;
    }
    &:hover,
    &:focus {
      opacity: 1;
    }
  }
`

const StyledCardImg = styled.img`
  margin-top: 50px;
  width: 247px;
  object-fit: cover;
`

const StyledUDILink = styled.a`
  margin: 0;
  font-size: 18px;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #93ffb9;
  line-height: 12px;
  -webkit-background-clip: text;
  &:hover,
  &:focus {
    color: #93ffb9;
  }
`

const StyledPriceTitle = styled.div`
  margin-top: 40px;
  font-size: 16px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  line-height: 16px;
  background: linear-gradient(137deg, #e4ffb7 0%, #88ffb9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledPrice = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-family: Poppins-Bold, Poppins;
  font-weight: bold;
  color: #ffffff;
  line-height: 18px;
`

export default BlindBoxSale

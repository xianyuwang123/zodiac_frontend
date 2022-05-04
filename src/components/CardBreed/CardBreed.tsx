import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Drawer, Input, notification } from 'antd'
import useMobile from '../../hooks/useMobile'
import { useTranslation } from 'react-i18next'
import BoxingRab_empty from '../../assets/img/bunnyArmy/main/BoxingRab_empty.png'
import ChooseImg from '../../assets/img/zodiac/account/choose.png'
import BackDrawer from '../BackDrawer'
import CardSelect from '../CardSelect'
import Dots from '../Dots'
import { useWallet } from 'use-wallet'
import { Card } from '../../types/Card'
import NFTCard2 from '../NFTCard/NFTCard2'
import BigNumber from 'bignumber.js'
import { tokenMap } from '../../zodiac/lib/constants'
import { ChainId } from '../../types'
import useApprove from '../../hooks/useApproveByAddress'
import useModal from '../../hooks/useModal'
import SelectWalletAndNetworkModal from '../SelectWalletAndNetworkModal'
import { useBreed } from '../../hooks/useBreed'
import CardModal from '../../views/Home/components/CardModal'

interface BunnyBreedProps {
  onDrawerClose: () => void
  onDrawerBack: () => void
  firstCardInfo: Card
  lastCardInfo?: Card
}

const CardBreed: React.FC<BunnyBreedProps> = ({ onDrawerClose, onDrawerBack, firstCardInfo, lastCardInfo }) => {
  const { t } = useTranslation()
  const { chainId, account }: { chainId: number | null; account: string | null } = useWallet()
  const [breedListDrawer, setBreedListDrawer] = useState<boolean>(false)
  const [pending, setPending] = useState<boolean>(false)
  const USDTAddress = tokenMap.USDT[chainId as ChainId] || ''
  const UDIAddress = tokenMap.UDI[chainId as ChainId] || ''
  const { onApprove: handleApproveUSDT, isApprove: USDTIsApprove, balance: USDTBalance } = useApprove(USDTAddress)
  const { onApprove: handleApproveUDI, isApprove: UDIIsApprove, balance: UDIBalance } = useApprove(UDIAddress)

  const [cardId, setCardId] = useState<number | null>(null)

  const { onBreed } = useBreed()
  const [onCardModal] = useModal(<CardModal id={cardId} />)
  const [onSelectWalletAndNetworkModal] = useModal(<SelectWalletAndNetworkModal />)

  const onBreedDrawerShow = () => {
    onDrawerClose()
    setBreedListDrawer(true)
  }

  const onBreedDrawerClose = () => {
    setBreedListDrawer(false)
  }

  const handleBreed = async () => {
    setPending(true)
    try {
      const txHash = await onBreed(firstCardInfo?.tokenId, lastCardInfo?.tokenId)
      if (txHash) {
        console.log('txHash', txHash)
        const cardId = txHash?.events?.Transfer?.returnValues?.tokenId
        if (cardId) {
          onDrawerClose()
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

  const handleApproveAndBreed = async () => {
    if (!account) {
      onSelectWalletAndNetworkModal()
    } else {
      if (!lastCardInfo) {
        onBreedDrawerShow()
      } else if (!USDTIsApprove) {
        await handleUSDTApprove()
      } else if (!UDIIsApprove) {
        await handleUDIApprove()
      } else {
        await handleBreed()
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
    } else if (!lastCardInfo) {
      return 'Choose Zodiac'
    } else if (new BigNumber(100).gt(USDTBalance.dividedBy(new BigNumber(10).pow(18)))) {
      return `Insufficient USDT`
    } else if (new BigNumber(0.25).gt(UDIBalance.dividedBy(new BigNumber(10).pow(4)))) {
      return `Insufficient UDI`
    } else if (!USDTIsApprove) {
      return `${t('actions.approve')} USDT`
    } else if (!UDIIsApprove) {
      return `${t('actions.approve')} UDI`
    } else {
      return 'Breek'
    }
  }, [account, t, lastCardInfo, USDTIsApprove, UDIIsApprove, USDTBalance, UDIBalance])

  return (
    <>
      <StyledContent>
        <StyledDesc>
          Please choose a zodiac
          <br />
          sign to breed
        </StyledDesc>
        <StyledBreedWrapper>
          <StyledCardWarpper>
            <NFTCard2 cardInfo={firstCardInfo} />
          </StyledCardWarpper>
          <StyledChooseImg src={ChooseImg} />
          <StyledCardWarpper>
            {lastCardInfo ? <NFTCard2 cardInfo={lastCardInfo} /> : <StyledCardWarpper>1</StyledCardWarpper>}
          </StyledCardWarpper>
        </StyledBreedWrapper>
        <StyledPriceTitle>{'Blind Box Price'}</StyledPriceTitle>
        <StyledPrice>{'100 USDT + 0.25 UDI'}</StyledPrice>
        <Button shape="round" onClick={handleApproveAndBreed}>
          <Dots show={pending} text={buttonStatus} />
        </Button>
      </StyledContent>
      <BackDrawer
        className="breedList-drawer"
        visible={breedListDrawer}
        onBackDrawer={() => {
          onBreedDrawerClose()
          onDrawerBack()
        }}
        onCloseDrawer={onBreedDrawerClose}
        children={<CardSelect onDrawerClose={onBreedDrawerClose} firstCardInfo={firstCardInfo} />}
      />
    </>
  )
}

const StyledContent = styled.div`
  margin-top: 10px;
  text-align: center;
  & > button {
    display: flex;
    margin: 37px auto 0;
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
    opacity: 0.9;
    &:hover,
    &:focus {
      opacity: 1;
    }
  }
`

const StyledDesc = styled.div`
  font-size: 20px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #dedede;
  line-height: 32px;
`

const StyledBreedWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCardWarpper = styled.div`
  width: 140px;
  height: 180px;
`

const StyledChooseImg = styled.img`
  width: 19px;
  height: 19px;
  object-fit: cover;
  margin: 0 10px;
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

export default CardBreed

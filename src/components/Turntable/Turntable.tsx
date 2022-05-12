import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Drawer, Input, notification } from 'antd'
import { useTranslation } from 'react-i18next'
import Dots from '../Dots'
import useModal from '../../hooks/useModal'
import { useStake } from '../../hooks/useStake'
import MultiplyModal from '../../views/Mining/components/MultiplyModal'
import { Card } from '../../types/Card'
import TurntableImg from '../../assets/img/zodiac/mining/turntable.png'
import PointerImg from '../../assets/img/zodiac/mining/pointer.png'

interface BunnyBreedProps {
  onDrawerClose: () => void
  onDrawerBack: () => void
  cardInfo: Card
}

const Turntable: React.FC<BunnyBreedProps> = ({ onDrawerClose, onDrawerBack, cardInfo }) => {
  const { t } = useTranslation()
  const [pending, setPending] = useState<boolean>(false)
  const [multiply, setMultiply] = useState<number | null>(null)

  const { onStake } = useStake()
  const [onMultiplyModal] = useModal(<MultiplyModal multiply={multiply} />)

  const handleStake = async () => {
    setPending(true)
    try {
      const txHash = await onStake(cardInfo.tokenId)
      if (txHash) {
        console.log('txHash', txHash)
        console.log(txHash?.events?.Stake?.returnValues?.point)
        if (txHash?.events?.Stake?.returnValues?.point) {
          console.log(1)
          setMultiply(parseInt(String(txHash?.events?.Stake?.returnValues?.point / 200)))
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

  useEffect(() => {
    if (multiply) {
      // 执行动画
      console.log('multiply', multiply)
      onDrawerClose()
      onMultiplyModal()
    }
  }, [multiply])

  return (
    <>
      <StyledContent>
        <StyledDesc>Turn the turntable</StyledDesc>
        <StyledDescSub>Get high computing power</StyledDescSub>
        <StyledCardId>{`# ${`0000000${cardInfo?.tokenId ? cardInfo.tokenId : '0'}`.slice(-6)}`}</StyledCardId>
        <StyledTurnTableWrapper>
          <StyledTurnTable src={TurntableImg} />
          <StyledPointer
            onClick={() => {
              if (!pending) {
                handleStake()
              }
            }}
            src={PointerImg}
          />
        </StyledTurnTableWrapper>
        <StyledMultiplyInfo>
          <span>{'X1'}</span>
          <StyledMultiplyTitle>{'Multiplier today'}</StyledMultiplyTitle>
        </StyledMultiplyInfo>
      </StyledContent>
    </>
  )
}

const StyledContent = styled.div`
  margin-top: 60px;
  text-align: center;
  overflow-y: scroll;
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
  font-size: 32px;
  font-family: Paytone One-Regular, Paytone One;
  font-weight: 400;
  background: linear-gradient(137deg, #e4ffb7 0%, #88ffb9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledDescSub = styled.div`
  font-size: 24px;
  font-family: Paytone One-Regular, Paytone One;
  font-weight: 400;
  color: #ffffff;
`

const StyledCardId = styled.div`
  font-size: 12px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #ffffff;
  margin-top: 20px;
`

const StyledTurnTableWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  height: 100vw;
`

const StyledTurnTable = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const StyledPointer = styled.img`
  width: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const StyledMultiplyInfo = styled.div`
  width: 222px;
  height: 74px;
  border-radius: 20px 20px 15px 15px;
  opacity: 1;
  border: 2px solid #ffb247;
  position: relative;
  margin: 0 auto 24px;
  & > span {
    font-size: 40px;
    font-family: Paytone One-Regular, Paytone One;
    font-weight: 400;
    line-height: 38px;
    background: linear-gradient(166deg, #00e5c4 0%, #00bed5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const StyledMultiplyTitle = styled.div`
  width: 222px;
  margin-left: -2px;
  height: 30px;
  background: linear-gradient(180deg, #9c59fe 0%, #6f53fd 100%);
  opacity: 1;
  border: 2px solid #ffb247;
  position: absolute;
  bottom: -2px;
  border-radius: 60px;
  font-size: 12px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #f2f2f2;
  line-height: 28px;
`

export default Turntable

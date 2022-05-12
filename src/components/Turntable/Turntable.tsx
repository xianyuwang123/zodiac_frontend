import React, { useEffect, useMemo, useState, useRef } from 'react'
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
import { useCardExtInfo, useHashPower } from '../../hooks/useCardInfo'

interface breedProps {
  onDrawerClose: () => void
  onDrawerBack: () => void
  cardInfo: Card
}

const Turntable: React.FC<breedProps> = ({ onDrawerClose, onDrawerBack, cardInfo }) => {
  const { t } = useTranslation()
  const [pending, setPending] = useState<boolean>(false)
  const [multiply, setMultiply] = useState<number | null>(null)
  const [x, setX] = useState<number | null>(null)
  const cardExtInfo = useCardExtInfo(parseInt(cardInfo.tokenId))
  const hashPower = useHashPower()

  const [run, setRun] = useState<boolean>(false)
  const { onStake } = useStake()
  const [onMultiplyModal] = useModal(<MultiplyModal multiply={x} />)
  const node = useRef<HTMLImageElement>()

  const handleStake = async () => {
    setPending(true)
    try {
      const txHash = await onStake(cardInfo.tokenId)
      if (txHash) {
        if (txHash?.events?.RandomScale?.returnValues?.scale) {
          setMultiply(parseInt(txHash?.events?.RandomScale?.returnValues?.scale))
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

  useMemo(() => {
    if (multiply) {
      // 执行动画
      const time = 125 * multiply
      setRun(true)
      setTimeout(() => {
        setRun(false)
        if (node) {
          node.current?.setAttribute(
            'style',
            `transition: all ${0.125 * (multiply + 7)}s; transform: rotate(-${45 * (multiply + 7)}deg)`
          )
        }
      }, 6000)
      setTimeout(() => {
        setX(multiply)
        setMultiply(null)
        onDrawerClose()
        const dom = document.getElementById('turnTable')
        if (dom) {
          dom.style.transition = `unset`
          dom.style.transform = `rotate(0deg)`
        }
      }, 6000 + time + 2000)
    }
  }, [multiply, node])

  useEffect(() => {
    if (x) {
      onMultiplyModal()
    }
  }, [x])

  const basic = useMemo(() => {
    switch (parseInt(cardInfo?.zgLevel)) {
      case 0:
        return 100
      case 1:
        return 200
      case 2:
        return 300
    }
    return null
  }, [cardInfo?.zgLevel])

  return (
    <>
      <StyledContent>
        <StyledDesc>Turn the turntable</StyledDesc>
        <StyledDescSub>Get high computing power</StyledDescSub>
        <StyledCardId>{`# ${`0000000${cardInfo?.tokenId ? cardInfo.tokenId : '0'}`.slice(-6)}`}</StyledCardId>
        <StyledTurnTableWrapper>
          <StyledTurnTable ref={node as any} className={run ? 'trun' : ''} src={TurntableImg} />
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
          <span>{`${
            cardExtInfo?.currentPoint && cardExtInfo?.currentPoint !== '0' ? `X${cardExtInfo.currentPoint}` : '-'
          }`}</span>
          <StyledMultiplyTitle>{'Multiplier today'}</StyledMultiplyTitle>
        </StyledMultiplyInfo>
        <StyledInfo>
          <StyledBasicPower>
            {'My basic computing power: '}
            <span>{basic ? basic : '-'}</span>
          </StyledBasicPower>
          <StyledHashpower>
            {'Get UDP per 1000 hashpower：'}
            <div>
              {hashPower ? hashPower : '-'}
              <span>{' UDP'}</span>
            </div>
          </StyledHashpower>
        </StyledInfo>
      </StyledContent>
    </>
  )
}

const StyledBasicPower = styled.div`
  width: 296px;
  margin-left: -2px;
  margin-top: -2px;
  height: 40px;
  border-bottom: 2px solid #e5e5e5;
  font-size: 12px;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #f2f2f2;
  line-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 20px;
    font-family: Paytone One-Regular, Paytone One;
    font-weight: 400;
    background: linear-gradient(166deg, #00e5c4 0%, #00bed5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 8px;
    margin-top: -2px;
  }
`

const StyledHashpower = styled.div`
  line-height: 40px;
  font-size: 12px;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #f2f2f2;
  & > div {
    line-height: 24px;
    font-size: 20px;
    font-family: Paytone One-Regular, Paytone One;
    font-weight: 400;
    color: #ffb247;
    & > span {
      font-size: 12px;
      font-family: Paytone One-Regular, Paytone One;
      font-weight: 400;
      color: #ffb247;
      zoom: 0.8;
    }
  }
`

const StyledInfo = styled.div`
  width: 295px;
  height: 118px;
  margin: 0 auto 40px;
  border-radius: 15px 15px 15px 15px;
  border: 2px solid #e5e5e5;
`

const StyledContent = styled.div`
  margin-top: 60px;
  text-align: center;
  max-width: 475px;
  margin: 0 auto;
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
  padding-bottom: 100%;
`

const StyledTurnTable = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  &.trun {
    animation: animation 1s linear infinite;
  }
  @keyframes animation {
    0% {
      transform: rotate(0deg);
    }
    20% {
      transform: rotate(-72deg);
    }
    40% {
      transform: rotate(-144deg);
    }
    60% {
      transform: rotate(-216deg);
    }
    80% {
      transform: rotate(-288deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
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

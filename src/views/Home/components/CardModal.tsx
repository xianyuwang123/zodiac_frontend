import React, { useMemo } from 'react'
import styled from 'styled-components'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalContent from '../../../components/ModalContent'
import useMobile from '../../../hooks/useMobile'
import CloseImg from '../../../assets/img/zodiac/home/close.png'
import { useCardInfo } from '../../../hooks/useCardInfo'

interface CardModalProps extends ModalProps {
  id: number | null
}

const CardModal: React.FC<CardModalProps> = ({ onDismiss, maxWidth = 295, id }) => {
  const isMobile = useMobile()
  const cardInfo = useCardInfo(id)

  const { zodiacImg, zodiacLevelImg, zodiacName } = useMemo(() => {
    if (cardInfo?.zgIndex && cardInfo?.zgLevel) {
      const zodiacName = cardInfo.zgIndex.slice(0, cardInfo.zgIndex.length - 1)
      const zodiacType = cardInfo.zgIndex.slice(-1)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const zodiacImg = require(`../../../assets/img/zodiac/nft/zg_${zodiacName}_${zodiacType}.png`).default
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const zodiacLevelImg = require(`../../../assets/img/zodiac/level/zg_${cardInfo?.zgLevel}.png`).default
      const nameList = [
        'Zodiac Dragon',
        'Zodiac Tiger',
        'Zodiac Snake',
        'Zodiac Dog',
        'Zodiac Horse',
        'Zodiac Ox',
        'Zodiac Monkey',
        'Zodiac Goat',
        'Zodiac Rooster',
        'Zodiac Pig',
        'Zodiac Rabbit',
        'Zodiac Rat',
      ]
      return {
        zodiacImg: <ZodiacImg src={zodiacImg} />,
        zodiacLevelImg: <ZodiacLevelImg src={zodiacLevelImg} />,
        zodiacName: nameList[parseInt(zodiacName) - 1],
      }
    }
    return {
      zodiacImg: null,
      zodiacLevelImg: null,
      zodiacName: '',
    }
  }, [cardInfo])

  return (
    <CardModalWrapper className={isMobile ? 'center-body' : ''} style={isMobile ? {} : { maxWidth: '295px' }}>
      <Modal maxWidth={maxWidth}>
        <ModalContent>
          <StyledWalletsWrapper>
            <StyledClose src={CloseImg} />
            {zodiacImg}
            <StyledText>
              <StyledId>{`# ${`0000000${id ? id : '0'}`.slice(-6)}`}</StyledId>
              <StyledName>
                {zodiacLevelImg}
                <span>{`${zodiacName}`}</span>
              </StyledName>
            </StyledText>
          </StyledWalletsWrapper>
        </ModalContent>
      </Modal>
    </CardModalWrapper>
  )
}

const CardModalWrapper = styled.div`
  &.center-body > div {
    justify-content: center;
    position: relative;
    max-height: initial;
    margin: 0 auto;
    min-width: 295px;
  }
`

const StyledClose = styled.img`
  position: absolute;
  left: 50%;
  bottom: -50px;
  transform: translateX(-50%);
  height: 30px;
  cursor: pointer;
`

const StyledWalletsWrapper = styled.div`
  width: 100%;
  min-height: 385px;
  position: relative;
`

const ZodiacImg = styled.img`
  width: 100%;
  border-radius: 10px 10px 0 0;
`

const ZodiacLevelImg = styled.img`
  height: 16px;
  margin-right: 20px;
`

const StyledText = styled.div`
  height: 90px;
  position: absolute;
  bottom: 0;
  width: 100%;
`

const StyledId = styled.div`
  text-align: center;
  margin: 14px auto 15px;
  font-size: 14px;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #c4c4c4;
`

const StyledName = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 18px;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #c4c4c4;
  }
`

export default CardModal

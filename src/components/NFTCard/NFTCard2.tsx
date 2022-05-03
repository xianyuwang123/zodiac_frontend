import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Card } from '../../types/Card'
import { useTranslation } from 'react-i18next'

const NFTCard: React.FC<{ cardInfo: Card }> = ({ cardInfo }) => {
  const { t } = useTranslation()
  const { zodiacImg, zodiacLevelImg, zodiacName } = useMemo(() => {
    if (cardInfo?.zgIndex && cardInfo?.zgLevel) {
      const zodiacName = parseInt(String(parseInt(cardInfo.zgIndex) / 10))
      const zodiacType = cardInfo.zgIndex.slice(-1)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const zodiacImg = require(`../../assets/img/zodiac/nft/zg_${zodiacName}_${zodiacType}.png`).default
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const zodiacLevelImg = require(`../../assets/img/zodiac/level/zg_${cardInfo?.zgLevel}.png`).default
      const nameList = [
        'Dragon NFT',
        'Tiger NFT',
        'Snake NFT',
        'Dog NFT',
        'Horse NFT',
        'Ox NFT',
        'Monkey NFT',
        'Goat NFT',
        'Rooster NFT',
        'Pig NFT',
        'Rabbit NFT',
        'Rat NFT',
      ]
      return {
        zodiacImg: <ZodiacImg src={zodiacImg} />,
        zodiacLevelImg: <ZodiacLevelImg src={zodiacLevelImg} />,
        zodiacName: nameList[zodiacName],
      }
    }
    return {
      zodiacImg: null,
      zodiacLevelImg: null,
    }
  }, [cardInfo])

  return (
    <>
      <StyleCard>
        <StyledTitle>
          <StyledId>{`# ${`0000000${cardInfo?.tokenId ? cardInfo.tokenId : '0'}`.slice(-6)}`}</StyledId>
          {zodiacLevelImg}
        </StyledTitle>
        {zodiacImg}
        <StyledName>{zodiacName}</StyledName>
      </StyleCard>
    </>
  )
}

const StyleCard = styled.div`
  border: 1px solid #3a3e51;
  border-radius: 10px;
  padding: 10px 10px 5px 10px;
  margin: 0 auto 5px;
  position: relative;
  background: #1d2633;
`

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Tip = styled.div`
  font-size: 12px;
  font-family: Poppins-Regular, Poppins;
  font-weight: 400;
  zoom: 0.7;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`

const ZodiacImg = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-top: 5px;
`

const ZodiacLevelImg = styled.img`
  height: 14px;
`

const StyledId = styled.div`
  text-align: center;
  font-size: 12px;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #c4c4c4;
  zoom: 0.8;
`

const StyledName = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-family: Poppins-SemiBold, Poppins;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
`

export default NFTCard

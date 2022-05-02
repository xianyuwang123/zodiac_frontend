import React, { useMemo, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Drawer, Tooltip } from 'antd'
import useMobile from '../../hooks/useMobile'
import { useWallet } from 'use-wallet'
import { useTranslation } from 'react-i18next'
import HealthImg from '../../assets/img/bunnyArmy/main/Health.png'
import Attack from '../../assets/img/bunnyArmy/main/Attack.png'
import Interval from '../../assets/img/bunnyArmy/main/Interval.png'
import Speed from '../../assets/img/bunnyArmy/main/Speed.png'
import Cooldown from '../../assets/img/bunnyArmy/main/Cooldown.png'
import DeployCost from '../../assets/img/bunnyArmy/main/deployCost.png'
import Range from '../../assets/img/bunnyArmy/main/range.png'
import { getBunnyQualityImg } from '../../zodiac/utils'
import BigNumber from 'bignumber.js/bignumber'

interface BunnyStatsProps {
  showAddress: boolean
  attributeInfo: any
  petCode: number
}

const BunnyStats: React.FC<BunnyStatsProps> = ({ showAddress, attributeInfo, petCode }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()
  const qualityValue = attributeInfo?.attribute?.rarity
  const ecSignature = window.localStorage.getItem('ecSignature')
  const calcValue = (input: number, level: number): number => {
    return Number(new BigNumber(input + (level > 0 ? ((level - 1) * input) / 5 : 0)).toFixed(0))
  }

  const level = Number(attributeInfo?.pet?.level)
  const healthy = Number(attributeInfo?.attribute?.healthy)
  const attack = Number(attributeInfo?.attribute?.attack)
  const attributeList = [
    {
      key: 0,
      title: t('market.health'),
      img: HealthImg,
      value: petCode === 0 ? '?' : calcValue(healthy, level) ? calcValue(healthy, level) : '-',
    },
    {
      key: 1,
      title: t('market.attack'),
      img: Attack,
      value: petCode === 0 ? '?' : calcValue(attack, level) ? calcValue(attack, level) : '-',
    },
    {
      key: 2,
      title: t('market.interval'),
      img: Interval,
      value: petCode === 0 ? '?' : attributeInfo?.attribute?.interval,
    },
    { key: 3, title: t('market.speed'), img: Speed, value: petCode === 0 ? '?' : attributeInfo?.attribute?.speed },
    {
      key: 4,
      title: t('market.deployCost'),
      img: DeployCost,
      value: petCode === 0 ? '?' : attributeInfo?.attribute?.deployCost,
    },
    {
      key: 5,
      title: t('market.cooldown'),
      img: Cooldown,
      value: petCode === 0 ? '?' : attributeInfo?.attribute?.deployCost,
    },
  ]
  const rangeMin = petCode === 0 ? '?' : attributeInfo?.attribute?.rangeMin
  const rangeMax = petCode === 0 ? '?' : attributeInfo?.attribute?.rangeMax

  const attributeRange = {
    key: 6,
    title: t('market.range'),
    img: Range,
    value: rangeMin !== undefined && rangeMax !== undefined ? `${rangeMin} - ${rangeMax}` : '-',
  }

  const qualityImg: string = getBunnyQualityImg(qualityValue ?? '')

  return (
    <>
      <StyledAboutWrapper>
        <StyledAboutTitleWrapper>
          <StyledAboutTitle>{t('homePage.stats_about')}</StyledAboutTitle>
          {!ecSignature ? <StyledMessage>{t('market.sign_message')}</StyledMessage> : ''}
        </StyledAboutTitleWrapper>
        <StyledAboutDetail>
          <StyledAboutDetailList>
            <div>
              <StyledAboutDetailTitle>{t('homePage.stats_quality')}</StyledAboutDetailTitle>
              {qualityImg ? <StyledQualityImg src={qualityImg} /> : '-'}
            </div>
            <div>
              <StyledAboutDetailTitle>{t('homePage.stats_level')}</StyledAboutDetailTitle>
              <StyledAboutDetailNum>{attributeInfo?.pet?.level ?? '-'}</StyledAboutDetailNum>
            </div>
            <div>
              <StyledAboutDetailTitle>{t('homePage.count')}</StyledAboutDetailTitle>
              <StyledAboutDetailNum>{attributeInfo?.pet?.breedCount ?? '-'}</StyledAboutDetailNum>
            </div>
          </StyledAboutDetailList>
          {showAddress && (
            <StyledAboutAddress>
              <StyledAddressTitle>{t('homePage.owner')}</StyledAddressTitle>
              <StyledAddress>{attributeInfo?.pet?.walletAddress ?? '-'}</StyledAddress>
            </StyledAboutAddress>
          )}
        </StyledAboutDetail>
      </StyledAboutWrapper>
      <StyledStatsWrapper>
        <StyledStatsTitle>{t('homePage.stats')}</StyledStatsTitle>
        <StyledStatsDetail>
          {attributeList.map((item) => {
            return (
              <StyledDetailWrapper key={item.key}>
                <StyledDetailTitle>{item.title}</StyledDetailTitle>
                <Tooltip placement="top" title={item.value}>
                  <StyledAttriWrapper>
                    <StyledStatsImg>
                      <img src={item.img} />
                    </StyledStatsImg>
                    <StyledStatsNum>{item.value ?? '-'}</StyledStatsNum>
                  </StyledAttriWrapper>
                </Tooltip>
              </StyledDetailWrapper>
            )
          })}
          <StyledDetailWrapper>
            <StyledDetailTitle>{attributeRange.title}</StyledDetailTitle>
            <Tooltip placement="top" title={attributeRange.value}>
              <StyledAttriWrapper>
                <StyledStatsImg>
                  <img src={attributeRange.img} />
                </StyledStatsImg>
                <StyledStatsNum className={'range'}>{attributeRange.value}</StyledStatsNum>
              </StyledAttriWrapper>
            </Tooltip>
          </StyledDetailWrapper>
        </StyledStatsDetail>
      </StyledStatsWrapper>
    </>
  )
}

const StyledMessage = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin: 0 auto;
`

const StyledQualityImg = styled.img`
  width: auto;
  height: 16px;
  object-fit: cover;
  margin-top: 8px;
`

const StyledAboutDetailNum = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-top: 8px;
  height: 16px;
  line-height: 16px;
`

const StyledAboutDetailTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #777e90;
`

const StyledAddressTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #777e90;
`

const StyledAddress = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #fff;
`

const StyledAboutAddress = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
`

const StyledAboutDetailList = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    color: #fff;
  }
`

const StyledAboutDetail = styled.div`
  border: 2px solid #3a3e51;
  border-radius: 10px;
  margin-top: 2px;
  padding: 14px;
  display: flex;
  flex-direction: column;
`

const StyledAboutTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #777e90;
`

const StyledAboutTitleWrapper = styled.div`
  display: flex;
`

const StyledAboutWrapper = styled.div`
  margin-top: 14px;
`

const StyledStatsNum = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-left: 10px;
  white-space: pre;
  width: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  &.range {
    overflow: unset;
  }
`

const StyledStatsImg = styled.div`
  width: 25px;
  height: 25px;
  background: #3a3f50;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  & > img {
    object-fit: cover;
    width: auto;
    height: auto;
  }
`

const StyledAttriWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const StyledDetailTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #777e90;
  white-space: pre;
`

const StyledDetailWrapper = styled.div`
  width: 74px;
  display: flex;
  flex-direction: column;
  margin: 4px;
`

const StyledStatsDetail = styled.div`
  border: 2px solid #3a3e51;
  border-radius: 10px;
  margin-top: 2px;
  padding: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const StyledStatsTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #777e90;
`

const StyledStatsWrapper = styled.div`
  margin-top: 20px;
`
export default BunnyStats

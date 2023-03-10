import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import MiningImg from '../../../assets/img/zodiac/side/mining.png'
import { useTranslation } from 'react-i18next'
import { getDisplayBalance } from '../../../utils/formatBalance'
import CardList from './CardList'
import { Button } from 'antd'
import Dots from '../../../components/Dots'
import { useHarvest } from '../../../hooks/useHarvest'
import { useUserInfo } from '../../../hooks/useUserInfo'
import { useCardList } from '../../../hooks/useCardList'

const OpeartePanel: React.FC = () => {
  const { t } = useTranslation()

  const [pending, setPending] = useState<boolean>(false)
  const listInfo = useCardList()

  const { onHarvest } = useHarvest()
  const userInfo = useUserInfo()

  const handleHarvest = async () => {
    setPending(true)
    try {
      const txHash = await onHarvest()
      console.log(txHash)
    } catch (error: any) {
      if (error?.code === 4001) {
        //dummy
      }
    } finally {
      setPending(false)
    }
  }

  const stakeNFT = useMemo(() => {
    if (listInfo) {
      const length = listInfo.filter((card) => card.inStaking).length
      return length
    }
    return '0'
  }, [listInfo])

  return (
    <>
      <StyleTitleWrapper>
        <StyleTitleLeft>
          <StyleTitleImg src={MiningImg} />
          <StyleTitle>{t('route.mining')}</StyleTitle>
        </StyleTitleLeft>
      </StyleTitleWrapper>
      <StyleoOpeartePanel>
        <StyledRewardInfo>
          <StyledRewardInfoLeft>
            <div>{'Participate'}</div>
            <div>{`${stakeNFT} NFT`}</div>
          </StyledRewardInfoLeft>
          <StyledRewardInfoRight>
            <div>{'Total Reward'}</div>
            <div>{`${userInfo?.totalEarn ? getDisplayBalance(userInfo?.totalEarn, 18, true, 2) : '0'} UDP`}</div>
          </StyledRewardInfoRight>
          <StyledRewardInfoRight>
            <div>{'Total Point'}</div>
            <div>{`${userInfo?.totalPoint}`}</div>
          </StyledRewardInfoRight>
        </StyledRewardInfo>
        <StyledReward>
          <StyledRewardLeft>
            <div>{'Reward'}</div>
            <div>{`${
              userInfo?.pendingReward ? getDisplayBalance(userInfo?.pendingReward, 18, true, 2) : '0'
            } UDP`}</div>
          </StyledRewardLeft>
          <Button shape="round" onClick={handleHarvest} disabled={pending}>
            <Dots show={pending} text={t('actions.harvest')} />
          </Button>
        </StyledReward>
      </StyleoOpeartePanel>
      <CardList />
    </>
  )
}

const StyleTitleWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

const StyleTitleLeft = styled.div`
  display: flex;
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

const StyleoOpeartePanel = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 18px auto 20px;
  border: 1px solid #29374b;
  border-radius: 10px;
`

const StyledReward = styled.div`
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #29374b;
  & > button {
    display: flex;
    justify-content: center;
    width: 90px;
    height: 30px;
    line-height: 22px;
    background: #45b26b;
    border-radius: 20px;
    font-size: 14px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.9;
    border-color: #45b26b;
  }
  .ant-btn:hover,
  .ant-btn:focus {
    color: #ffffff;
    background: #45b26b;
    opacity: 1;
    border-color: #45b26b;
  }
  .ant-btn:disabled {
    color: rgba(0, 0, 0, 0.25);
    background: #d9d9d9;
  }
`

const StyledRewardLeft = styled.div`
  & > :first-child {
    font-size: 14px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #777e90;
    line-height: 16px;
  }
  & > :last-child {
    font-size: 16px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: #45b26b;
    line-height: 24px;
  }
`

const StyledRewardInfo = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

const StyledRewardInfoLeft = styled.div`
  flex: 0 0 30%;
  border-right: 1px solid #29374b;
  & > :first-child {
    font-size: 14px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #777e90;
    line-height: 16px;
  }
  & > :last-child {
    font-size: 16px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: #ffffff;
    line-height: 24px;
  }
`

const StyledRewardInfoRight = styled.div`
  margin-left: 20px;
  & > :first-child {
    font-size: 12px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #777e90;
    line-height: 16px;
  }
  & > :last-child {
    font-size: 16px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: #ffffff;
    line-height: 24px;
  }
`

export default OpeartePanel

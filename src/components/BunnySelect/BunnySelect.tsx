import React from 'react'
import styled from 'styled-components'
import { Button, Drawer, Input } from 'antd'
import useMobile from '../../hooks/useMobile'
import { useTranslation } from 'react-i18next'
import BunnyCard from '../NFTCard'

interface BunnySelectProps {
  onDrawerClose?: () => void
}

const BunnySelect: React.FC<BunnySelectProps> = ({ onDrawerClose }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()

  // todo delete
  const bunnyInfo = {
    banTime: '',
    basePetCode: 0,
    birthPetCode: 106,
    breedCount: 0,
    createtime: '2021-10-30 04:18:02',
    daddy: 0,
    evolveCount: 0,
    extra: '{}',
    gender: 1,
    level: 0,
    mommy: 0,
    name: 'Charmer Bunny',
    petCode: 106,
    petId: '651678312741220352',
    petToken: 115,
    transactionNo: '0xd3524fe95d4b4599ae7f7744b00cce7ac6c121bbc5ed7b8f1170d24538286763',
    userId: '650427621989167104',
    walletAddress: '1',
  }

  return (
    <StyledContent>
      <StyledDrawerTitle>{t('homePage.selectBunny')}</StyledDrawerTitle>
      <StyledCardList>
        {/*<BunnyCard bunnyInfo={bunnyInfo} isSold={true} showLabelPrice={false} isSaleAndBreed={false} />
        <BunnyCard bunnyInfo={bunnyInfo} isSold={false} showLabelPrice={true} isSaleAndBreed={false} />
        <BunnyCard bunnyInfo={bunnyInfo} isSold={false} showLabelPrice={false} isSaleAndBreed={false} />
        <BunnyCard bunnyInfo={bunnyInfo} isSold={false} showLabelPrice={false} isSaleAndBreed={true} />*/}
      </StyledCardList>
    </StyledContent>
  )
}

const StyledContent = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 14px;
  width: 100%;
`

const StyledDrawerTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  padding-right: 10px;
`

const StyledCardList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  & > div:nth-child(2n) {
    margin-left: 5px;
  }
`

export default BunnySelect

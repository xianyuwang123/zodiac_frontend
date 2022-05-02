import React from 'react'
import styled from 'styled-components'
import { Button, Drawer } from 'antd'
import useMobile from '../../../hooks/useMobile'
import { useTranslation } from 'react-i18next'
import maleBunny from '../../../assets/img/bunnyArmy/main/male.png'
import femaleBunny from '../../../assets/img/bunnyArmy/main/female.png'
import BunnyStats from '../../../components/BunnyStats'

interface CardDetailProps {
  bunnyInfos: any
  attributeInfo: any
}

const CardDetail: React.FC<CardDetailProps> = ({ bunnyInfos, attributeInfo }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()

  return (
    <StyledBunnyDetailWrapper>
      <StyledIdWrapper>
        <StyledNumber># {bunnyInfos.petToken}</StyledNumber>
        <StyledName>{bunnyInfos.name}</StyledName>
        <StyledGender src={bunnyInfos.gender === 0 ? femaleBunny : maleBunny} />
      </StyledIdWrapper>
      <BunnyStats petCode={bunnyInfos.petCode ?? 0} showAddress={false} attributeInfo={attributeInfo} />
    </StyledBunnyDetailWrapper>
  )
}

const StyledGender = styled.img`
  width: auto;
  height: auto;
  object-fit: cover;
  margin-left: 10px;
`

const StyledNumber = styled.div`
  padding: 2px 6px;
  background: #3f38dd;
  border-radius: 5px;
  color: #fff;
`

const StyledName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-left: 10px;
`

const StyledIdWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledBunnyDetailWrapper = styled.div`
  background: #242735;
  padding: 20px 15px;
`

export default CardDetail

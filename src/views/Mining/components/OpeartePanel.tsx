import React from 'react'
import styled from 'styled-components'
import MiningImg from '../../../assets/img/zodiac/side/mining.png'
import { useTranslation } from 'react-i18next'
const OpeartePanel: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <StyleTitleWrapper>
        <StyleTitleLeft>
          <StyleTitleImg src={MiningImg} />
          <StyleTitle>{t('route.mining')}</StyleTitle>
        </StyleTitleLeft>
      </StyleTitleWrapper>
      <StyledList>{'Coming soon...'}</StyledList>
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

const StyledList = styled.div`
  margin: 170px auto 0;
  font-size: 18px;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #c4c4c4;
  text-align: center;
`

export default OpeartePanel

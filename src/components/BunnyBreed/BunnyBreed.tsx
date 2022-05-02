import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Drawer, Input } from 'antd'
import useMobile from '../../hooks/useMobile'
import { useTranslation } from 'react-i18next'
import BoxingRab_real_right from '../../assets/img/bunnyArmy/main/BoxingRab_real_right.png'
import BoxingRab_empty from '../../assets/img/bunnyArmy/main/BoxingRab_empty.png'
import HEART from '../../assets/img/bunnyArmy/main/HEART.png'
import maleBunny from '../../assets/img/bunnyArmy/main/male.png'
import femaleBunny from '../../assets/img/bunnyArmy/main/female.png'
import carrot_coin from '../../assets/img/bunnyArmy/main/carrot_coin.png'
import bac_icon from '../../assets/img/bunnyArmy/main/bac_icon.png'
import BackDrawer from '../BackDrawer'
import BunnySelect from '../BunnySelect'

interface BunnyBreedProps {
  onDrawerClose: (status: string) => void
}

const BunnyBreed: React.FC<BunnyBreedProps> = ({ onDrawerClose }) => {
  const { t } = useTranslation()
  const isMobile = useMobile()
  const [breedDrawer, setBreedDrawer] = useState<boolean>(false)

  const onBreedDrawerShow = () => {
    setBreedDrawer(true)
  }

  const onBreedDrawerClose = () => {
    setBreedDrawer(false)
  }

  return (
    <>
      <StyledContent>
        <StyledDesc>A female Bunny and a male Bunny can breed a baby Bunny.</StyledDesc>
        <StyledBunnyImgWrapper>
          <StyledBunnyImg src={BoxingRab_real_right} />
          <StyledBunnyLove src={HEART} />
          <StyledBunnyImg src={BoxingRab_empty} />
        </StyledBunnyImgWrapper>
        <StyleGenderWrapper>
          <StyledGender src={maleBunny} />
          <StyledGender src={femaleBunny} />
        </StyleGenderWrapper>
        <StyledCountWrapper>
          <StyledCountText>breed count</StyledCountText>
          <StyledCountText>select an bunny</StyledCountText>
        </StyledCountWrapper>
        <StyledNumWrapper>
          <StyledNumText>1</StyledNumText>
          <StyledNumText>1</StyledNumText>
        </StyledNumWrapper>
        <StyledPriceWrapper>
          <StyledPrice>
            <StyledPriceLabel>BREEDING FEE</StyledPriceLabel>
            <StyledPriceContent>
              <StylePanelImg src={bac_icon} />
              <div>
                <StyledPriceNum>
                  <span className="short">0</span>
                  <span className="default"> / 2</span>
                </StyledPriceNum>
                <StyledPriceLabel>BAC</StyledPriceLabel>
              </div>
            </StyledPriceContent>
          </StyledPrice>
          <StyledPrice>
            <StyledPriceContent>
              <StylePanelImg src={carrot_coin} />
              <div>
                <StyledPriceNum>
                  <span className="fill">200</span>
                  <span className="default"> / 100</span>
                </StyledPriceNum>
                <StyledPriceLabel>CAR</StyledPriceLabel>
              </div>
            </StyledPriceContent>
          </StyledPrice>
          <StyledButton onClick={onBreedDrawerShow}>BREED</StyledButton>
        </StyledPriceWrapper>
      </StyledContent>
      <BackDrawer
        className="breedBunny-drawer"
        visible={breedDrawer}
        onCloseDrawer={onBreedDrawerClose}
        children={<BunnySelect />}
      />
    </>
  )
}

const StyledPriceContent = styled.div`
  display: flex;
  align-items: center;
`

const StylePanelImg = styled.img`
  width: 30px;
  height: 32px;
  object-fit: cover;
`

const StyledButton = styled(Button)`
  width: 80px;
  height: 46px;
  border-radius: 5px;
  background: #37ae45;
  border-color: #37ae45;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover,
  &:focus {
    background: #37ae45;
    border-color: #37ae45;
    color: #fff;
  }
`

const StyledPriceWrapper = styled.div`
  border: 2px solid #3a3e51;
  border-radius: 5px;
  margin: 20px 15px 24px 15px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > :nth-child(2) {
    margin-top: 18px;
  }
`

const StyledPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`

const StyledPriceLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #777e90;
`

const StyledPriceNum = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-left: 6px;
  .short {
    color: #ff6609;
  }
  .fill {
    color: #37ae45;
  }
  .default {
    color: #777e90;
  }
`

const StyledNumText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
`

const StyledNumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 92px;
`

const StyledCountText = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #777e90;
`

const StyledCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding: 0 50px 0 62px;
`

const StyleGenderWrapper = styled.div`
  margin-top: 10px;
  padding: 0 90px;
  display: flex;
  justify-content: space-between;
`

const StyledGender = styled.img`
  width: auto;
  height: auto;
  object-fit: cover;
`

const StyledContent = styled.div`
  margin-top: 63px;
  text-align: center;
`

const StyledDesc = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  padding: 0 40px;
`

const StyledBunnyImgWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledBunnyImg = styled.img`
  width: 148px;
  height: 121px;
  object-fit: cover;
`

const StyledBunnyLove = styled.img`
  width: 16px;
  height: 14px;
  object-fit: cover;
  margin: 0 12px;
`

export default BunnyBreed

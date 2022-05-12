import React, { useMemo } from 'react'
import styled from 'styled-components'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalContent from '../../../components/ModalContent'
import useMobile from '../../../hooks/useMobile'
import CloseImg from '../../../assets/img/zodiac/home/close.png'
import ModalBg from '../../../assets/img/zodiac/mining/modalBg.png'

interface CardModalProps extends ModalProps {
  multiply: number | null
}

const MultiplyModal: React.FC<CardModalProps> = ({ onDismiss, maxWidth = 220, multiply }) => {
  const isMobile = useMobile()

  return (
    <CardModalWrapper className={'center-body MultiplyModal'} style={isMobile ? {} : { maxWidth: '220px' }}>
      <Modal maxWidth={maxWidth}>
        <ModalContent>
          <StyledWalletsWrapper>
            <StyledClose onClick={onDismiss} src={CloseImg} />
            <StyledText>
              <StyledTitle>
                {'COMPUTING'}
                <span>{'POWER'}</span>
              </StyledTitle>
              <StyledId>{`X ${multiply}`}</StyledId>
            </StyledText>
            <Bg src={ModalBg} />
          </StyledWalletsWrapper>
        </ModalContent>
      </Modal>
    </CardModalWrapper>
  )
}

const Bg = styled.img`
  position: absolute;
  top: -150px;
  left: -76px;
  width: 374px;
  z-index: -1;
`

const CardModalWrapper = styled.div`
  position: relative;
  &.center-body > div {
    justify-content: center;
    position: relative;
    max-height: initial;
    margin: 0 auto;
    min-width: 220px;
  }
  &.MultiplyModal > div > div {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.18) 100%) !important;
  }
`

const StyledTitle = styled.div`
  height: 83px;
  border: 4px solid #88ffb9;
  border-radius: 20px;
  width: calc(100% + 8px);
  margin-left: -4px;
  margin-top: -4px;
  background: linear-gradient(180deg, #1c466c 0%, #212121 100%);
  font-size: 26px;
  font-family: Paytone One-Regular, Paytone One;
  font-weight: 400;
  line-height: 30px;
  background: linear-gradient(137deg, #e4ffb7 0%, #88ffb9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  & > span {
    display: block;
    font-size: 46px;
    font-family: Paytone One-Regular, Paytone One;
    font-weight: 400;
    background: linear-gradient(137deg, #e4ffb7 0%, #88ffb9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const StyledClose = styled.img`
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: -50px;
  transform: translateX(-50%);
  height: 30px;
  cursor: pointer;
`

const StyledWalletsWrapper = styled.div`
  width: 100%;
  min-height: 192px;
  position: relative;
  border-radius: 20px 20px 15px 15px;
  opacity: 1;
  border: 4px solid #88ffb9;
`

const StyledText = styled.div`
  height: 192px;
  bottom: 0;
  width: 100%;
`

const StyledId = styled.div`
  text-align: center;
  font-size: 96px;
  line-height: 100px;
  font-family: Paytone One-Regular, Paytone One;
  font-weight: 400;
  background: linear-gradient(166deg, #00e5c4 0%, #00bed5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #c4c4c4;
  letter-spacing: -4px;
`

export default MultiplyModal

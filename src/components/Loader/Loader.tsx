import React from 'react'
import styled, { keyframes } from 'styled-components'

import CardIcon from '../CardIcon'
import logoLoading from '../../assets/img/zodiac/home/logo2.png'

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>
      <CardIcon>
        <StyledToken>
          <StyledLoadingImg src={logoLoading} />
        </StyledToken>
      </CardIcon>
      {!!text && <StyledText>{text}</StyledText>}
    </StyledLoader>
  )
}

const spin = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: rotate(1);
  }
`

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledToken = styled.div`
  font-size: 32px;
  position: relative;
  animation: 2s ${spin} infinite;
`

const StyledText = styled.div`
  color: ${(props) => props.theme?.color?.grey?.[400]};
`

const StyledLoadingImg = styled.img`
  border-radius: 50%;
`

export default Loader

import React from 'react'
import styled from 'styled-components'

interface CardTitleProps {
  text?: string
  color?: string
  size?: number
  bold?: boolean
}

const CardTitle: React.FC<CardTitleProps> = ({ text, size, bold, color }) => (
  <StyledCardTitle size={size} bold={bold} color={color}>
    {text}
  </StyledCardTitle>
)

interface StyledCardTitleProps {
  size?: number
  bold?: boolean
}

const StyledCardTitle = styled.div<StyledCardTitleProps>`
  font-size: 16px;
  font-family: 'Poppins-SemiBold', 'Poppins';
  font-weight: 600;
  color: #ffffff;
  margin-left: 20px;
  line-height: 32px;
  padding: 0;
  text-align: center;
`

export default CardTitle

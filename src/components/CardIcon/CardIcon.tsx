import React from 'react'
import styled from 'styled-components'

interface CardIconProps {
  children?: React.ReactNode
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => <StyledCardIcon>{children}</StyledCardIcon>

const StyledCardIcon = styled.div`
  font-size: 36px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: ${(props) => props.theme?.spacing?.[3]}px;
`

export default CardIcon

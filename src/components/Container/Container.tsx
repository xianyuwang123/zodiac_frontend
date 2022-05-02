import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

interface ContainerProps {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'md2' | 'unset'
  style?: React.CSSProperties
}

const Container: React.FC<ContainerProps> = ({ children, style, size = 'md' }) => {
  const { siteWidth } = useContext<{ siteWidth: number }>(ThemeContext)

  let width: number
  switch (size) {
    case 'unset':
      width = 0
      break
    case 'sm':
      width = siteWidth / 2
      break
    case 'md':
      width = (siteWidth * 2) / 3
      break
    case 'md2':
      width = (siteWidth * 3) / 4
      break
    case 'lg':
    default:
      width = siteWidth
  }
  return (
    <StyledContainer width={width} style={style}>
      {children}
    </StyledContainer>
  )
}

interface StyledContainerProps {
  width: number
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
`

export default Container

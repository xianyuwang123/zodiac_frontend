import React from 'react'
import styled from 'styled-components'

import Loader from '../Loader'

interface FallbackProps {
  size?: number
}

const Fallback: React.FC<FallbackProps> = ({ size = 64 }) => {
  return (
    <StyledFallback>
      <Loader />
    </StyledFallback>
  )
}

const StyledFallback = styled.div`
  background-color: #1d2633;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Fallback

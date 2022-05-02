import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'

import styled from 'styled-components'

export interface ValueProps {
  value?: string | number
  decimals?: number
  fontSize?: number
  color?: string
  firstDuration?: number
  duration?: number
  fontWeight?: number
}

interface StyledValueProps {
  fontSize?: number
  color?: string
  fontWeight?: number
}

const Value: React.FC<ValueProps> = ({
  value,
  decimals,
  fontSize,
  color,
  firstDuration = 1,
  duration = 1,
  fontWeight,
}) => {
  const [start, updateStart] = useState(0)
  const [end, updateEnd] = useState(0)

  useEffect(() => {
    if (typeof value === 'number' && value) {
      updateStart(end)
      updateEnd(value)
    }
  }, [value])

  const onEnd = () => {
    updateStart(end)
  }

  return (
    <StyledValue fontSize={fontSize} color={color} fontWeight={fontWeight}>
      {typeof value == 'string' ? (
        value
      ) : (
        <CountUp
          start={start}
          end={end}
          decimals={decimals !== undefined ? decimals : end < 0 ? 4 : end > 1e5 ? 0 : 3}
          duration={start === 0 ? firstDuration : duration}
          separator=","
          onEnd={onEnd}
        />
      )}
    </StyledValue>
  )
}

const StyledValue = styled.div<StyledValueProps>`
  color: ${(props) => (!props.color ? props.theme.color.grey[600] : props.color)};
  font-size: ${(props) => (!props.fontSize ? 36 : props.fontSize)}px;
  font-weight: ${(props) => (!props.fontWeight ? 0 : props.fontSize)}px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: ${(props) => (!props.fontSize ? 18 : props.fontSize)}px;
  }
`

export default Value

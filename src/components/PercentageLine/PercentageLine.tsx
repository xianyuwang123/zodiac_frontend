import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { toFixedNumber } from '../../utils'

type PercentageLineOrientation = 'horizontal' | 'vertical'

interface PercentageLineProps {
  orientation?: PercentageLineOrientation
  size?: number
  rate0: number
  rate1?: number
  color0?: string
  color1?: string
  title0?: string
  title1?: string
  gap?: number
}

const PercentageLine: React.FC<PercentageLineProps> = ({
  orientation = 'vertical',
  size = 4,
  gap = 3,
  rate0,
  rate1,
  color0 = '#013dc5',
  color1 = '#2bac40',
  title0,
  title1,
}) => {
  const { color } = useContext(ThemeContext)

  let boxShadow = `0 -1px 0px ${color.grey[300]}`
  if (orientation === 'vertical') {
    boxShadow = `-1px 0px 0px ${color.grey[300]}ff`
  }

  const Content = useMemo(() => {
    const length0 = toFixedNumber(rate0, 2)
    const length1 = rate1 ? toFixedNumber(rate1, 2) : 100 - length0

    return (
      <StyledPercentageLine orientation={orientation} size={size}>
        <StyledLine0
          size={size}
          color={color0}
          length={length0}
          orientation={orientation}
          title={title0 ? `${title0} : ${length0}%` : `${length0}%`}
        ></StyledLine0>
        <StyledSep size={size} gap={gap} orientation={orientation}></StyledSep>
        <StyledLine1
          size={size}
          color={color1}
          length={length1}
          orientation={orientation}
          title={title1 ? `${title1} : ${length1}%` : `${length1}%`}
        ></StyledLine1>
      </StyledPercentageLine>
    )
  }, [orientation, size, rate0, rate1, color0, color1])

  return Content
}

interface StyledPercentageLineProps {
  orientation?: PercentageLineOrientation
  size?: number
}

interface StyledLineProps {
  size: number
  color: string
  length: number
  orientation?: PercentageLineOrientation
}
interface StyledSep {
  size: number
  gap: number
  orientation?: PercentageLineOrientation
}

const StyledPercentageLine = styled.div<StyledPercentageLineProps>`
  display: flex;
  flex-direction: ${(props) => (props.orientation === 'vertical' ? 'column' : 'row')};
  background-color: ${(props) => props.theme.color.grey[100]};
  height: ${(props) => (props.orientation === 'vertical' ? '100%' : `${props?.size || 1}px`)};
  width: ${(props) => (props.orientation === 'vertical' ? `${props?.size || 1}px` : '100%')};
`
const StyledLine0 = styled.span<StyledLineProps>`
  display: flex;
  height: ${(props) => (props.orientation === 'vertical' ? `${props.length}%` : `${props?.size || 1}px`)};
  width: ${(props) => (props.orientation === 'vertical' ? `${props?.size || 1}px` : `${props.length}%`)};
  background: ${(props) => props.color};
  border-radius: ${(props) => (props.orientation === 'vertical' ? '2px 2px 0px 0px' : '2px 0px 0px 2px')};
`
const StyledLine1 = styled.span<StyledLineProps>`
  display: flex;
  height: ${(props) => (props.orientation === 'vertical' ? `${props.length}%` : `${props?.size || 1}px`)};
  width: ${(props) => (props.orientation === 'vertical' ? `${props?.size || 1}px` : `${props.length}%`)};
  background: ${(props) => props.color};
  border-radius: ${(props) => (props.orientation === 'vertical' ? '0px 0px 2px 2px' : '2px 0px 0px 2px')};
`
const StyledSep = styled.span<StyledSep>`
  display: flex;
  height: ${(props) => (props.orientation === 'vertical' ? `${props.gap}px` : `${props?.size || 1}px`)};
  width: ${(props) => (props.orientation === 'vertical' ? `${props?.size || 1}px` : `${props.gap}px`)};
`

export default PercentageLine

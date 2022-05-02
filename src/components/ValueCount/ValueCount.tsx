import React, { useState, useEffect } from 'react'
import styled, { ThemedStyledProps } from 'styled-components'
import Value, { ValueProps } from '../Value'
import Spacer from '../Spacer'

interface ValueCountProps extends ValueProps {
  label?: string
  prefixValue?: string
}

const ValueCount: React.FC<ValueCountProps> = ({ label, prefixValue, value, decimals, fontSize, color, duration }) => {
  return (
    <StyledValueCount>
      <ValueStyleTop>
        <StyledTextLabel>{label}</StyledTextLabel>
      </ValueStyleTop>
      <ValueStylebottom>
        <StyleNumberIcon className={`l-12 l-${value?.toString().length}`}>
          {prefixValue ? <StyledText>{prefixValue}</StyledText> : null}
        </StyleNumberIcon>
        <StyleNumber>
          <Value value={value} decimals={decimals} fontSize={fontSize} color={color ?? '#333'} duration={duration} />
        </StyleNumber>
      </ValueStylebottom>
    </StyledValueCount>
  )
}

const ValueStyleTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-top: 0px;
  }
`

const ValueStylebottom = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 32px;
  font-family: Kanit-Bold, Kanit;
  font-weight: bold;
  color: #333;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    position: absolute;
    left: 0;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 16px;
  }
`

const StyledText = styled.div``

const StyledTextLabel = styled.div`
  font-size: 16px;
  font-family: Kanit-Regular, Kanit;
  font-weight: 400;
  color: #999999;
`

const StyleNumberIcon = styled.div`
  flex: 0 0 38%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 0 0 30%;
    &.l-8,
    &.l-7 {
      flex: 0 0 35%;
    }
    &.l-9 {
      flex: 0 0 34%;
    }
    &.l-10 {
      flex: 0 0 33%;
    }
    &.l-12,
    &.l-11 {
      flex: 0 0 30%;
    }
  }
`

const StyleNumber = styled.div`
  flex: 1;
`

const StyledValueCount = styled.div`
  width: 640px;
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin: 0;
    width: 100%;
  }
`

export default ValueCount

import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string
  ellipsis?: boolean
  width?: string
  fontSize?: number
}

const Label: React.FC<LabelProps> = ({ text, ellipsis }) =>
  ellipsis ? <StyleTruncatedLable title={text}>{text}</StyleTruncatedLable> : <StyledLabel>{text}</StyledLabel>

const StyledLabel = styled.div<LabelProps>`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: ${(props) => (!props.fontSize ? 'inherit' : props.fontSize + 'px')};
`

const StyleTruncatedLable = styled.div<LabelProps>`
  color: ${(props) => props.theme.color.grey[400]};
  width: ${(props) => props.width || '100%'};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export default Label

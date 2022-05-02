import React from 'react'
import styled from 'styled-components'

import Spacer from '../Spacer'

interface ModalActionsProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

const ModalActions: React.FC<ModalActionsProps> = ({ children, style }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions style={style}>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>{child}</StyledModalAction>
          {i < l - 1 && <Spacer />}
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.grey[100]}00;
  display: flex;
  margin: 0;
  padding: ${(props) => props.theme.spacing[4]}px;
`

const StyledModalAction = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999;
`

export default ModalActions

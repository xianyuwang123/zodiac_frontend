import React from 'react'
import styled, { keyframes } from 'styled-components'

export interface ModalProps {
  onDismiss?: () => void
  maxWidth?: number
}

const Modal: React.FC<ModalProps> = ({ children, maxWidth }) => {
  return (
    <StyledResponsiveWrapper maxWidth={maxWidth}>
      <StyledModal>{children}</StyledModal>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`
interface StyledModalProps {
  maxWidth?: number
}
const StyledResponsiveWrapper = styled.div<StyledModalProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: ${(props) => props.maxWidth || 512}px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
  }
`

const StyledModal = styled.div`
  padding: 0;
  background: #1a1d22;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
`

const StyledModalContent = styled.div``

export default Modal

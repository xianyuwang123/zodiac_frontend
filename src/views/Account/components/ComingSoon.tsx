import React, { useMemo } from 'react'
import styled from 'styled-components'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalContent from '../../../components/ModalContent'
import useMobile from '../../../hooks/useMobile'
import Dots from '../../../components/Dots'

const ComingSoonModal: React.FC<ModalProps> = ({ onDismiss, maxWidth = 295 }) => {
  const isMobile = useMobile()

  return (
    <CardModalWrapper className={isMobile ? 'center-body' : ''} style={isMobile ? {} : { maxWidth: '295px' }}>
      <Modal maxWidth={maxWidth}>
        <ModalContent>
          <StyledWalletsWrapper>
            <Dots show={true} text={'Coming soon'} />
          </StyledWalletsWrapper>
        </ModalContent>
      </Modal>
    </CardModalWrapper>
  )
}

const CardModalWrapper = styled.div`
  &.center-body > div {
    justify-content: center;
    position: relative;
    max-height: initial;
    margin: 0 auto;
    min-width: 295px;
  }
`

const StyledWalletsWrapper = styled.div`
  width: 295px;
  text-align: center;
  min-height: 65px;
  line-height: 65px;
  background: rgba(26, 29, 34, 0.95);
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  border: 1px solid rgba(41, 55, 75, 0.95);
  font-size: 18px;
  font-family: Poppins-Medium, Poppins;
  font-weight: 500;
  color: #c4c4c4;
`

export default ComingSoonModal

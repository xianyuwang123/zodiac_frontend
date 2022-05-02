import React from 'react'
import styled from 'styled-components'

import UseNetwork from '../../hooks/useNetwork'

const NetworkDetector: React.FC = () => {
  const { correct, targetNetworkName: networkName } = UseNetwork()

  return !correct ? (
    <StyledNetworkDetector>
      <StyledNetworkDetectorInner>
        Incorrect Network! Please check and switch to {networkName}
      </StyledNetworkDetectorInner>
    </StyledNetworkDetector>
  ) : null
}

const StyledNetworkDetector = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
`
const StyledNetworkDetectorInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${(props) => props.theme.topBarSize}px;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`

export default NetworkDetector

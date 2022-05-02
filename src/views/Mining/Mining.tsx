import React from 'react'
import styled from 'styled-components'
import useEagerConnect from '../../hooks/useEagerConnect'
import useInactiveListener from '../../hooks/useInactiveListener'
import WalletNotConnectWrapper from '../../components/WalletNotConnectModal/WalletNotConnectWrapper'
import OpeartePanel from './components/OpeartePanel'

const Mining: React.FC = () => {
  useInactiveListener()
  useEagerConnect()

  return (
    <>
      <StyledAccountWrapper>
        <OpeartePanel />
      </StyledAccountWrapper>
      <WalletNotConnectWrapper />
    </>
  )
}

const StyledAccountWrapper = styled.div`
  background: #242735;
  height: auto;
  min-height: 100vh;
  padding: 82px 20px 34px;
`

export default Mining

import React from 'react'
import styled from 'styled-components'
import useEagerConnect from '../../hooks/useEagerConnect'
import useInactiveListener from '../../hooks/useInactiveListener'
import WalletNotConnectWrapper from '../../components/WalletNotConnectModal/WalletNotConnectWrapper'
import OpeartePanel from './components/OpeartePanel'

const Account: React.FC = () => {
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
  padding: 82px 20px 34px;
  height: auto;
  min-height: 100vh;
`

export default Account

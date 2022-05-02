import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { useWallet, ChainUnsupportedError } from 'use-wallet'

import { getWalletChain } from '../../../utils/formatWallet'

interface NetworkSpanProps {
  defaultChainId?: number
}

const NetworkSpan: React.FC<NetworkSpanProps> = (props) => {
  const [chainId, setChainId] = useState(0)

  const chain = getWalletChain()

  const { ethereum, connector, error, status }: { ethereum: any; connector: any; error: any; status: any } = useWallet()
  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      setChainId(chainId)
    }
  }, [ethereum])

  return <NetworkWrapper>{chain.testnet && <NetworkCard>{chain.chainName}</NetworkCard>}</NetworkWrapper>
}

const NetworkWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  pointer-events: auto;
`

const NetworkCard = styled.span`
  width: fit-content;
  border-radius: 12px;
  padding: 8px 12px;
  background-color: #d2cc16;
`

export default NetworkSpan

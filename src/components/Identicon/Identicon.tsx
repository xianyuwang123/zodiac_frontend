import React, { useEffect, useRef } from 'react'

import styled from 'styled-components'

import { useWallet } from 'use-wallet'
import Jazzicon from 'jazzicon'

interface IdenticonProps {
  size?: number
  style?: React.CSSProperties
}

const Identicon: React.FC<IdenticonProps> = ({ size = 20, style }) => {
  const ref = useRef<HTMLDivElement>()

  const { account } = useWallet()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(size, parseInt(account.slice(2, 10), 16)))
    }
  }, [account, size])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer style={style} size={size} ref={ref as any} />
}

interface IdenticonContainerProps {
  size: number
}
const StyledIdenticonContainer = styled.div<IdenticonContainerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  display: inline-flex;
`

export default Identicon

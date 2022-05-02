import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'

import Button from '../Button'
import Input, { InputProps } from '../Input'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'

import arrow from '../../assets/img/arrow.svg'

interface TokenInputSelectProps extends InputProps {
  max: number | string
  symbol: string
  symbol1: string
  symbol2: string
  onSelectMax?: () => void
  onTokenChanged?: (token: string) => void
}

const TokenInputSelect: React.FC<TokenInputSelectProps> = ({
  max,
  symbol,
  symbol1,
  symbol2,
  onChange,
  onSelectMax,
  onTokenChanged,
  value,
}) => {
  const [showMenu, setShowMenu] = useState(false)

  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, showMenu ? () => setShowMenu(false) : undefined)

  const handleTokenChanged = useCallback(
    (token) => {
      onTokenChanged?.(token)
      setShowMenu(false)
    },
    [onTokenChanged, setShowMenu]
  )

  const onShowMenu = useCallback(() => {
    setShowMenu(!showMenu)
  }, [showMenu, setShowMenu])

  return (
    <StyledTokenInputSelect>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <div>
              <Button size="sm" text="Max" onClick={onSelectMax} />
            </div>
            <StyledSpacer />
            <StyledTokenSelect onClick={onShowMenu}>
              <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
              <img src={arrow} style={{ height: 16, padding: '5px 0' }} />
              {!!showMenu && (
                <StyledMenus ref={node as any}>
                  <StyledMenu onClick={() => handleTokenChanged(`${symbol1}`)}>{symbol1}</StyledMenu>
                  <StyledMenu onClick={() => handleTokenChanged(`${symbol2}`)}>{symbol2}</StyledMenu>
                </StyledMenus>
              )}
            </StyledTokenSelect>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
      <StyledMaxText>
        {max.toLocaleString()} {symbol} Available
      </StyledMaxText>
    </StyledTokenInputSelect>
  )
}

const StyledTokenInputSelect = styled.div``

const StyledMenus = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 10px;
  top: 20px;
  left: -20px;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  line-height: 30px;
`

const StyledMenu = styled.li`
  padding: 5px 20px;
  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  &:hover {
    background-color: #ddd;
  }
`

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[2]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.color.grey[600]};
  font-weight: 700;
`

const StyledTokenSelect = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
`

export default TokenInputSelect

import React, { useState, useEffect } from 'react'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import flag from '../../../assets/img/select/flag.svg'
import star from '../../../assets/img/select/star.svg'

import styled from 'styled-components'

interface WalletCard2Props {
  icon: React.ReactNode
  fn: () => void
  title: string
  isActive: boolean
}

const NetworkCard: React.FC<WalletCard2Props> = ({ icon, fn, title, isActive }) => {
  return (
    <StyledButton
      className={isActive ? 'active' : ''}
      onClick={() => {
        fn()
      }}
    >
      <CardIcon>{icon}</CardIcon>
      {isActive ? <Hook /> : null}
      <CardTitle text={title} size={14} color={'#333'} />
    </StyledButton>
  )
}

const Hook = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  background-size: 16px;
  background-image: url('${star}');
  animation-name: flag;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes flag {
    from {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(360deg);
    }
    13% {
      transform: scale(1);
    }
    15% {
      transform: scale(1.2);
    }
    17% {
      transform: scale(1);
    }
    to {
      transform: rotateY(0deg);
    }
  }
`

/*const Hook = styled.span`
  position: absolute;
  top: -14px;
  right: -16px;
  width: 24px;
  height: 24px;
  background-size: 24px;
  background-position: -4px 0;
  transform-origin: left bottom;
  background-image: url('${flag}');
  animation-name: flag;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes flag {
    from {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(45deg);
    }
    to {
      transform: rotateY(0deg);
    }
  }
`*/

const StyledButton = styled.div`
  position: relative;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  color: #333;
  height: 38px;
  text-align: center;
  &.active {
    color: #333;
    background: initial;
    border-color: initial;
  }
  &:hover,
  &:focus {
    color: #333;
    background: initial;
    border-color: initial;
  }
  & > :first-child {
    display: initial;
    padding: 0;
    margin-right: 8px;
    font-size: unset;
    line-height: 36px;
  }
  & > :last-child {
    display: inline-block;
    padding: 0;
  }
`

export default NetworkCard

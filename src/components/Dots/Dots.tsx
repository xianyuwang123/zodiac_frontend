import React from 'react'
import styled from 'styled-components'

interface DotsProps {
  show?: boolean
  text: string
}

const Dots: React.FC<DotsProps> = ({ show, text }) => {
  return show ? <DotsSpan>{text}</DotsSpan> : <>{text}</>
}

const DotsSpan = styled.span`
  color: gray;
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`

export default Dots

import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { IconProps } from '../Icon'

const YieldIcon: React.FC<IconProps> = ({ color = '#000000', size = 32 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" version="1.1">
      <title>Yeild</title>
      <g id="page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="yeild" fill={color}>
          <path
            d="M19,12 C19,15.8659932 15.8659932,19 12,19 C8.13400675,19 5,15.8659932 5,12 C5,8.13400675 8.13400675,5 12,5 L12,5 L12,11 C12,11.5522847 12.4477153,12 13,12 L13,12 Z"
            id="形状结合"
            transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) "
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default YieldIcon

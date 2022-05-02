import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { IconProps } from '../Icon'

const ArrowRightIcon: React.FC<IconProps> = ({ color, size = 32 }) => {
  return (
    <svg height={size} viewBox="0 0 32 32" width={size}>
      <g id="arrow-right" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(16.242641, 16.242641) rotate(-45.000000) translate(-16.242641, -16.242641) translate(13.242641, 13.242641)"
          fill="#333333"
        >
          <rect x="4" y="0" width="2" height="6"></rect>
          <rect x="0" y="4" width="6" height="2"></rect>
        </g>
      </g>
    </svg>
  )
}

export default ArrowRightIcon

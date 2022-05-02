import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { IconProps } from '../Icon'

const CloseIcon: React.FC<IconProps> = ({ color, size = 32 }) => {
  return (
    <svg height={size} viewBox="0 0 32 32" width={size}>
      <g id="close" stroke="none" strokeWidth="1" fill="#fff" fillRule="evenodd">
        <g id="times" transform="translate(8.000000, 8.000000)" fill="#fff" fillRule="nonzero">
          <polygon points="16 1.61142857 14.3885714 0 8 6.38857143 1.61142857 0 0 1.61142857 6.38857143 8 0 14.3885714 1.61142857 16 8 9.61142857 14.3885714 16 16 14.3885714 9.61142857 8"></polygon>
        </g>
      </g>
    </svg>
  )
}

export default CloseIcon

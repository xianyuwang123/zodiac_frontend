import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { IconProps } from '../Icon'

const MoreIcon: React.FC<IconProps> = ({ color, size = 32 }) => {
  return (
    <svg height={size} viewBox="0 0 32 32" width={size}>
      <g id="more-option" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="ellipsis-v" transform="translate(14.000000, 8.000000)" fill="#333333" fillRule="nonzero">
          <path d="M2,4 C3.1,4 4,3.1 4,2 C4,0.9 3.1,0 2,0 C0.9,0 0,0.9 0,2 C0,3.1 0.9,4 2,4 Z M2,6 C0.9,6 0,6.9 0,8 C0,9.1 0.9,10 2,10 C3.1,10 4,9.1 4,8 C4,6.9 3.1,6 2,6 Z M2,12 C0.9,12 0,12.9 0,14 C0,15.1 0.9,16 2,16 C3.1,16 4,15.1 4,14 C4,12.9 3.1,12 2,12 Z"></path>
        </g>
      </g>
    </svg>
  )
}

export default MoreIcon

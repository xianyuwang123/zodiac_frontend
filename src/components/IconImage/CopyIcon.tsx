import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { IconProps } from '../Icon'

const CopyIcon: React.FC<IconProps> = ({ color, size = 32 }) => {
  return (
    <svg height={size} viewBox="0 0 32 32" width={size}>
      <g id="copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="step-mode" transform="translate(9.000000, 9.000000)" fill="#262626" fillRule="nonzero">
          <path d="M1.166375,1.166375 L1.166375,12.833625 L8.166375,12.833625 L8.166375,1.166375 L1.166375,1.166375 Z M0,0 L9.333625,0 L9.333625,14 L0,14 L0,0 Z M10.5,2.333625 L11.666375,2.333625 L11.666375,11.666375 L10.5,11.666375 L10.5,2.333625 Z M12.833625,4.666375 L14,4.666375 L14,9.333625 L12.833625,9.333625 L12.833625,4.666375 Z"></path>
        </g>
      </g>
    </svg>
  )
}

export default CopyIcon

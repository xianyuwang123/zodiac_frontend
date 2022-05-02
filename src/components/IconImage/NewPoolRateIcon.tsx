import React from 'react'
import { ThemeContext } from 'styled-components'

import { IconProps } from '../Icon'

interface PoolRateIconProps extends IconProps {
  rate: number
  skipNormalRate?: boolean
}

const PoolRateIcon: React.FC<PoolRateIconProps> = ({ rate, size = 1, skipNormalRate = true }) => {
  return skipNormalRate && rate <= 1 ? null : (
    <svg
      width={72 * size}
      height={42 * size}
      viewBox="0 0 72 42"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>{rate}</title>
      <defs>
        <rect id="path-1" x="0" y="0" width={72 * size} height={42 * size}></rect>
      </defs>
      <g id="4" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <mask id="mask-2" fill="white">
          <use xlinkHref="#path-1"></use>
        </mask>
        <use id="masking" fillOpacity="0" fill="#D8D8D8" xlinkHref="#path-1"></use>
        <g id="group" mask="url(#mask-2)">
          <g
            transform="translate(25.750000, 16.066987) rotate(-30.000000) translate(-25.750000, -16.066987) translate(-24.250000, 7.066987)"
            id="编组-6"
          >
            <g transform="translate(0.000000, 0.000000)">
              <rect id="rec" fill="#FFF704" x="0" y="0" width="100" height="18"></rect>
              <text
                id="x-Mining"
                fontFamily="Kanit-BoldItalic, Kanit"
                fontSize="11"
                fontStyle="italic"
                fontWeight="bold"
                fill="#333333"
              >
                <tspan x="22.8660254" y="12.7679492">
                  {rate}x Mining
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default PoolRateIcon

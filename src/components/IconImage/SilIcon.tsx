import React from 'react'

import { IconProps } from '../Icon'

const SilIcon: React.FC<IconProps> = ({ size = 64 }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 64 64"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Logo-+-color" transform="translate(-612.000000, -549.000000)">
          <g id="Yellow-icon" transform="translate(612.000000, 549.000000)">
            <circle id="circle-backup" fill="#FFF704" cx="32" cy="32" r="32"></circle>
            <path
              d="M32,42.6666667 C34.9455187,42.6666667 37.3333333,40.278852 37.3333333,37.3333333 C37.3333333,34.3878147 34.9455187,32 32,32 L32,26.6666667 C37.8910373,26.6666667 42.6666667,31.442296 42.6666667,37.3333333 C42.6666667,43.2243707 37.8910373,48 32,48 C30.0571144,48 28.2355522,47.4805527 26.6666162,46.5729607 L26.6666667,50.6666667 L21.3333333,50.6666667 L21.3333333,37.3333333 L26.6666667,37.3333333 C26.6666667,40.278852 29.0544813,42.6666667 32,42.6666667 Z M42.6666667,13.3333333 L42.6666667,26.6666667 L37.3333333,26.6666667 L37.3323333,26.6223333 L37.3288848,26.4468271 C37.213594,23.6032497 34.8718807,21.3333333 32,21.3333333 C29.0544813,21.3333333 26.6666667,23.721148 26.6666667,26.6666667 C26.6666667,29.6121853 29.0544813,32 32,32 L32,37.3333333 C26.1089627,37.3333333 21.3333333,32.557704 21.3333333,26.6666667 C21.3333333,20.7756293 26.1089627,16 32,16 C33.9428856,16 35.7644478,16.5194473 37.3333838,17.4270393 L37.3333333,13.3333333 L42.6666667,13.3333333 Z"
              id="rec-2"
              fill="#000000"
              fillRule="nonzero"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SilIcon

import React from 'react'

import { IconProps } from '../Icon'

import fireIcon from '../../assets/img/fire.png'

const FireIcon: React.FC<IconProps> = ({ size = 36, color = 'transparent', desc }) => {
  const imgStyle = {
    backgroundColor: color,
  }
  return <img src={fireIcon} height={size} alt={desc} style={imgStyle} />
}

export default FireIcon

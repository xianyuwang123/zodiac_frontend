import React from 'react'

import { IconProps } from '../Icon'

import { getLocalTokenLogoBySymbol } from '../../utils/coinIcons'

export interface CoinIconProps extends IconProps {
  currency: string
  round?: boolean
}

const CoinIcon: React.FC<CoinIconProps> = ({ currency, size = 36, color = 'transparent', round, style }) => {
  const imgSpecificStyle = {
    backgroundColor: color,
    borderRadius: round ? '50%' : 'unset',
  }
  const imgStyle = { ...style, ...imgSpecificStyle }
  const coinIcon: string = getLocalTokenLogoBySymbol(currency)
  return <img src={coinIcon} width={size} height={size} alt={currency} style={imgStyle} />
}

export default CoinIcon

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName] // o[propertyName] is of type T[K]
}

export const getLocalTokenLogoBySymbol = (symbol: string) => {
  try {
    const iconName = getIconName(symbol.toLowerCase())

    const extension = getIconExtension(iconName)

    return require(`../assets/img/coin/${iconName}.${extension}`)
  } catch (error) {
    console.error(`Unable find the icon ${symbol}...`, error)
  }
}

const getIconName = (iconName: string) => {
  const rewiteNames: { readonly [symbol: string]: string } = {
    btcb: 'btc',
    daik: 'dai',
    tusdt: 'usdt',
    teth: 'eth',
  }
  return rewiteNames[iconName] ?? iconName
}

const getIconExtension = (iconName: string) => {
  const jpgList: string[] = []
  const isJpg = jpgList.find((a) => a.toLowerCase() === iconName)
  const extension = isJpg ? 'jpg' : 'png'
  return extension
}

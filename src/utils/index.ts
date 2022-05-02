import BigNumber from 'bignumber.js'

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec: number, decimals = 18): BigNumber => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

export const toBoolean = (value: string | number | boolean | undefined): boolean => {
  if (value) {
    return [true, 'true', 'True', 'TRUE', '1', 1].includes(value)
  } else {
    return false
  }
}

export const toFixedNumber = (num: number, digits: number, base?: number): number => {
  const pow = Math.pow(base || 10, digits)
  return Math.round(num * pow) / pow
}

import BigNumber from 'bignumber.js'
import { ZERO_BIGNUMBER } from '../zodiac/utils'

const DEFAULT_VALUE = new BigNumber(0)
const DEFAULT_ONE_HUNDRED = new BigNumber(100)
export const NINETY_PERCENTAGE = new BigNumber(0.9)

export const extractBalance = (balance: BigNumber, decimals = 18): BigNumber => {
  return !balance || balance.isNaN() ? DEFAULT_VALUE : balance.multipliedBy(new BigNumber(10).pow(decimals))
}

export const getBalance = (balance: BigNumber, decimals = 18, decimalPlaces?: number | undefined): BigNumber => {
  const b = !balance || balance.isNaN() ? DEFAULT_VALUE : balance.dividedBy(new BigNumber(10).pow(decimals))
  return decimalPlaces === undefined ? b : new BigNumber(b.toFixed(decimalPlaces))
}

export const getBalanceNumber = (balance: BigNumber, decimals = 18, decimalPlaces?: number): number => {
  const displayBalance =
    !balance || balance.isNaN() ? DEFAULT_VALUE : balance.dividedBy(new BigNumber(10).pow(decimals))
  return decimalPlaces === undefined
    ? displayBalance.toNumber()
    : new BigNumber(displayBalance.toFixed(decimalPlaces)).toNumber()
}

export const getDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
  positiveOnly = true,
  fixed = 4,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
): string => {
  const displayBalance =
    !balance || balance.isNaN() ? DEFAULT_VALUE : balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    //return displayBalance.toPrecision(4)
    return (positiveOnly && displayBalance.isNegative() ? DEFAULT_VALUE : displayBalance).toFixed(fixed, roundingMode)
  } else {
    //return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return displayBalance.toFormat(fixed, roundingMode)
  }
}

export const getDisplayBalance2 = (
  balance: BigNumber,
  decimals = 18,
  positiveOnly = true,
  fixed = 4,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
): string => {
  const displayBalance =
    !balance || balance.isNaN() ? DEFAULT_VALUE : balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toFormat(fixed, roundingMode)
}

export const isBalanceNotZero = (
  balance: BigNumber,
  decimals = 18,
  positiveOnly = true,
  fixed = 4,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
): boolean => {
  const displayBalance = getDisplayBalance(balance, decimals, positiveOnly, fixed, roundingMode)
  return !!(displayBalance && displayBalance !== ZERO_BIGNUMBER.toFixed(fixed, roundingMode))
}

export const getFullDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
  fixed = 4,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
): string => {
  return !balance || balance.isNaN()
    ? DEFAULT_VALUE.toString()
    : balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed(fixed, roundingMode)
}

export const getFullDisplayBalance2 = (balance: BigNumber, decimals = 18, fixed = 4): string => {
  return !balance || balance.isNaN()
    ? DEFAULT_VALUE.toFixed(fixed)
    : balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed(fixed)
}

export const getDisplayRate = (balance: BigNumber, decimals = 2, expo = 4, prefix = '+'): string => {
  const value = !balance || balance.isNaN() ? DEFAULT_VALUE : balance.dividedBy(new BigNumber(10).pow(decimals))
  let rate = value.toFixed(2)
  if (value.gt(new BigNumber(10).pow(expo))) {
    rate = value.toExponential(expo)
  }
  return `${prefix}${rate}%`
}

export const getDisplayPercentage = (balance: BigNumber, decimals = 2, expo = 4, prefix = '+', toFixed = 2): string => {
  const value = !balance || balance.isNaN() ? DEFAULT_VALUE : balance.dividedBy(new BigNumber(10).pow(decimals))
  let rate = value.times(DEFAULT_ONE_HUNDRED).toFixed(toFixed)
  if (value.gt(new BigNumber(10).pow(expo))) {
    rate = value.toExponential(expo)
  }
  return `${prefix}${rate}%`
}

export const getBigNumberToString = (balance: BigNumber, toFixed = 2): string => {
  const length = balance.toFixed(0).length
  let displayBalance
  if (length > 9) {
    displayBalance = balance.dividedBy(new BigNumber(10).pow(9)).toFixed(2) + ' G'
  } else if (length > 6) {
    displayBalance = balance.dividedBy(new BigNumber(10).pow(6)).toFixed(2) + ' M'
  } else if (length > 3) {
    displayBalance = balance.dividedBy(new BigNumber(10).pow(3)).toFixed(2) + ' K'
  } else {
    displayBalance = balance.toFixed(2)
  }
  return displayBalance
}

export const getBalanceText = (balance: BigNumber, fixed = 4, roundingMode = BigNumber.ROUND_DOWN) => {
  const val = !balance || balance.isNaN() ? DEFAULT_VALUE : balance
  return val.toFormat(fixed, roundingMode)
}

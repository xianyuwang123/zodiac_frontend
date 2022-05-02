import BigNumber from 'bignumber.js'
import { ChainId } from './Chain'

export interface Currency {
  readonly decimals?: number // default to 18
  readonly symbol?: string
  readonly name?: string

  readonly amount?: BigNumber
}

export interface Token extends Currency {
  readonly chainId: ChainId
  readonly address: string
}

export interface TokenPair {
  readonly pid?: number
  readonly group?: number
  readonly symbols?: string
  readonly token0: Token
  readonly token1: Token
}

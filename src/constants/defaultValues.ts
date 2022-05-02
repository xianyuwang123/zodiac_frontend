export interface StoreValues {
  [chainId: number]: {
    [key: string]: StoreValue
  }
}
export interface StoreValue {
  value: ValueType
  blockHeight?: number
}
export type ValueType = string | number

export const DEFAULT_VALUES: StoreValues = {
  56: {
    hedging_tvl: {
      value: 3649850.5,
      blockHeight: 9489226,
    },
    yield_tvl: {
      value: 24619232.65,
      blockHeight: 9489239,
    },
  },
}

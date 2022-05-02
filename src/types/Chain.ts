// https://chainid.network/
export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,

  OKEXCHAIN = 66,
  OKEXCHAIN_TESTNET = 65,

  BSC_MAINNET = 56,
  BSC_TESTNET = 97,

  XDAI = 100,

  DEV = 1337,
}

export type TokenChainAddress = {
  readonly [chainId in ChainId]?: string
}

export type TokenChainAddressList = {
  readonly [symbol: string]: TokenChainAddress
}

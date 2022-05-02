/**
 * See https://docs.chain.link/docs/price-feeds-api-reference
 * And https://docs.chain.link/docs/reference-contracts
 */
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import AggregatorV3InterfaceABI from '../zodiac/lib/abi/chainlink/aggregatorV3Interface.json'
import { ethereumPriceFeedsContractAddresses, PriceFeedContract } from './chainlinkConstant'
import { getWalletChainId } from './formatWallet'
import { isWeb3 } from './web3Utils'

export interface PriceRoundData {
  roundID?: any
  answer?: any
  startedAt?: any
  updatedAt?: any
  answeredInRound?: any
}

export interface PriceFeedPair {
  contract: Contract | undefined
  pair: PriceFeedContract | undefined
}

export const getPriceFeedContract = (providerOrWeb3: provider | Web3, address: string): Contract | undefined => {
  if (!!address && !!providerOrWeb3) {
    const web3 = isWeb3(providerOrWeb3) ? providerOrWeb3 : new Web3(providerOrWeb3)
    const contract = new web3.eth.Contract(AggregatorV3InterfaceABI as unknown as AbiItem, address)
    return contract
  }
  return undefined
}

export const getPriceFeedContractByTokens = (
  providerOrWeb3: provider | Web3,
  token0: string,
  token1: string,
  fuzzy = false
): PriceFeedPair | undefined => {
  const chainId: number = getWalletChainId()
  const pairs: PriceFeedContract[] = ethereumPriceFeedsContractAddresses[chainId]
  if (pairs?.length) {
    const pair: PriceFeedContract | undefined = fuzzy
      ? pairs.find(
          (pair) =>
            (pair.token0 === token0 && pair.token1 === token1) || (pair.token0 === token1 && pair.token1 === token0)
        )
      : pairs.find((pair) => pair.token0 === token0 && pair.token1 === token1)
    return {
      contract: getPriceFeedContract(providerOrWeb3, pair?.address ?? ''),
      pair: pair,
    }
  }
  return undefined
}

export const getLatestPrice = async (aggregatorContract: Contract): Promise<PriceRoundData | undefined> => {
  try {
    const roundData: PriceRoundData = await aggregatorContract.methods.latestRoundData().call()
    return roundData
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const getPriceByRoundId = async (
  aggregatorContract: Contract,
  roundId: BigNumber
): Promise<PriceRoundData | undefined> => {
  try {
    const roundData: PriceRoundData = await aggregatorContract.methods.getRoundData(roundId).call()
    return roundData
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const getDesciption = async (aggregatorContract: Contract): Promise<string> => {
  try {
    const desc: string = await aggregatorContract.methods.description().call()
    return desc
  } catch (e) {
    console.error(e)
    return ''
  }
}

export const getVersion = async (aggregatorContract: Contract): Promise<BigNumber> => {
  try {
    const version: string = await aggregatorContract.methods.version().call()
    return new BigNumber(version)
  } catch (e) {
    console.error(e)
    return new BigNumber(0)
  }
}

export const getDecimals = async (aggregatorContract: Contract): Promise<number> => {
  try {
    const decimals: any = await aggregatorContract.methods.decimals().call()
    return Number(decimals)
  } catch (e) {
    console.error(e)
    return 0
  }
}

import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import BigNumber from 'bignumber.js'
import { isWeb3 } from './web3Utils'

import UNIV2PairABI from './constant/abi/uni_v2_lp.json'

export const ZERO_BIGNUMBER = new BigNumber(0)

export const getContract = (providerOrWeb3: provider | Web3, address: string): Contract | undefined => {
  if (!address || !providerOrWeb3) return undefined

  const web3 = isWeb3(providerOrWeb3) ? providerOrWeb3 : new Web3(providerOrWeb3)

  const contract = new web3.eth.Contract(UNIV2PairABI as unknown as AbiItem, address)
  return contract
}

export const getReserves = async (
  uniV2LpContract: Contract
): Promise<{ token0Reserve: BigNumber; token1Reserve: BigNumber }> => {
  try {
    const { 0: token0, 1: token1 } = await uniV2LpContract.methods.getReserves().call()
    return {
      token0Reserve: new BigNumber(token0),
      token1Reserve: new BigNumber(token1),
    }
  } catch (e) {
    console.error(e)
    return { token0Reserve: ZERO_BIGNUMBER, token1Reserve: ZERO_BIGNUMBER }
  }
}

export const getTokenPrice = async (
  uniV2LpContract: Contract,
  index: number,
  decimals?: number
): Promise<BigNumber> => {
  try {
    const { 0: token0, 1: token1 } = await uniV2LpContract.methods.getReserves().call()

    const token0Reserve = new BigNumber(token0)
    const token1Reserve = new BigNumber(token1)

    return index === 1 ? token0Reserve.div(token1Reserve) : token1Reserve.div(token0Reserve)
  } catch (e) {
    console.error(e)
    return ZERO_BIGNUMBER
  }
}

export const getTotalSupply = async (uniV2LpContract: Contract): Promise<BigNumber> => {
  try {
    const totalSupply = await uniV2LpContract.methods.totalSupply().call()
    return new BigNumber(totalSupply)
  } catch (e) {
    console.error(e)
    return ZERO_BIGNUMBER
  }
}

export const getTokenPair = async (uniV2LpContract: Contract): Promise<{ token0: string; token1: string }> => {
  try {
    const token0 = await uniV2LpContract.methods.token0().call()
    const token1 = await uniV2LpContract.methods.token1().call()
    console.log('token0', token0)
    console.log('token1', token1)
    return {
      token0,
      token1,
    }
  } catch (e) {
    console.error(e)
    return {
      token0: '',
      token1: '',
    }
  }
}

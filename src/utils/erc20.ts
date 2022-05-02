import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import ERC20ABI from '../constants/abi/ERC20.json'
import { isWeb3 } from './web3Utils'

export const getContract = (providerOrWeb3: provider, address: string): Contract | null => {
  if (!address || !providerOrWeb3 || address.toUpperCase() === 'ETH') return null

  const web3 = isWeb3(providerOrWeb3) ? providerOrWeb3 : new Web3(providerOrWeb3)
  const contract = new web3.eth.Contract(ERC20ABI.abi as unknown as AbiItem, address)
  return contract
}

export const getAllowance = async (
  erc20Contract: Contract,
  masterChef: Contract | string,
  account: string
): Promise<string> => {
  try {
    const allowance: string = await erc20Contract.methods
      .allowance(account, typeof masterChef === 'string' ? masterChef : masterChef.options.address)
      .call()
    return allowance
  } catch (e) {
    console.error(e)
    return '0'
  }
}

export const getBalance = async (provider: provider, erc20Address: string, userAddress: string): Promise<string> => {
  const erc20Contract = getContract(provider, erc20Address)
  try {
    const balance: string = await erc20Contract?.methods.balanceOf(userAddress).call()
    return balance
  } catch (e) {
    console.error(e)
    return '0'
  }
}

export const getDecimals = async (provider: provider, erc20Address: string): Promise<string> => {
  const erc20Contract = getContract(provider, erc20Address)
  if (!erc20Contract) return '0'
  try {
    const balance: string = await erc20Contract.methods.decimals().call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getTokenSymbol = async (provider: provider, erc20Address: string): Promise<string> => {
  const erc20Contract = getContract(provider, erc20Address)
  if (!erc20Contract) return '0'
  try {
    const tokenSymbol = await erc20Contract.methods.symbol().call()
    return tokenSymbol
  } catch (e) {
    return ''
  }
}

export const approve = async (
  erc20Contract: Contract,
  authorizedContract: Contract,
  account: string,
  spendAmount?: BigNumber
): Promise<any> => {
  return erc20Contract.methods
    .approve(authorizedContract.options.address, spendAmount || ethers.constants.MaxUint256)
    .send({ from: account })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const transfer = async (
  provider: provider,
  erc20Address: string,
  amount: string,
  account: string,
  toAddress: string,
  decimals: number
): Promise<any> => {
  const erc20Contract = getContract(provider, erc20Address)
  if (!erc20Contract) return '0'

  !!amount &&
    (await erc20Contract.methods
      .transfer(toAddress, new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString())
      .estimateGas({ from: account }))

  return (
    !!amount &&
    erc20Contract.methods
      .transfer(toAddress, new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString())
      .send({ from: account })
      .on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
  )
}

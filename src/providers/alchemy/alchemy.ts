// https://docs.alchemyapi.io/tutorials/hello-world-smart-contract
// https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy
// ** version conflict **
// https://web3js.readthedocs.io/en/v1.3.0/web3.html

import Web3 from 'web3'
import { provider } from 'web3-core'

import { Contracts } from '../../zodiac/lib/contracts.js'
import { contractAddresses } from '../../zodiac/lib/constants'
import { ChainId } from '../../types'

export class AlchemyWeb3Api {
  web3: Web3
  contracts: Contracts
  provider: provider
  bunnyArmyAddress: string | undefined
  wethAddress: string | undefined

  constructor(networkId: number, options: any) {
    const API_URL = process.env.REACT_APP_ALCHEMY_API_URL ?? ''
    let realProvider

    if (API_URL.includes('wss')) {
      realProvider = new Web3.providers.WebsocketProvider(API_URL, options.ethereumNodeTimeout || 10000)
    } else {
      realProvider = new Web3.providers.HttpProvider(API_URL, options.ethereumNodeTimeout || 10000)
    }

    this.provider = realProvider
    this.web3 = new Web3(realProvider)

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount
    }

    this.contracts = new Contracts(realProvider, networkId, this.web3, options)
    this.bunnyArmyAddress = contractAddresses.bunnyArmy[networkId as ChainId]
    this.wethAddress = contractAddresses.weth[networkId as ChainId]
  }
}

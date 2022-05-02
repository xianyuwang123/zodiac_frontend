import Web3 from 'web3'
import { provider } from 'web3-core'

import { Contracts } from '../../zodiac/lib/contracts.js'
import { contractAddresses } from '../../zodiac/lib/constants'
import { ChainId } from '../../types'

export class CloudflareWeb3Api {
  web3: Web3
  contracts: Contracts
  provider: provider
  zodiacAddress: string | undefined
  wethAddress: string | undefined

  constructor(networkId: number, options: any) {
    const API_URL = process.env.REACT_APP_CLOUDFLARE_API_URL ?? ''
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
    this.zodiacAddress = contractAddresses.zodiac[networkId as ChainId]
    this.wethAddress = contractAddresses.weth[networkId as ChainId]
  }
}

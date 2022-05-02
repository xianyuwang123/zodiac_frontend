import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contracts } from '../zodiac/lib/contracts'

export interface IWeb3Api {
  web3: Web3
  contracts: Contracts
  provider: provider
  bunnyArmyAddress: string | undefined
  wethAddress: string | undefined
}

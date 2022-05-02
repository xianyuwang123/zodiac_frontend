import CHAINNETWORKS from './ChainNetworks.json'
import { ChainNetwork } from '../walletProvider'

type ChainNetworkList = {
  [key: string]: ChainNetwork
}

const CHAIN_NETWORKS: ChainNetworkList = CHAINNETWORKS

const getChainNetwork = (chainId: number | string): ChainNetwork | undefined => {
  return CHAIN_NETWORKS[chainId]
}

export { CHAIN_NETWORKS, getChainNetwork }

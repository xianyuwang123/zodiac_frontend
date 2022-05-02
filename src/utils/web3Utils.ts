import Web3 from 'web3'

export const isWeb3 = (object: any): object is Web3 => {
  return (object as Web3).version !== undefined && (object as Web3).eth !== undefined
}

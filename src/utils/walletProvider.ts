export interface ChainNetwork {
  chainId: number
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrl: string
  blockTime?: number
}

const toHex = (num: number) => {
  return `0x${num.toString(16)}`
}

/**
 * Get the ethereum provider name
 */

const methodList = {
  imToken: 'imToken',
  TokenPocket: 'TokenPocket',
  MetaMask: 'MetaMask',
}

export function getProviderMethod(connectorName?: string): string {
  let providerName: string | undefined = getProviderName()
  if (!providerName) {
    providerName = getProviderMethodInUa()
  }
  return providerName ?? connectorName ?? 'Wallet'
}

export function getProviderMethodInUa(): string | undefined {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const providerMethodList = Object.values(methodList)
  const providerMethod = providerMethodList.find((item) => {
    return userAgent.indexOf(item.toLowerCase()) !== -1
  })
  return providerMethod
}

export function getProviderName(): string {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    if (window.ethereum.isImToken) return methodList.imToken
    if (window.ethereum.isTokenPocket) return methodList.TokenPocket
    if (window.ethereum.isMetaMask) return methodList.MetaMask
  }
  return ''
}

export function isMetaMask(): boolean {
  const flag = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask
  return flag ?? false
}

export function isMetaMaskWallet(): boolean {
  const providerName = getProviderName()
  return 'MetaMask' === providerName
}

export function isImTokenWallet(): boolean {
  const providerName = getProviderName()
  return 'imToken' === providerName
}

export function isTokenPocketWallet(): boolean {
  const providerName = getProviderName()
  return 'TokenPocket' === providerName
}

/**
 * Prompt the user to add the network on Metamask, or switch to the network if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupChainNetwork = async (chain: ChainNetwork, method?: string): Promise<boolean> => {
  const provider = window.ethereum
  if (provider && provider.request) {
    try {
      await provider.request({
        method: method ?? 'wallet_addEthereumChain',
        params: [
          {
            chainId: toHex(chain.chainId),
            chainName: chain.chainName,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpcUrls,
            blockExplorerUrls: [chain?.blockExplorerUrl],
          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error("Can't setup the Ethereum network on metamask because window.ethereum is undefined")
    return false
  }
}

export const setupTokenPocketEthereumNetwork = async (chainId?: number): Promise<boolean | undefined> => {
  if (!chainId || chainId === 1) {
    // default to ETH mainnet
    return await setupChainNetwork({
      chainId: 1,
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://web3.mytokenpocket.vip'],
      blockExplorerUrl: 'https://etherscan.io',
    })
  }
  return Promise.resolve(false)
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
  tokenType?: string
): Promise<void> => {
  const provider = window.ethereum
  if (provider && provider.request) {
    const tokenAdded = await provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: tokenType || 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    })
    return tokenAdded
  }
}

const connectorLocalStorageKey = 'ConnectorId'

export const isWalletConnectEnabled = (): boolean => {
  return !!window?.localStorage?.getItem('walletconnect')
}

export const clearUpWalletConnect = (): void => {
  window?.localStorage?.removeItem('walletconnect')
  window?.localStorage?.removeItem('WALLETCONNECT_DEEPLINK_CHOICE')
}

export const getConnectorName = (): string | null => {
  return window?.localStorage?.getItem(connectorLocalStorageKey)
}
export const rememberConnetor = (walletName: string | undefined): void => {
  if (walletName) {
    window?.localStorage?.setItem(connectorLocalStorageKey, walletName)
  }
}
export const forgetConnector = (): void => {
  window?.localStorage?.removeItem(connectorLocalStorageKey)
}

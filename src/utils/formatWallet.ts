import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

import { FEATURE_FLAGS } from '../utils/features'

const DEFAULT_CHAIN_ID = process.env.REACT_APP_CHAIN_ID
const CHAINID_LOCALSTORAGE_KEY = 'BAC-ChainId'
const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production'

type ChainInfo = {
  readonly networkName?: string
  readonly chainId: number
  readonly chainName: string
  readonly etherscanBaseUrl: string
  readonly testnet: boolean
  readonly disabled?: boolean
}

const ChainList: ChainInfo[] = [
  {
    chainId: 1,
    chainName: 'Mainnet',
    etherscanBaseUrl: 'https://etherscan.io',
    testnet: false,
    disabled: !FEATURE_FLAGS.ENABLED.ETH_CHAIN,
  },
  {
    chainId: 3,
    chainName: 'Ropsten',
    etherscanBaseUrl: 'https://ropsten.etherscan.io',
    testnet: true,
    disabled: IS_PRODUCTION_MODE || !FEATURE_FLAGS.ENABLED.ETH_CHAIN,
  },
  {
    chainId: 42,
    chainName: 'Kovan',
    etherscanBaseUrl: 'https://kovan.etherscan.io',
    testnet: true,
    disabled: IS_PRODUCTION_MODE || !FEATURE_FLAGS.ENABLED.ETH_CHAIN,
  },
  {
    chainId: 4,
    chainName: 'Rinkeby',
    etherscanBaseUrl: 'https://rinkeby.etherscan.io',
    testnet: true,
    disabled: IS_PRODUCTION_MODE || !FEATURE_FLAGS.ENABLED.ETH_CHAIN,
  },
  {
    chainId: 5,
    chainName: 'Görli',
    etherscanBaseUrl: 'https://goerli.etherscan.io',
    testnet: true,
    disabled: IS_PRODUCTION_MODE || !FEATURE_FLAGS.ENABLED.ETH_CHAIN,
  },
  {
    chainId: 1337,
    chainName: 'Local',
    etherscanBaseUrl: 'HTTP://127.0.0.1:7545',
    testnet: true,
    disabled: true,
  },
  {
    networkName: 'BSC',
    chainId: 56,
    chainName: 'Mainnet',
    etherscanBaseUrl: 'https://bscscan.com',
    testnet: false,
    disabled: !FEATURE_FLAGS.ENABLED.BSC_CHAIN,
  },
  {
    networkName: 'BSC',
    chainId: 97,
    chainName: 'Testnet',
    etherscanBaseUrl: 'https://testnet.bscscan.com',
    testnet: false,
    disabled: IS_PRODUCTION_MODE || !FEATURE_FLAGS.ENABLED.BSC_CHAIN,
  },
  {
    networkName: 'OEC',
    chainId: 66,
    chainName: 'Mainnet',
    etherscanBaseUrl: 'https://www.oklink.com/oec',
    testnet: false,
    disabled: !FEATURE_FLAGS.ENABLED.OKE_CHAIN,
  },
  {
    networkName: 'OEC',
    chainId: 65,
    chainName: 'Testnet',
    etherscanBaseUrl: 'https://www.oklink.com/oec-test',
    testnet: false,
    disabled: IS_PRODUCTION_MODE || !FEATURE_FLAGS.ENABLED.OKE_CHAIN,
  },
  {
    networkName: 'Matic',
    chainId: 137,
    chainName: 'Mainnet',
    etherscanBaseUrl: 'https://polygonscan.com/',
    testnet: false,
    disabled: !FEATURE_FLAGS.ENABLED.POLYGON_CHAIN,
  },
  {
    networkName: 'Matic',
    chainId: 80001,
    chainName: 'Testnet',
    etherscanBaseUrl: 'https://mumbai.polygonscan.com/',
    testnet: false,
    disabled: IS_PRODUCTION_MODE || !FEATURE_FLAGS.ENABLED.POLYGON_CHAIN,
  },
]

export function getBlockTime(chainId: string | number): number {
  const targetChainId = Number(chainId)
  let blockTime = 12
  switch (targetChainId) {
    case 56:
    case 97:
      blockTime = 3
      break
    case 66:
      blockTime = 3.6
      break
    default:
      blockTime = 12
      break
  }
  return blockTime
}

export function isBSCNetwork(chainId: string | number): boolean {
  const targetChainId = Number(chainId)
  return targetChainId === 56 || targetChainId === 97 ? true : false
}

export function isOKENetwork(chainId: string | number): boolean {
  const targetChainId = Number(chainId)
  return targetChainId === 65 || targetChainId === 66 ? true : false
}

export function isPolygonNetwork(chainId: string | number): boolean {
  const targetChainId = Number(chainId)
  return targetChainId === 137 || targetChainId === 80001 ? true : false
}

export function isEthMainnet(chainId: string | number): boolean {
  const targetChainId = Number(chainId)
  return targetChainId === 1 ? true : false
}

export function isBSCMainnet(chainId: string | number): boolean {
  const targetChainId = Number(chainId)
  return targetChainId === 56 ? true : false
}

export function isOKEMainnet(chainId: string | number): boolean {
  const targetChainId = Number(chainId)
  return targetChainId === 66 ? true : false
}

export function getChainNetworkName(chain: ChainInfo | undefined): string {
  if (!chain) return 'Unknown'

  return IS_PRODUCTION_MODE
    ? `${chain.networkName ?? 'ETH'} ${chain.chainName === 'Mainnet' ? '' : chain.chainName}`
    : `${chain.networkName ?? 'Ethereum'} ${chain.chainName}`
}

export function getSupportedChains(): ChainInfo[] {
  return ChainList.filter((c) => !c.disabled)
}

export function getSupportedChainById(chainId: string | number): ChainInfo | undefined {
  return ChainList.find((c) => !c.disabled && c.chainId === Number(chainId))
}

export function getSupportedChainByName(chainName: string): ChainInfo | undefined {
  return ChainList.find((c) => !c.disabled && c.chainName === chainName)
}

export function supportedChainId(chainId: string | number | undefined): boolean {
  if (!chainId) return false
  const targetChainId = Number(chainId)
  return !!ChainList.find((c) => !c.disabled && c.chainId === targetChainId)
}

export function getWalletChainId(): number {
  const chainId = retreiveChainId() ?? parseInt(DEFAULT_CHAIN_ID ?? '1')
  return supportedChainId(chainId) ? chainId : parseInt(DEFAULT_CHAIN_ID ?? '1')
}

export function getWalletChain(): ChainInfo {
  const chainId = getWalletChainId()
  return getSupportedChains().find((c) => c.chainId === chainId) ?? ChainList[0]
}

export function persistChainIdIfNeeded(chainId: string | number | undefined): void {
  if (chainId) {
    if (supportedChainId(chainId)) {
      persistChainId(Number(chainId))
    }
  }
}
export function persistChainId(chainId: number | undefined): void {
  if (undefined !== chainId) {
    window?.sessionStorage?.setItem(CHAINID_LOCALSTORAGE_KEY, String(chainId))
    window?.localStorage?.setItem(CHAINID_LOCALSTORAGE_KEY, String(chainId))
  }
}
export function retreiveChainId(): number | undefined {
  const preferWindowEthereum = FEATURE_FLAGS.ENABLED.PREFER_WINDOW_ETHEREUM
  const windowChainId = Number(window?.ethereum?.chainId || 0)

  const storageChainId0 = window?.sessionStorage?.getItem(CHAINID_LOCALSTORAGE_KEY)
  const storageChainId = window?.localStorage?.getItem(CHAINID_LOCALSTORAGE_KEY)

  const localChainId =
    isMobile && preferWindowEthereum && !!windowChainId
      ? windowChainId
      : storageChainId
      ? parseInt(storageChainId)
      : undefined
  return storageChainId0 ? parseInt(storageChainId0) : localChainId
}
export function deleteChainId(): void {
  window?.sessionStorage?.removeItem(CHAINID_LOCALSTORAGE_KEY)
  window?.localStorage?.removeItem(CHAINID_LOCALSTORAGE_KEY)
}

export function getAccountUrl(chainId: number, baseUrl: string, tokenAddr: string, account: string): string {
  switch (chainId) {
    case 65:
    case 66:
      return `${baseUrl}/address/${account}`
    default:
      return `${baseUrl}/token/${tokenAddr}?a=${account}`
  }
}

export function useTransformNetwork(chainId: number): string {
  const { t } = useTranslation()
  switch (chainId) {
    case 56:
    case 97:
      return t('actions.view_on_bscscan')
    case 65:
    case 66:
      return t('actions.view_on_okescan')
    case 137:
    case 80001:
      return t('actions.view_on_maticscan')
    default:
      return t('actions.view_on_ethscan')
  }
}

export function supportsMultipleChains(): boolean {
  return (
    FEATURE_FLAGS.ENABLED.BSC_CHAIN || FEATURE_FLAGS.ENABLED.POLYGON_CHAIN || FEATURE_FLAGS.ENABLED.OKE_CHAIN || false
  )
}

export function getGasToken(chainId: number): string {
  switch (chainId) {
    case 56:
    case 97:
      return 'BNB'
    case 65:
    case 66:
      return 'OKT'
    case 137:
    case 80001:
      return 'ETH'
    default:
      return 'ETH'
  }
}

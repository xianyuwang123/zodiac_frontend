export enum FEATURES {
  PREFER_WINDOW_ETHEREUM,
  CLAIM,
  FAUCET,
  VERSION_ONE,
  VERSION_TWO,
  LOCAL_SYMBOL_ICONS,
  MULTI_CHAINS,
  ETH_CHAIN,
  POLYGON_CHAIN,
  BSC_CHAIN,
  OKE_CHAIN,
  DEBUG_CONSOLE,
  POLLING,
  DOCUMETATION,
  BREED,
  NETWORK_ONE_CHAIN,
  MARKETPLACE_TVL,
  MENU_FAQ,
  MENU_MARKET,
}
export type FeatureKeys = keyof typeof FEATURES

export type FeatureFlag = {
  [key in FeatureKeys]?: boolean
}
export type FeatureFlags = {
  ENABLED: FeatureFlag
  DISABLED: FeatureFlag
  ITEMS: FeatureItems
}

export type FeatureItem = {
  name?: string
  launchAt?: number
  endUpAt?: number
  enabledChainIds?: Array<number>
  disabledChainIds?: Array<number>
}
export type FeatureItems = {
  [key in FeatureKeys]?: FeatureItem
}

export function getFeatrueFlag(featureFlag: string | undefined | null, defaultValue: boolean): boolean {
  return featureFlag === undefined || featureFlag === '' ? defaultValue : featureFlag === 'true' || featureFlag === '1'
}

export function isFeatrueFlagTrue(featureFlag: string | undefined | null): boolean {
  return getFeatrueFlag(featureFlag, true)
}

export function isFeatrueFlagFalse(featureFlag: string | undefined | null): boolean {
  return getFeatrueFlag(featureFlag, false)
}

export const FEATURE_FLAGS: FeatureFlags = {
  ENABLED: {
    PREFER_WINDOW_ETHEREUM: getFeatrueFlag(process.env.REACT_APP_FEATURE_PREFER_WINDOW_ETHEREUM, true),
    DEBUG_CONSOLE: getFeatrueFlag(process.env.REACT_APP_FEATURE_DEBUG_CONSOLE, false),
    FAUCET: getFeatrueFlag(process.env.REACT_APP_FEATURE_ENABLED_FAUCET, false),
    VERSION_ONE: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_V1, false),
    VERSION_TWO: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_V2, false),
    LOCAL_SYMBOL_ICONS: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_LOCAL_SYMBOL_ICONS, true),
    MULTI_CHAINS: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_MULTI_CHAINS, false),
    ETH_CHAIN: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_ETH_CHAIN, false),
    POLYGON_CHAIN: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_POLYGON_CHAIN, false),
    BSC_CHAIN: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_BSC_CHAIN, true),
    OKE_CHAIN: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_OKE_CHAIN, false),
    POLLING: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_POLLING, false),
    DOCUMETATION: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_DOCUMETATION, true),
    NETWORK_ONE_CHAIN: getFeatrueFlag(process.env.REACT_APP_FEATURE_ENABLED_NETWORK, false),
    MARKETPLACE_TVL: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_MARKETPLACE_TVL, true),
    MENU_FAQ: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_MENU_FAQ, true),
    MENU_MARKET: getFeatrueFlag(process.env.REACT_APP_FEATURE_EABLED_MENU_MARKET, true),
  },
  DISABLED: {
    CLAIM: getFeatrueFlag(process.env.REACT_APP_FEATURE_DISABLED_CLAIM, true),
    BREED: getFeatrueFlag(process.env.REACT_APP_DISABLED_BREED, true),
  },
  ITEMS: {},
}

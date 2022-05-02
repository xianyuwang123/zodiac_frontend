/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    chainId?: string
    isMetaMask?: true
    isImToken?: boolean
    isTokenPocket?: boolean
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean
    request?: (...args: any[]) => void
    rpc?: any
  }
  web3?: {}
  alchemy?: {}
  cloudflare?: {}
  eth?: {}
  bunnyArmyApp?: {}
}

declare module 'jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement
}

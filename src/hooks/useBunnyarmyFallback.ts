import { useContext } from 'react'
import { Context as ConnectedContext } from '../contexts/AppProvider'
import { Context as CloudflareContext } from '../contexts/Cloudflare'
import { Context as AlchemyContext } from '../contexts/Alchemy'

export enum ProviderType {
  Connected,
  Cloudflare,
  Alchemy,
}

const useZodiacFallback = (type?: ProviderType) => {
  const { zodiacApp } = useContext(ConnectedContext)
  const { cloudflare } = useContext(CloudflareContext)
  const { alchemy } = useContext(AlchemyContext)
  return !type || type === (ProviderType.Connected as ProviderType)
    ? zodiacApp
    : type === (ProviderType.Cloudflare as ProviderType)
    ? cloudflare
    : alchemy
}

export default useZodiacFallback

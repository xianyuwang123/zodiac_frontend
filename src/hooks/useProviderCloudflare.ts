import { useContext } from 'react'
import { Context } from '../contexts/Cloudflare'

const useProviderCloudflare = () => {
  const { cloudflare } = useContext(Context)
  return cloudflare
}

export default useProviderCloudflare

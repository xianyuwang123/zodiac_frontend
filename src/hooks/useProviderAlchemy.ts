import { useContext } from 'react'
import { Context } from '../contexts/Alchemy'

const useProviderAlchemy = () => {
  const { alchemy } = useContext(Context)
  return alchemy
}

export default useProviderAlchemy

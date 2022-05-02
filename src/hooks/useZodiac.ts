import { useContext } from 'react'
import { Context } from '../contexts/AppProvider'

const useZodiac = () => {
  const { zodiacApp } = useContext(Context)
  return zodiacApp
}

export default useZodiac

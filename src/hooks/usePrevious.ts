import { useRef, useEffect } from 'react'

const usePreviousValue = (value: any, skipZero?: boolean) => {
  const ref = useRef()
  useEffect(() => {
    if (!((value === 0 || value === undefined) && !!skipZero)) {
      ref.current = value
    }
  }, [value])
  return ref.current
}

export default usePreviousValue
